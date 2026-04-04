<script lang="ts">
  import { resolve } from "$app/paths";

  import SearchIcon from "@lucide/svelte/icons/search";
  import XIcon from "@lucide/svelte/icons/x";

  import { search_store } from "$lib/stores/search.svelte";
  import { formatDate } from "$lib/utils/date";
  import { buildQueryHighlightSegments, buildQuerySnippetSegments } from "$lib/utils/search";
  import { cn } from "$lib/utils/ui";

  import HighlightText from "$lib/components/search/HighlightText.svelte";
  import TagBadge from "$lib/components/tag/TagBadge.svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import * as Item from "$lib/components/ui/item";
  import { Spinner } from "$lib/components/ui/spinner";

  // eslint-disable-next-line svelte/prefer-writable-derived
  let dialog_search = $state(search_store.last_query);

  $effect(() => {
    dialog_search = search_store.last_query;
  });

  const handleDialogSearch = (event: SubmitEvent): void => {
    event.preventDefault();
    const trimmed = dialog_search.trim();
    if (!trimmed) return;
    search_store.startSearch(trimmed);
  };
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
        <div class="relative min-w-0 flex-1">
          <Input
            type="text"
            bind:value={dialog_search}
            placeholder="검색어 입력..."
            class={cn("h-8 w-full text-sm", dialog_search && "pr-8")}
          />
          {#if dialog_search}
            <button
              type="button"
              class="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onclick={() => (dialog_search = "")}
              aria-label="검색어 지우기"
            >
              <XIcon class="size-3.5" />
            </button>
          {/if}
        </div>
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
    <div class="relative min-h-0 flex-1 overflow-y-auto p-4">
      {#if search_store.is_loading}
        <div
          class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm"
        >
          <Spinner class="size-8" />
          <p class="text-sm text-muted-foreground">검색 중...</p>
        </div>
      {:else if search_store.results.length === 0}
        <div class="flex h-32 items-center justify-center">
          <p class="text-sm text-muted-foreground">
            {search_store.last_query
              ? `"${search_store.last_query}"에 대한 결과가 없습니다.`
              : "검색어를 입력하세요."}
          </p>
        </div>
      {:else}
        <ul class="space-y-2">
          {#each search_store.results as { item } (item.slug)}
            {@const query = search_store.last_query}
            {@const { display, datetime } = formatDate(item.date)}
            {@const snippet_segs = buildQuerySnippetSegments(item.content, query)}
            <li>
              <Item.Root variant="outline">
                {#snippet child({ props })}
                  <a
                    {...props}
                    href={resolve("/(app)/@post/[...slug]", { slug: item.slug })}
                    onclick={() => search_store.closeDialog()}
                  >
                    <Item.Content>
                      <Item.Title>
                        <span>
                          <HighlightText
                            segments={buildQueryHighlightSegments(item.title, query)}
                          />
                        </span>
                      </Item.Title>
                      <time {datetime} class="text-xs text-muted-foreground">{display}</time>
                      {#if item.description}
                        <Item.Description>
                          <HighlightText
                            segments={buildQueryHighlightSegments(item.description, query)}
                          />
                        </Item.Description>
                      {/if}
                      {#if snippet_segs.length > 0}
                        <p class="mt-1 line-clamp-2 text-xs text-muted-foreground">
                          <HighlightText segments={snippet_segs} />
                        </p>
                      {/if}
                    </Item.Content>
                    {#if item.tags.length > 0}
                      <Item.Footer class="justify-start">
                        {#each item.tags as tag (tag)}
                          <TagBadge>{tag}</TagBadge>
                        {/each}
                      </Item.Footer>
                    {/if}
                  </a>
                {/snippet}
              </Item.Root>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </Dialog.Content>
</Dialog.Root>
