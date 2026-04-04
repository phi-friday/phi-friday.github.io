<script lang="ts">
  import type { HighlightSegment } from "$lib/utils/search";

  let { segments }: { segments: HighlightSegment[] } = $props();
</script>

{#each segments as seg, index (index)}
  {#if seg.highlighted}
    <mark class="rounded-[2px] bg-yellow-200/80 px-px text-inherit dark:bg-yellow-600/30">
      {seg.text}
    </mark>
  {:else}
    {seg.text}
  {/if}
{/each}
