<script lang="ts">
  import { on } from "svelte/events";
  import { MediaQuery } from "svelte/reactivity";

  import { afterNavigate } from "$app/navigation";

  import TableOfContents from "@lucide/svelte/icons/table-of-contents";
  import X from "@lucide/svelte/icons/x";

  import type { TocItem } from "$lib/stores/toc.svelte";
  import { toc_store } from "$lib/stores/toc.svelte";
  import { scrollToAnchor } from "$lib/utils/scroll.svelte";
  import { cn } from "$lib/utils/ui";

  import TocList from "$lib/components/toc/TocList.svelte";
  import { Button } from "$lib/components/ui/button";
  import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
  } from "$lib/components/ui/popover";

  interface Props {
    bottomClass?: string;
  }

  let { bottomClass = "bottom-5" }: Props = $props();

  // max-w-4xl (56rem) + sidebar w-60 (15rem) × 2 + gap (1rem) × 2 = 89rem
  const show_sidebar = new MediaQuery("min-width: 89rem");

  let _pending_observer: MutationObserver | null = null;
  let _scroll_cleanup: (() => void) | null = null;
  let _anchor_el: HTMLElement | null = null;

  // 데스크탑 사이드바의 동적 top 위치 (px)
  // separator 하단 위치와 헤더 높이 중 큰 값으로 유지
  // 헤더에 stuck 상태일 때는 헤더와 TOC 사이에 여백을 둠
  const SIDEBAR_GAP = 16; // px — 헤더와 TOC 사이 여백
  let toc_top = $state(0);

  function updateTocTop(): void {
    if (!_anchor_el) {
      _anchor_el = document.querySelector<HTMLElement>("[data-toc-anchor]");
    }
    if (!_anchor_el) {
      toc_top = toc_store.header_height + SIDEBAR_GAP;
      return;
    }
    const bottom = _anchor_el.getBoundingClientRect().bottom;
    // separator가 헤더 위로 올라간 경우: header 아래 GAP 만큼 여백을 두고 고정
    // separator가 아직 헤더 아래에 있는 경우: separator 하단에 맞춤 (여백 없음)
    toc_top = bottom <= toc_store.header_height ? toc_store.header_height + SIDEBAR_GAP : bottom;
  }

  // rehype-github-heading 구조에서 heading 정보 추출
  // <div class="markdown-heading">
  //   <h2 class="heading-element">…</h2>
  //   <a id="…" class="anchor" href="#…">…</a>
  // </div>
  function scanHeadings(): void {
    const wrappers = document.querySelectorAll(".markdown-heading");
    const items: TocItem[] = [];

    for (const wrapper of wrappers) {
      const heading = wrapper.querySelector<HTMLElement>(".heading-element");
      const anchor = wrapper.querySelector<HTMLAnchorElement>(".anchor[id]");
      if (!heading || !anchor) continue;

      const level = Number.parseInt(heading.tagName[1], 10);
      const text = heading.textContent?.trim() ?? "";
      items.push({ id: anchor.id, text, level });
    }

    toc_store.items = items;
    setupActiveObserver(items);

    // URL에 해시가 있으면 헤딩이 DOM에 준비된 후 올바른 오프셋으로 재스크롤
    // (CSR 비동기 렌더링에서 브라우저가 해시 스크롤을 놓치거나 헤더에 가려지는 경우 대응)
    const hash = window.location.hash.slice(1);
    if (hash && items.some(item => item.id === hash)) {
      requestAnimationFrame(() => scrollToAnchor(hash, false));
    }
  }

  // 스크롤 위치에 따라 활성 헤딩을 추적하는 scroll listener 설정
  // IntersectionObserver는 뷰포트 경계(top=0)에서만 발화해 헤더 아래 구간에서
  // 업데이트가 지연되는 문제가 있으므로, scroll + rAF 방식으로 교체한다.
  //
  // 임계값 = header_height + 8
  //   - scrollToAnchor가 anchor를 header_height + 8 위치에 배치하므로
  //   - .heading-element의 top을 기준으로 비교 (anchor는 heading 다음 형제라 top이 더 낮음)
  function setupActiveObserver(items: TocItem[]): void {
    _scroll_cleanup?.();
    _scroll_cleanup = null;
    toc_store.active_id = "";

    if (items.length === 0) return;

    const update = (): void => {
      updateTocTop();

      const threshold = toc_store.header_height + 8;
      const wrappers = [...document.querySelectorAll<HTMLElement>(".markdown-heading")];

      // 기본값: 첫 번째 헤딩 (아직 아무것도 임계값 위로 지나가지 않은 경우)
      let new_active_id = items[0]?.id ?? "";

      for (const wrapper of wrappers) {
        const heading = wrapper.querySelector<HTMLElement>(".heading-element");
        const anchor = wrapper.querySelector<HTMLAnchorElement>(".anchor[id]");
        if (!heading || !anchor) continue;

        if (heading.getBoundingClientRect().top <= threshold) {
          new_active_id = anchor.id;
        } else {
          break;
        }
      }

      toc_store.active_id = new_active_id;
    };

    let raf_id: number | null = null;
    const handle_scroll = (): void => {
      if (raf_id !== null) return;
      raf_id = requestAnimationFrame(() => {
        update();
        raf_id = null;
      });
    };

    update(); // 초기 상태 설정
    const off = on(window, "scroll", handle_scroll, { passive: true });

    _scroll_cleanup = (): void => {
      off();
      if (raf_id !== null) {
        cancelAnimationFrame(raf_id);
        raf_id = null;
      }
    };
  }

  // 컴포넌트 언마운트 시 scroll listener 정리
  $effect(() => {
    return (): void => {
      _scroll_cleanup?.();
      _scroll_cleanup = null;
    };
  });

  // iframe 클릭 시 window blur 이벤트로 모바일 팝오버 닫기
  // iframe 내부 클릭은 parent document에 이벤트가 전파되지 않아
  // popover의 close-on-outside-click이 발화하지 않으므로 blur로 우회
  $effect(() => {
    if (!toc_store.popup_open) return;
    return on(window, "blur", () => {
      if (document.activeElement instanceof HTMLIFrameElement) {
        toc_store.closePopup();
      }
    });
  });

  // header_height 변경 시 TOC 위치 재계산 (헤더 리사이즈 대응)
  $effect(() => {
    void toc_store.header_height;
    updateTocTop();
  });

  // Svelte 5 async 모드에서 .heading-element 클래스가 afterNavigate 이후에
  // 비동기로 DOM에 적용될 수 있으므로 MutationObserver로 반응형 대기
  function observeUntilReady(): void {
    _pending_observer?.disconnect();
    _pending_observer = null;
    _scroll_cleanup?.();
    _scroll_cleanup = null;
    _anchor_el = null; // 앵커 캐시 초기화 (페이지 전환 시)
    toc_store.items = [];
    toc_store.active_id = "";

    if (document.querySelector(".heading-element")) {
      scanHeadings();
      return;
    }

    const observer = new MutationObserver(() => {
      if (!document.querySelector(".heading-element")) return;
      scanHeadings();
      observer.disconnect();
      _pending_observer = null;
    });

    observer.observe(document.body, { childList: true, subtree: true });
    _pending_observer = observer;
    // 안전장치: 5초 후 자동 해제
    setTimeout(() => {
      observer.disconnect();
      if (_pending_observer === observer) _pending_observer = null;
    }, 5000);
  }

  afterNavigate(nav => {
    if (nav.from !== null && nav.from.url.pathname === nav.to?.url.pathname) {
      // 같은 페이지 내 해시 변경 (뒤로/앞으로 탐색 등) — 헤딩은 이미 스캔됨
      const hash = nav.to?.url.hash.slice(1);
      if (hash && toc_store.items.some(item => item.id === hash)) {
        scrollToAnchor(hash, false);
      }
      return;
    }
    observeUntilReady();
  });
