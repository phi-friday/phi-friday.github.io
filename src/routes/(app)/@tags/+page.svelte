<script lang="ts">
  import { SvelteURLSearchParams } from "svelte/reactivity";

  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { page } from "$app/state";

  import SearchXIcon from "@lucide/svelte/icons/search-x";
  import { watch } from "runed";

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
  let _selected: string[] | null = $state.raw(null);
  const selected = {
    get value(): string[] {
      return _selected ?? data.selected;
    },
    set value(v: string[]) {
      _selected = v;
    },
  };

  let metadatas: Record<string, ContentMetadata> = $derived(
    Object.fromEntries(
      Object.entries(data.metadatas).filter(([_slug, meta]) => {
        if (selected.value.length === 0) return true;
        return selected.value.every(tag => meta.tags?.includes(tag));
      })
    )
  );
  const update_params = new SvelteURLSearchParams();
  watch(
    () => selected.value,
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
    },
    { lazy: true }
  );

  let display_limit = $state(20);

  $effect(() => {
    void _selected;
    display_limit = 20;
  });

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

<svelte:head>
  {#if page.url.searchParams.has("select")}
    <meta name="robots" content="noindex,follow" />
  {/if}
</svelte:head>

<div>
  <!-- Page header -->
  <div class="mb-6 flex items-center justify-between">
    <h1 class="text-3xl font-bold">Tags</h1>
    <span class="text-sm text-muted-foreground">
      {Object.keys(metadatas).length} posts
      {#if selected.value.length > 0}
        · {selected.value.length} tags selected
      {/if}
    </span>
  </div>

  <!-- Filter panel -->
  <TagFilterPanel tags={data.tags} counts={data.counts} bind:selected={selected.value} />

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
