<script lang="ts">
  import { asset } from "$app/paths";

  $effect.pre(() => {
    // @ts-expect-error: gtag
    window._gtag = import.meta.env.GOOGLE_GTAG;
  });
</script>

<svelte:head>
  {#if import.meta.env.GOOGLE_GTAG}
    <script async src={asset("/js/gtag.js")}></script>
  {/if}
</svelte:head>
