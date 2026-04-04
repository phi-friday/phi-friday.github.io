<script lang="ts">
  import { toc_store } from "$lib/stores/toc.svelte";
  import { scrollToAnchor } from "$lib/utils/scroll.svelte";
  import { cn } from "$lib/utils/ui";

  import { Button } from "$lib/components/ui/button";

  const min_level = $derived(toc_store.min_level);
</script>

<ul class="space-y-1">
  {#each toc_store.items as item (item.id)}
    {@const is_active = item.id === toc_store.active_id}
    <li style="padding-left: {(item.level - min_level) * 10}px">
      <Button
        variant="ghost"
        size="sm"
        class={cn("h-auto w-full justify-start text-left whitespace-normal transition-colors", {
          "border-l-2 border-border bg-muted pl-3 font-medium text-foreground shadow-none":
            is_active,
          "text-muted-foreground hover:bg-muted/60 hover:text-foreground": !is_active,
        })}
        aria-current={is_active ? "location" : undefined}
        onclick={() => scrollToAnchor(item.id)}
      >
        {item.text}
      </Button>
    </li>
  {/each}
</ul>
