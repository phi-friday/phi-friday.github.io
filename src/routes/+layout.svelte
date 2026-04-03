<script lang="ts">
  // oxlint-disable-next-line import/no-relative-parent-imports
  import "../app.css";

  import { asset, resolve } from "$app/paths";

  import Header from "$lib/components/Header.svelte";
  import ScrollButtons from "$lib/components/ScrollButtons.svelte";
  import FuseSearchResults from "$lib/components/search/FuseSearchResults.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <title>{import.meta.env.APP_NAME}</title>
  <meta
    name="author"
    content="{import.meta.env.APP_AUTHOR_EMAIL}, {import.meta.env.APP_AUTHOR_NAME}"
  />
  <meta name="description" content={import.meta.env.APP_DESCRIPTION} />
  <meta name="google-site-verification" content={import.meta.env.GOOGLE_SEO} />
  <link rel="sitemap" type="application/xml" title="Sitemap" href={resolve("/sitemap.xml")} />
  <link rel="alternate" type="application/rss+xml" title="RSS" href={resolve("/rss.xml")} />
  <link rel="apple-touch-icon" sizes="180x180" href={asset("/apple-touch-icon.png")} />
  <link rel="icon" type="image/png" sizes="32x32" href={asset("/favicon-32x32.png")} />
  <link rel="icon" type="image/png" sizes="16x16" href={asset("/favicon-16x16.png")} />
  <link rel="icon" type="image/x-icon" href={asset("/favicon.ico")} />
  <link rel="manifest" href={asset("/site.webmanifest")} />
</svelte:head>

<Header />
<FuseSearchResults />
{@render children()}
<ScrollButtons />
