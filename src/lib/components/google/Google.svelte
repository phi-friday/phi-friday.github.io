<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  import { cn } from "$lib/utils/ui";

  let {
    id = "google-searchbox-container",
    class: _class,
    ...rest
  }: HTMLAttributes<EventTarget> = $props();

  let container = $state<HTMLDivElement>();

  // oxlint-disable-next-line typescript/no-explicit-any
  let google_element = $state<any>();

  // oxlint-disable-next-line typescript/no-explicit-any
  export const getGoogleElement = (): any => {
    if (!google_element) {
      try {
        // @ts-expect-error: google search api
        google_element = window.google.search.cse.element.getElement("storesearch");
      } catch (error) {
        // oxlint-disable-next-line no-console: FIXME
        console.error("Google Search API not loaded yet: %s", error);
      }
    }
    return google_element;
  };
</script>

<svelte:head>
  <script defer src={import.meta.env.GOOGLE_SEARCH}></script>
</svelte:head>

<div bind:this={container} {id} class={cn("flex items-center text-black", _class)} {...rest}>
  <div class="gcse-searchbox-only" data-gname="storesearch"></div>
</div>
