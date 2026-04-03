<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { cn } from "$lib/utils/ui";

  import { Badge } from "$lib/components/ui/badge";

  let {
    variant = "outline",
    class: className,
    children,
    ...rest
  }: ComponentProps<typeof Badge> = $props();
</script>

<Badge {variant} class={cn("h-auto py-1 select-none", className)} {...rest}>
  {#if children}
    {@render children()}
  {/if}
</Badge>
