<script lang="ts">
  import type { HTMLImgAttributes } from "svelte/elements";
  import { on } from "svelte/events";

  import { Portal } from "bits-ui";

  import type { Variant } from "$lib/utils/image";
  import { getImageVariants } from "$lib/utils/image";
  import { cn } from "$lib/utils/ui";

  import { Skeleton } from "$lib/components/ui/skeleton";

  let {
    src: _src,
    class: _class,
    sizes,
    loading,
    alt,
    onload,
    onclick,
    ...data
  }: HTMLImgAttributes = $props();
  let expanded = $state(false);
  let loaded = $state(false);
  let src = $derived(_src && _src.startsWith("/static/") ? _src.replace("/static/", "/") : _src);
  const variants = $derived.by(() => {
    if (!src) return null;
    try {
      return getImageVariants(src);
    } catch {
      return null;
    }
  });
  const avif = $derived(variants?.filter(v => v.format === "avif"));
  const webp = $derived(variants?.filter(v => v.format === "webp"));
  const fallback = $derived(variants?.find(v => v.format === "png") ?? variants?.[0]);
  const toSrcset = (items: Variant[]): string =>
    items
      .slice()
      .sort((a, b) => a.width - b.width)
      .map(v => `${v.src} ${v.width}w`)
      .join(", ");

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

{#snippet picture(props: {
  class?: string | null;
  onClick?: (e: MouseEvent) => void;
  onLoad?: (e: Event) => void;
})}
  <picture>
    {#if avif?.length}
      <source type="image/avif" srcset={toSrcset(avif)} {sizes} />
    {/if}
    {#if webp?.length}
      <source type="image/webp" srcset={toSrcset(webp)} {sizes} />
    {/if}
    {#if fallback}
      <img
        class={cn(_class ?? "", props.class)}
        src={fallback.src}
        {sizes}
        {alt}
        {loading}
        width={fallback.width}
        height={fallback.height}
        {...data}
        onclick={e => props.onClick?.(e)}
        onload={e => props.onLoad?.(e)}
      />
    {/if}
  </picture>
{/snippet}

<Portal>
  {#if expanded}
    <div
      class="fixed top-0 left-0 z-9999 flex h-full w-full items-center justify-center overflow-hidden bg-black/80 select-none"
      onclick={() => (expanded = false)}
      onkeydown={handleKeydown}
      tabindex="0"
      role="button"
    >
      {@render picture({
        class: "max-h-full max-w-full object-contain",
      })}
    </div>
  {/if}
</Portal>
<div class="relative">
  {#if !loaded && fallback}
    <Skeleton class="absolute inset-0" />
  {/if}
  {@render picture({
    class: cn(!loaded && "opacity-0", "transition-opacity duration-300"),
    onClick: e => {
      // @ts-expect-error
      onclick?.(e);
      expanded = true;
    },
    onLoad: e => {
      // @ts-expect-error
      onload?.(e);
      loaded = true;
    },
  })}
</div>