</script>

{#if toc_store.items.length > 0}
  {#if show_sidebar.current}
    <!-- 데스크탑 사이드바: 50% + max-w-4xl/2 (28rem) + gap (1rem) + w-60 (15rem) = calc(50% + 29rem) -->
    <!-- top은 separator 하단 위치를 따르다가, 본문이 헤더에 닿으면 header_height에 고정 -->
    <nav
      aria-label="목차"
      style:top="{toc_top}px"
      class="fixed left-[calc(50%+29rem)] z-30 w-60 overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm"
    >
      <div class="sticky top-0 z-10 border-b border-border/60 bg-card px-3 py-2.5">
        <p class="text-xs font-semibold tracking-wider text-muted-foreground uppercase select-none">
          목차
        </p>
      </div>
      <div style="max-height: calc(100vh - {toc_top}px - 44px)" class="overflow-y-auto p-2">
        <TocList />
      </div>
    </nav>
  {:else}
    <!-- 모바일/태블릿 플로팅 버튼 + Popover 목차 -->
    <Popover bind:open={toc_store.popup_open}>
      <PopoverTrigger>
        {#snippet child({ props })}
          <Button
            {...props}
            type="button"
            variant="default"
            size="icon"
            class={cn(
              "fixed right-5 z-50 size-10 rounded-full shadow-md hover:shadow-lg active:scale-95",
              bottomClass
            )}
            aria-label="목차 열기"
            aria-expanded={toc_store.popup_open}
          >
            <TableOfContents class="size-5" />
          </Button>
        {/snippet}
      </PopoverTrigger>
      <PopoverContent side="top" align="end" class="w-72 p-0">
        <div class="flex items-center justify-between gap-3 border-b border-border/60 px-3 py-2.5">
          <span
            class="text-xs font-semibold tracking-wider text-muted-foreground uppercase select-none"
          >
            목차
          </span>
          <PopoverClose
            class="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="목차 닫기"
          >
            <X class="size-4" />
          </PopoverClose>
        </div>
        <div class="max-h-[calc(60vh-44px)] overflow-y-auto p-2">
          <TocList />
        </div>
      </PopoverContent>
    </Popover>
  {/if}
{/if}
