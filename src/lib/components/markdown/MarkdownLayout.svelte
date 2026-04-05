<script lang="ts" module>
  import StaticImage from "$lib/components/markdown/StaticImage.svelte";
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "$lib/components/ui/table";
  export { StaticImage as img };
  export { Table as table };
  export { TableHeader as thead };
  export { TableBody as tbody };
  export { TableRow as tr };
  export { TableHead as th };
  export { TableCell as td };
  export { TableCaption as caption };
  export { TableFooter as tfoot };
</script>

<script lang="ts">
  import { on } from "svelte/events";

  import { resolve } from "$app/paths";

  import type { ContentMetadata } from "$lib/utils/contents";
  import { formatDate } from "$lib/utils/date";
  import { scrollToAnchor } from "$lib/utils/scroll.svelte";

  import TagBadge from "$lib/components/tag/TagBadge.svelte";
  import { Separator } from "$lib/components/ui/separator";

  interface Props extends ContentMetadata {
    children: import("svelte").Snippet;
  }

  let { children, ...metadata }: Props = $props();

  const formatted_date = $derived(metadata.date ? formatDate(metadata.date) : null);
  const tags = $derived([...new Set(metadata.tags ?? [])].sort((a, b) => a.localeCompare(b)));

  let article_el = $state<HTMLElement | null>(null);

  $effect(() => {
    if (!article_el) return;

    return on(article_el, "click", event => {
      const btn = (event.target as Element).closest<HTMLButtonElement>(".code-copy-btn");
      if (!btn) return;

      const wrapper = btn.closest(".code-block-wrapper");
      const pre = wrapper?.querySelector<HTMLPreElement>("pre.shiki");
      const text = pre?.querySelector("code")?.textContent ?? pre?.textContent ?? "";

      navigator.clipboard
        .writeText(text)
        .then(() => {
          btn.classList.add("copied");
          setTimeout(() => btn.classList.remove("copied"), 2000);
        })
        .catch(() => {
          // clipboard access denied — silently ignore
        });
    });
  });

  function activateHeading(event: MouseEvent | KeyboardEvent): void {
    if (event instanceof KeyboardEvent && event.key !== "Enter" && event.key !== " ") return;

    const target = event.target as Element;
    const heading_element = target.closest(".heading-element");
    if (!heading_element) return;

    const wrapper = heading_element.closest(".markdown-heading");
    if (!wrapper) return;

    const anchor = wrapper.querySelector<HTMLAnchorElement>(".anchor[id]");
    if (!anchor) return;

    event.preventDefault();
    scrollToAnchor(anchor.id);
  }
</script>

<article
  bind:this={article_el}
  class="prose max-w-none pl-6 dark:prose-invert"
  role="presentation"
  onclick={activateHeading}
  onkeydown={activateHeading}
>
  <header class="not-prose mb-8 space-y-4">
    <div class="space-y-3">
      <h1 class="text-text-title text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {metadata.title}
      </h1>

      {#if metadata.date && formatted_date}
        <time
          class="block font-mono text-xs text-muted-foreground"
          datetime={formatted_date.datetime}
        >
          {formatted_date.display}
        </time>
      {/if}

      {#if metadata.description}
        <p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          {metadata.description}
        </p>
      {/if}
    </div>

    {#if tags.length}
      <ul class="flex flex-wrap gap-2">
        {#each tags as tag (tag)}
          <li>
            <a href={resolve(`/(app)/@tags?select=${encodeURIComponent(tag)}`)} class="inline-flex">
              <TagBadge class="rounded-full px-3 py-1 text-xs font-medium">
                {tag}
              </TagBadge>
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </header>

  <Separator data-toc-anchor class="not-prose mb-8 border-border/70" />

  {@render children()}
</article>

<style scoped>
  :global(.heading-element) {
    cursor: pointer;
  }
</style>
