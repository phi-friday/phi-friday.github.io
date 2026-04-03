<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  import SearchIcon from "@lucide/svelte/icons/search";
  import XIcon from "@lucide/svelte/icons/x";

  import { search_store } from "$lib/stores/search.svelte";
  import { cn } from "$lib/utils/ui";

  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";

  let { class: _class, ...rest }: HTMLAttributes<HTMLFormElement> = $props();
  let query = $state("");

  const handleClick = (event?: MouseEvent): void => {
    event?.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    if (trimmed === search_store.last_query) {
      search_store.openDialog();
      return;
    }
    search_store.startSearch(trimmed);
  };

  const handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleClick();
    }
  };
</script>

<form class={cn("mx-auto flex w-64 items-center gap-2", _class)} {...rest}>
  <label for="fuse-search-input" class="sr-only">검색</label>
  <div class="relative w-full">
    <Input
      type="text"
      id="fuse-search-input"
      placeholder="검색..."
      bind:value={query}
      onkeydown={handleKeydown}
      class={cn("w-full", query && "pr-8")}
    />
    {#if query}
      <button
        type="button"
        class="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        onclick={() => (query = "")}
        aria-label="검색어 지우기"
      >
        <XIcon class="size-3.5" />
      </button>
    {/if}
  </div>
  <Button type="button" variant="outline" size="icon" onclick={handleClick}>
    <SearchIcon />
    <span class="sr-only">검색</span>
  </Button>
</form>
