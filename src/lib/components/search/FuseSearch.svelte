<script lang="ts">
  import { search_store } from "$lib/stores/search.svelte";

  let { class: class_name = "", ...rest } = $props<{ class?: string }>();

  let query = $state("");

  function handleSubmit(e: SubmitEvent): void {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    if (trimmed === search_store.last_query) {
      search_store.openDialog();
      return;
    }
    search_store.startSearch(trimmed);
  }
</script>

<form class={class_name} onsubmit={handleSubmit} {...rest}>
  <input type="search" bind:value={query} placeholder="검색..." aria-label="블로그 검색" />
  <button type="submit">검색</button>
</form>
