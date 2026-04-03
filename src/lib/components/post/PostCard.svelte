<script lang="ts">
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";

  import type { ContentMetadata } from "$lib/utils/contents";
  import { formatDate } from "$lib/utils/date";

  import TagBadge from "$lib/components/tag/TagBadge.svelte";
  import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";

  interface Props {
    slug: string;
    metadata: ContentMetadata;
  }

  const { slug, metadata }: Props = $props();

  const formatted_date = $derived(formatDate(metadata.date));
  const sorted_tags = $derived(
    [...new Set(metadata.tags ?? [])].sort((a, b) => a.localeCompare(b))
  );
</script>

<Card
  class="group cursor-pointer overflow-hidden border-border/60 bg-card shadow-sm transition-all duration-200 select-none hover:-translate-y-0.5 hover:border-border hover:shadow-md"
  onclick={() => goto(resolve("/(app)/@post/[...slug]", { slug }))}
  role="button"
  tabindex={0}
>
  <CardHeader class="space-y-2">
    <CardTitle class="text-balance text-card-foreground transition-colors group-hover:text-primary">
      <!-- <CardTitle class="text-balance"> -->
      <!-- <a
        href={resolve("/(app)/@post/[...slug]", { slug })}
        class="text-card-foreground transition-colors select-none group-hover:text-primary"
      >
        {metadata.title}
      </a> -->
      {metadata.title}
    </CardTitle>

    {#if metadata.description}
      <CardDescription class="line-clamp-2 text-sm leading-6 text-muted-foreground">
        {metadata.description}
      </CardDescription>
    {/if}
  </CardHeader>

  <CardFooter class="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div class="flex flex-wrap gap-2">
      {#each sorted_tags as t (t)}
        <TagBadge>{t}</TagBadge>
      {/each}
    </div>

    <time
      datetime={formatted_date.datetime}
      class="font-mono text-xs tracking-wide text-muted-foreground"
    >
      {formatted_date.display}
    </time>
  </CardFooter>
</Card>
