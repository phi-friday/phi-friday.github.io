<script lang="ts">
  import type { HTMLImgAttributes } from "svelte/elements";
  import { on } from "svelte/events";

  import { Portal } from "bits-ui";

  let { src: _src, class: _class, ...data }: HTMLImgAttributes = $props();
  let expanded = $state(false);
  let src = $derived(_src && _src.startsWith("/static/") ? _src.replace("/static/", "/") : _src);
  const handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === "Escape") {
      expanded = false;
    }
  };
  $effect(() => {
    if (expanded) {
      return on(window, "keydown", handleKeydown);
    }
  });
</script>

<Portal>
  {#if expanded}
    <div
      class="fixed top-0 left-0 z-9999 flex h-full w-full items-center justify-center overflow-hidden bg-black/80 select-none"
      onclick={() => (expanded = false)}
      onkeydown={handleKeydown}
      tabindex="0"
      role="button"
    >
      <img class="{_class ?? ''} max-h-full max-w-full object-contain" {src} {...data} />
    </div>
  {/if}
</Portal>
<img class={_class} {src} {...data} onclick={() => (expanded = true)} />
