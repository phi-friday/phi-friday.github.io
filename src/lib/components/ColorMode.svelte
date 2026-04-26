<script lang="ts">
  import MonitorIcon from "@lucide/svelte/icons/monitor";
  import MoonIcon from "@lucide/svelte/icons/moon";
  import SunIcon from "@lucide/svelte/icons/sun";
  import type { ComponentProps } from "svelte";

  import { readStoredMode, theme_mode } from "$lib/stores/theme.svelte";

  import { Button } from "$lib/components/ui/button";
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";

  type Mode = "light" | "dark" | "system";

  // Initialized synchronously from localStorage to avoid icon flash on first render.
  // Reactive updates from theme_mode are applied via toggleMode directly.
  let display_mode = $state<Mode>(readStoredMode());

  const toggleMode = (): void => {
    let next: Mode;
    if (display_mode === "system") {
      next = "light";
    } else if (display_mode === "light") {
      next = "dark";
    } else {
      next = "system";
    }
    display_mode = next;
    theme_mode.current = next;
  };

  const tooltip_text = $derived(
    display_mode === "light" ? "밝은 모드" : display_mode === "dark" ? "어두운 모드" : "시스템 모드"
  );

  type Props =
    | ComponentProps<typeof SunIcon>
    | ComponentProps<typeof MoonIcon>
    | ComponentProps<typeof MonitorIcon>;

  let { ...rest }: Props = $props();
</script>

<TooltipProvider>
  <Tooltip disableCloseOnTriggerClick>
    <TooltipTrigger>
      {#snippet child({ props })}
        <Button
          {...props}
          type="button"
          variant="ghost"
          size="icon"
          class="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Toggle theme"
          onclick={toggleMode}
        >
          {#if display_mode === "light"}
            <SunIcon {...rest} />
          {:else if display_mode === "dark"}
            <MoonIcon {...rest} />
          {:else}
            <MonitorIcon {...rest} />
          {/if}
        </Button>
      {/snippet}
    </TooltipTrigger>
    <TooltipContent side="bottom">
      <p>{tooltip_text}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
