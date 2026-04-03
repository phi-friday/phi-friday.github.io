<script lang="ts">
  import { tick } from "svelte";

  import { resolve } from "$app/paths";

  import HomeIcon from "@lucide/svelte/icons/home";
  import TagsIcon from "@lucide/svelte/icons/tags";

  import { toc_store } from "$lib/stores/toc.svelte";

  import ColorMode from "$lib/components/ColorMode.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Separator } from "$lib/components/ui/separator";

  let LazyGoogleSearch: Promise<
    typeof import("$lib/components/google/GoogleSearch.svelte")
  > | null = $state(null);

  // 헤더 높이를 CSS 변수로 노출 — .anchor의 scroll-margin-top 계산에 사용
  $effect(() => {
    document.documentElement.style.setProperty("--header-height", `${toc_store.header_height}px`);
  });
  $effect(() => {
    (async function () {
      await tick();
      requestAnimationFrame(() => {
        // oxlint-disable-next-line unicorn/prefer-top-level-await
        LazyGoogleSearch = import("$lib/components/google/GoogleSearch.svelte");
      });
    })();
  });
</script>

<header
  bind:offsetHeight={toc_store.header_height}
  class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
>
  <div class="container mx-auto max-w-6xl px-4 py-2">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <nav class="flex items-center gap-2">
        <Button href={resolve("/(app)")} variant="ghost" class="gap-2 text-xl font-bold">
          <HomeIcon size="1em" />
          <span>{import.meta.env.APP_NAME}</span>
        </Button>

        <Separator orientation="vertical" class="mx-2 h-6" />

        <Button href={resolve("/(app)/@tags")} variant="ghost" size="sm" class="gap-2">
          <TagsIcon size="1em" />
          <span>Tags</span>
        </Button>
      </nav>

      <div class="flex w-full items-center justify-end gap-2 sm:w-auto">
        {#if LazyGoogleSearch}
          {#await LazyGoogleSearch then { default: GoogleSearch }}
            <GoogleSearch class="w-full sm:w-64" />
          {/await}
        {/if}
        <ColorMode />
      </div>
    </div>
  </div>
</header>
