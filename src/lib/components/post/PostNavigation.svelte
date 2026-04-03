<script lang="ts">
  import { resolve } from "$app/paths";

  import PostNavItem from "$lib/components/post/PostNavItem.svelte";

  interface NavItem {
    slug: string;
    title: string;
  }

  interface Props {
    prev?: NavItem | null;
    next?: NavItem | null;
  }

  const { prev = null, next = null }: Props = $props();
</script>

{#if prev || next}
  <nav class="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
    {#if prev}
      <PostNavItem
        direction="prev"
        title={prev.title}
        href={resolve("/(app)/@post/[...slug]", { slug: prev.slug })}
      />
    {/if}

    {#if next}
      <PostNavItem
        direction="next"
        title={next.title}
        href={resolve("/(app)/@post/[...slug]", { slug: next.slug })}
      />
    {/if}
  </nav>
{/if}
