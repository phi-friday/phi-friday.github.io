<script lang="ts">
  import { tick } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  import SearchIcon from "@lucide/svelte/icons/search";

  import { search_store } from "$lib/stores/search.svelte";
  import { cn } from "$lib/utils/ui";

  import Google from "$lib/components/google/Google.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";

  let search = $state("");
  let google_ref = $state<Google>();
  let LazyGoogle: Promise<typeof import("$lib/components/google/Google.svelte")> | null =
    $state(null);
  let { class: _class, ...rest }: HTMLAttributes<HTMLFormElement> = $props();

  const handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleClick();
    }
  };
  const handleClick = (event?: MouseEvent): void => {
    event?.preventDefault();
    const trimmed = search.trim();
    if (!trimmed) return;

    // 동일 키워드 재검색: 새 요청 없이 dialog만 열기
    if (trimmed === search_store.last_query) {
      search_store.openDialog();
      return;
    }

    search_store.startSearch(trimmed);
  };

  $effect(() => {
    google_ref?.getGoogleElement()?.prefillQuery(search);
  });
  $effect(() => {
    (async function () {
      await tick();
      LazyGoogle = import("$lib/components/google/Google.svelte");
    })();
  });
</script>

<form class={cn("mx-auto flex w-64 items-center gap-2", _class)} {...rest}>
  <label for="search-input" class="sr-only">Search</label>
  <Input
    type="text"
    id="search-input"
    placeholder="Google Search"
    required
    bind:value={search}
    onkeydown={handleKeydown}
    class="w-full"
  />
  <Button type="button" variant="outline" size="icon" onclick={handleClick}>
    <SearchIcon />
    <span class="sr-only">Search</span>
  </Button>
</form>
{#if LazyGoogle}
  {#await LazyGoogle then { default: Google }}
    <Google bind:this={google_ref} id="google-searchbox-container" class="hidden" />
  {/await}
{/if}
