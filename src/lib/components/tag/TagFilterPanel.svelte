<script lang="ts">
  import { flip } from "svelte/animate";

  import ArrowDown10Icon from "@lucide/svelte/icons/arrow-down-1-0";
  import ArrowDownAZIcon from "@lucide/svelte/icons/arrow-down-a-z";
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import RotateCcwIcon from "@lucide/svelte/icons/rotate-ccw";
  import TagIcon from "@lucide/svelte/icons/tag";

  import { Button } from "$lib/components/ui/button";
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "$lib/components/ui/collapsible";
  import { ToggleGroup, ToggleGroupItem } from "$lib/components/ui/toggle-group";

  interface Props {
    tags: string[];
    counts: Record<string, number>;
    selected?: string[] | null;
  }

  let { tags, counts, selected = $bindable([]) }: Props = $props();

  let open = $state(true);
  let sort_by_count = $state(false);

  const sorted_tags = $derived(
    sort_by_count
      ? [...tags].toSorted((a, b) => {
          const diff = (counts[b] ?? 0) - (counts[a] ?? 0);
          return diff === 0 ? a.localeCompare(b) : diff;
        })
      : tags
  );

  const resetTags = (): void => {
    selected = [];
  };

  const toggleSort = (): void => {
    sort_by_count = !sort_by_count;
  };
</script>

<Collapsible bind:open class="mb-6 rounded-lg border border-border bg-card p-4">
  <div class="flex items-center gap-2">
    <CollapsibleTrigger>
      {#snippet child({ props })}
        <Button {...props} variant="ghost" size="sm" class="gap-1 text-xs">
          <TagIcon size="0.875em" /> Tags
          <ChevronDownIcon size="0.875em" class="transition-transform {open ? 'rotate-180' : ''}" />
        </Button>
      {/snippet}
    </CollapsibleTrigger>

    {#if selected?.length}
      <Button
        variant="ghost"
        size="sm"
        onclick={resetTags}
        class="h-7 gap-1 px-2 text-xs text-muted-foreground"
      >
        <RotateCcwIcon size="0.875em" /> Reset
      </Button>
    {/if}

    <Button
      variant="ghost"
      size="sm"
      type="button"
      onclick={toggleSort}
      class="ml-auto h-7 gap-1 px-2 text-xs"
    >
      {#if sort_by_count}
        <ArrowDown10Icon size="0.875em" /> 게시글 순
      {:else}
        <ArrowDownAZIcon size="0.875em" /> 이름순
      {/if}
    </Button>
  </div>

  <CollapsibleContent class="mt-2">
    <ToggleGroup
      type="multiple"
      bind:value={() => selected ?? [], v => (selected = v)}
      variant="outline"
      size="sm"
      spacing={1.5}
      class="w-full flex-wrap justify-start"
    >
      {#each sorted_tags as tag (tag)}
        <span animate:flip={{ duration: 250 }} class="inline-flex">
          <ToggleGroupItem value={tag}>
            <span>{tag}</span>
            {#if counts[tag] !== undefined}
              <span class="text-[0.75em] opacity-60">
                ({counts[tag]})
              </span>
            {/if}
          </ToggleGroupItem>
        </span>
      {/each}
    </ToggleGroup>
  </CollapsibleContent>
</Collapsible>
