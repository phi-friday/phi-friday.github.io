<script lang="ts">
  import { search_store } from "$lib/stores/search.svelte";

  // 다이얼로그가 열릴 때만 렌더링
  const open = $derived(search_store.dialog_open);
  const results = $derived(search_store.results);
  const is_loading = $derived(search_store.is_loading);
  const query = $derived(search_store.last_query);
</script>

{#if open}
  <!-- 기존 Google 다이얼로그와 같은 shadcn Dialog 구조 사용 -->
  <dialog>
    <header>
      <span>"{query}" 검색 결과</span>
      <button type="button" onclick={() => search_store.closeDialog()}>닫기</button>
    </header>
    {#if is_loading}
      <p>검색 중...</p>
    {:else if results.length === 0}
      <p>결과가 없습니다.</p>
    {:else}
      <ul>
        {#each results as { item } (item.slug)}
          <li>
            <a href="/{item.slug}" onclick={() => search_store.closeDialog()}>
              <strong>{item.title}</strong>
              {#if item.description}
                <p>{item.description}</p>
              {/if}
              {#if item.tags.length > 0}
                <span>{item.tags.join(", ")}</span>
              {/if}
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </dialog>
{/if}
