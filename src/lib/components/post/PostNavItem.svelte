<script lang="ts">
  import ChevronLeftIcon from "@lucide/svelte/icons/chevron-left";
  import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";

  import { cn } from "$lib/utils/ui";

  import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
  } from "$lib/components/ui/item";

  interface Props {
    direction: "prev" | "next";
    title: string;
    href: string;
  }

  const { direction, title, href }: Props = $props();

  const is_prev = $derived(direction === "prev");
  const label = $derived(is_prev ? "이전 글" : "다음 글");
</script>

<div class={cn("sm:flex-1", !is_prev && "sm:flex sm:justify-end")}>
  <Item
    variant="outline"
    class={cn(
      "h-full items-start rounded-2xl bg-background/60 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-accent/40 hover:shadow-md",
      !is_prev && "sm:ml-auto"
    )}
  >
    {#snippet child({ props })}
      <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
      <a {...props} {href}>
        {#if is_prev}
          <ItemMedia
            variant="icon"
            class="text-muted-foreground transition-transform group-hover/item:-translate-x-0.5 group-hover/item:text-foreground"
          >
            <ChevronLeftIcon />
          </ItemMedia>
        {/if}
        <ItemContent class={cn(!is_prev && "sm:items-end")}>
          <ItemTitle class="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            {label}
          </ItemTitle>
          <ItemDescription
            class="line-clamp-2 text-sm leading-6 font-medium text-foreground transition-colors group-hover/item:text-primary"
          >
            {title}
          </ItemDescription>
        </ItemContent>
        {#if !is_prev}
          <ItemMedia
            variant="icon"
            class="text-muted-foreground transition-transform group-hover/item:translate-x-0.5 group-hover/item:text-foreground"
          >
            <ChevronRightIcon />
          </ItemMedia>
        {/if}
      </a>
    {/snippet}
  </Item>
</div>
