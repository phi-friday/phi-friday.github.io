<script lang="ts">
  import { toc_store } from "$lib/stores/toc.svelte";
  import { scrollToAnchor } from "$lib/utils/scroll.svelte";
  import { cn } from "$lib/utils/ui";

  import { Button } from "$lib/components/ui/button";

  const min_level = $derived(toc_store.min_level);
</script>

<ul class="space-y-1">
  {#each toc_store.items as item (item.id)}
    <li style="padding-left: {(item.level - min_level) * 10}px">
      <Button
        variant="ghost"
        size="sm"
        class={cn(
          "w-full justify-start transition-colors",
          item.id === toc_store.active_id
            ? "border-l-2 border-border bg-muted pl-3 font-medium text-foreground shadow-none"
            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
        )}
        aria-current={item.id === toc_store.active_id ? "location" : undefined}
        onclick={() => scrollToAnchor(item.id)}
      >
        {item.text}
      </Button>
    </li>
  {/each}
</ul>
