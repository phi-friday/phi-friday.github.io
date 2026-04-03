<script lang="ts">
  import "$lib/styles/google-cse.css";

  import SearchIcon from "@lucide/svelte/icons/search";
  import XIcon from "@lucide/svelte/icons/x";

  import { search_store } from "$lib/stores/search.svelte";

  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Spinner } from "$lib/components/ui/spinner";

  let results_div = $state<HTMLDivElement>();
  let cse_registered = $state(false);
  let active_gname = $state("");
  // eslint-disable-next-line svelte/prefer-writable-derived
  let dialog_search = $state(search_store.last_query);

  // 외부(GoogleSearch)에서 검색이 시작되면 입력창도 동기화
  $effect(() => {
    dialog_search = search_store.last_query;
  });

  const handleDialogSearch = (event: SubmitEvent): void => {
    event.preventDefault();
    const trimmed = dialog_search.trim();
    if (!trimmed) return;
    search_store.startSearch(trimmed);
  };

  // Google CSE에 results 컨테이너 명시 등록
  // 매 마운트마다 고유 gname 사용 → 재등록 충돌 방지
  $effect(() => {
    if (!results_div) return;

    const gname = `storesearch_${Date.now()}`;

    const tryRegister = (): boolean => {
      try {
        // @ts-expect-error: google search api
        const cse = window.google?.search?.cse?.element;
        if (!cse) return false;
        cse.render({ div: results_div, tag: "searchresults-only", gname });
        active_gname = gname;
        cse_registered = true;
        return true;
      } catch {
        return false;
      }
    };

    if (tryRegister()) return;

    const interval = setInterval(() => {
      if (tryRegister()) clearInterval(interval);
    }, 200);

    return (): void => {
      cse_registered = false;
      active_gname = "";
      clearInterval(interval);
    };
  });

  // CSE 등록 완료 후 검색 쿼리 실행
  $effect(() => {
    if (!cse_registered) return;
    const gname = active_gname;
    if (!gname) return;
    const query = search_store.last_query;
    if (!query || !search_store.is_loading) return;

    // @ts-expect-error: google search api
    window.google?.search?.cse?.element?.getElement(gname)?.execute(query);
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

<Dialog.Root
  open={search_store.dialog_open}
  onOpenChange={v => {
    if (!v) search_store.closeDialog();
  }}
>
  <Dialog.Content
    class="top-16 flex max-h-[calc(100dvh-5rem)] w-[calc(100%-2rem)] max-w-4xl translate-y-0 flex-col gap-0 overflow-hidden p-0 sm:top-20 sm:max-h-[calc(100dvh-6rem)] sm:max-w-5xl"
    showCloseButton={false}
  >
    <div
      class="flex flex-wrap items-center gap-3 border-b px-4 py-3 sm:grid sm:grid-cols-[auto_1fr_auto]"
    >
      <Dialog.Header class="sr-only">
        <Dialog.Title>Search Results</Dialog.Title>
        {#if search_store.last_query}
          <Dialog.Description>"{search_store.last_query}"</Dialog.Description>
        {/if}
      </Dialog.Header>
      <span class="shrink-0 text-sm font-semibold">Search</span>
      <form
        class="order-last flex w-full items-center gap-2 sm:order-2 sm:w-full sm:max-w-sm sm:justify-self-center"
        onsubmit={handleDialogSearch}
      >
        <Input
          type="text"
          bind:value={dialog_search}
          placeholder="검색어 입력..."
          class="h-8 min-w-0 flex-1 text-sm"
        />
        <Button type="submit" variant="outline" size="icon" class="h-8 w-8 shrink-0">
          <SearchIcon class="size-4" />
          <span class="sr-only">Search</span>
        </Button>
      </form>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        class="order-2 ml-auto shrink-0 sm:order-3 sm:ml-0"
        onclick={() => search_store.closeDialog()}
      >
        <XIcon />
        <span class="sr-only">Close</span>
      </Button>
    </div>

    <!-- 결과 영역: 로딩 중이면 Spinner 오버레이 -->
    <div class="relative min-h-0 flex-1 overflow-y-auto p-4">
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
  </Dialog.Content>
</Dialog.Root>
