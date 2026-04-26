<script lang="ts">
  import ArrowDown from "@lucide/svelte/icons/arrow-down";
  import ArrowUp from "@lucide/svelte/icons/arrow-up";
  import { ScrollState } from "runed";

  import Toc from "$lib/components/toc/Toc.svelte";
  import { Button } from "$lib/components/ui/button";
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";

  interface Props {
    displayBound?: number;
  }

  let { displayBound = 0 }: Props = $props();

  const scroll = new ScrollState({ element: (): Window => window, behavior: "instant" });

  const is_toc_visible = $derived(displayBound <= 0 || scroll.y > displayBound);
</script>

<Toc bottomClass={is_toc_visible ? "bottom-35" : "bottom-5"} />

<TooltipProvider>
  {#if is_toc_visible}
    <Tooltip disableCloseOnTriggerClick>
      <TooltipTrigger>
        {#snippet child({ props })}
          <Button
            {...props}
            type="button"
            variant="default"
            size="icon"
            class="fixed right-5 bottom-20 z-50 size-10 rounded-full shadow-md hover:shadow-lg active:scale-95"
            aria-label="맨 위로 이동"
            onclick={() => scroll.scrollToTop()}
          >
            <ArrowUp class="size-4" />
          </Button>
        {/snippet}
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>맨 위로 이동</p>
      </TooltipContent>
    </Tooltip>

    <Tooltip disableCloseOnTriggerClick>
      <TooltipTrigger>
        {#snippet child({ props })}
          <Button
            {...props}
            type="button"
            variant="default"
            size="icon"
            class="fixed right-5 bottom-5 z-50 size-10 rounded-full shadow-md hover:shadow-lg active:scale-95"
            aria-label="맨 아래로 이동"
            onclick={() => scroll.scrollToBottom()}
          >
            <ArrowDown class="size-4" />
          </Button>
        {/snippet}
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>맨 아래로 이동</p>
      </TooltipContent>
    </Tooltip>
  {/if}
</TooltipProvider>
