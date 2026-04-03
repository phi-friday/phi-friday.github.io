<script lang="ts">
  import { untrack } from "svelte";
  import { SvelteURLSearchParams } from "svelte/reactivity";

  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { page } from "$app/state";

  import SearchXIcon from "@lucide/svelte/icons/search-x";
  import { Debounced, watch } from "runed";

  import type { ContentMetadata } from "$lib/utils/contents";

  import PostCard from "$lib/components/post/PostCard.svelte";
  import TagFilterPanel from "$lib/components/tag/TagFilterPanel.svelte";
  import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
  } from "$lib/components/ui/empty";

  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  let selected = $state<string[]>([]);
  const debounced_selected = new Debounced(() => [...selected], 300);
  let metadatas: Record<string, ContentMetadata> = $derived(
    Object.fromEntries(
      Object.entries(data.metadatas).filter(([_slug, meta]) => {
        if (selected.length === 0) return true;
        return selected.every(tag => meta.tags?.includes(tag));
      })
    )
  );
  const update_params = new SvelteURLSearchParams();
  watch(
    () => debounced_selected.current,
    $selected => {
      update_params.delete("select");
      for (const tag of $selected) {
        update_params.append("select", tag);
      }
      goto(resolve(`/(app)/@tags?${update_params}`), {
        replaceState: true,
        keepFocus: true,
        noScroll: true,
      });
    }
  );
  $effect.pre(() => {
    if (browser) {
      untrack(() => {
        selected = page.url.searchParams.getAll("select");
      });
    }
  });

  let display_limit = $state(20);

  watch(
    () => selected.length,
    () => {
      display_limit = 20;
    }
  );

  const visible_entries = $derived(
    Object.entries(metadatas)
      .toSorted(([, a], [, b]) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, display_limit)
  );

  let sentinel = $state<HTMLElement | null>(null);

  $effect(() => {
    if (!sentinel) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0]?.isIntersecting) {
        display_limit += 20;
      }
    });
    observer.observe(sentinel);
    return (): void => {
      observer.disconnect();
    };
  });
</script>

<div>
  <!-- Page header -->
  <div class="mb-6 flex items-center justify-between">
    <h1 class="text-3xl font-bold">Tags</h1>
    <span class="text-sm text-muted-foreground">
      {Object.keys(metadatas).length} posts
      {#if selected.length > 0}
        · {selected.length} tags selected
      {/if}
    </span>
  </div>

  <!-- Filter panel -->
  <TagFilterPanel tags={data.tags} counts={data.counts} bind:selected />

  <!-- Posts list -->
  {#if Object.keys(metadatas).length === 0}
    <Empty class="border py-12">
      <EmptyMedia variant="icon">
        <SearchXIcon />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>포스트가 없습니다</EmptyTitle>
        <EmptyDescription>선택된 태그와 일치하는 포스트가 없습니다.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  {:else}
    <div class="flex flex-col gap-3">
      {#each visible_entries as [slug, metadata] (slug)}
        <PostCard {slug} {metadata} />
      {/each}
    </div>

    <!-- Sentinel for infinite scroll -->
    {#if visible_entries.length < Object.keys(metadatas).length}
      <div bind:this={sentinel} class="h-8" aria-hidden="true"></div>
    {/if}
  {/if}
</div>
