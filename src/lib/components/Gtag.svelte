<script lang="ts">
  $effect.pre(() => {
    // @ts-expect-error: gtag
    window._gtag = import.meta.env.GOOGLE_GTAG;
  });
</script>

<svelte:head>
  {#if import.meta.env.GOOGLE_GTAG}
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id={import.meta.env.GOOGLE_GTAG}"
    ></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      try {
        gtag("config", window._gtag);
      } finally {
        delete window._gtag;
      }
    </script>
  {/if}
</svelte:head>
