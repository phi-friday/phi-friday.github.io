<script lang="ts">
  import { on } from "svelte/events";

  import XIcon from "@lucide/svelte/icons/x";

  import { search_store } from "$lib/stores/search.svelte";
  import { cn } from "$lib/utils/ui";

  import { Button } from "$lib/components/ui/button";
  import { Spinner } from "$lib/components/ui/spinner";

  let results_div = $state<HTMLDivElement>();

  // body scroll lock
  $effect(() => {
    if (!search_store.dialog_open) return;
    const previous_overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return (): void => {
      document.body.style.overflow = previous_overflow;
    };
  });

  // ESC 키로 닫기
  $effect(() =>
    on(window, "keydown", (event: KeyboardEvent) => {
      if (event.key === "Escape" && search_store.dialog_open) search_store.closeDialog();
    })
  );

  // Google CSE에 results 컨테이너 명시 등록
  // gcse-searchresults-only는 lazy-load로 DOM에 늦게 추가되므로
  // google.search.cse.element.render()로 직접 등록 필요
  $effect(() => {
    if (!results_div) return;

    const tryRegister = (): boolean => {
      try {
        // @ts-expect-error: google search api
        const cse = window.google?.search?.cse?.element;
        if (!cse) return false;
        cse.render({ div: results_div, tag: "searchresults-only", gname: "storesearch" });
        return true;
      } catch {
        return false;
      }
    };

    if (tryRegister()) return;

    const interval = setInterval(() => {
      if (tryRegister()) clearInterval(interval);
    }, 200);

    return (): void => clearInterval(interval);
  });

  // MutationObserver: CSE가 결과를 results_div에 렌더링 완료하면 로딩 해제
  // 연속 mutation이 300ms간 없을 때 완료로 판단 (중간 state 오판 방지)
  $effect(() => {
    if (!results_div) return;

    let timer: ReturnType<typeof setTimeout>;

    const observer = new MutationObserver(() => {
      if (!search_store.is_loading) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        search_store.finishLoading();
      }, 300);
    });

    observer.observe(results_div, { childList: true, subtree: true });

    return (): void => {
      observer.disconnect();
      clearTimeout(timer);
    };
  });
</script>

<!-- 항상 DOM에 마운트 — CSS class 토글로만 표시/숨김 제어 -->
<!-- position: fixed가 헤더 backdrop-filter에 갇히지 않도록 루트 레이아웃에 배치 -->
<div
  class={cn(
    "fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm",
    search_store.dialog_open
      ? "flex items-start justify-center p-4 pt-16 sm:p-6 sm:pt-20"
      : "hidden"
  )}
  role="dialog"
  aria-modal="true"
  aria-labelledby="search-results-title"
>
  <!-- backdrop: click to close -->
  <div class="absolute inset-0" aria-hidden="true" onclick={() => search_store.closeDialog()}></div>

  <div
    class="relative z-10 flex w-full max-w-3xl flex-col overflow-hidden rounded-xl border bg-background shadow-2xl"
  >
    <div class="flex items-center justify-between border-b px-5 py-3">
      <div class="min-w-0">
        <h2 id="search-results-title" class="text-base font-semibold">Search Results</h2>
        {#if search_store.last_query}
          <p class="truncate text-xs text-muted-foreground">"{search_store.last_query}"</p>
        {/if}
      </div>
      <Button type="button" variant="ghost" size="icon" onclick={() => search_store.closeDialog()}>
        <XIcon />
        <span class="sr-only">Close</span>
      </Button>
    </div>

    <!-- 결과 영역: 로딩 중이면 Spinner 오버레이 -->
    <div class="relative overflow-y-auto p-4">
      <div bind:this={results_div}></div>

      {#if search_store.is_loading}
        <div
          class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm"
        >
          <Spinner class="size-8" />
          <p class="text-sm text-muted-foreground">검색 중...</p>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  :global(.gsc-control-cse),
  :global(.gsc-control-wrapper-cse) {
    background: transparent !important;
    border: 0 !important;
    padding: 0 !important;
  }

  :global(.gsc-adBlock),
  :global(.gcsc-find-more-on-google) {
    display: none !important;
  }
</style>
