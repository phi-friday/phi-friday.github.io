<script lang="ts">
  import type { Component } from "svelte";

  import Comments from "$lib/components/Comments.svelte";
  import Loading from "$lib/components/Loading.svelte";
  import PostNavigation from "$lib/components/post/PostNavigation.svelte";

  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const ComponentPromise: Promise<Component> | undefined = $derived(
    // oxlint-disable-next-line unicorn/prefer-top-level-await
    Object.entries(import.meta.glob("../../../../contents/**/*.{md,svx}"))
      .find(([path]) => path.endsWith(`${data.slug}.${data.ext}`))?.[1]?.()
      // @ts-expect-error: dynamic import
      .then(mod => mod.default)
      .catch((error: unknown) => {
        // oxlint-disable-next-line no-console: FIXME
        console.error(`Failed to load content for slug: ${data.slug}.${data.ext}`, error);
        throw error;
      })
  );

  const page_title = $derived(`${data.metadata.title} | ${import.meta.env.APP_NAME}`);
  const keywords = $derived(data.metadata.tags?.join(", ") ?? "");
</script>

<svelte:head>
  <title>{page_title}</title>
  {#if data.metadata.description}
    <meta name="description" content={data.metadata.description} />
  {/if}
  {#if keywords}
    <meta name="keywords" content={keywords} />
  {/if}
</svelte:head>

{#await ComponentPromise}
  <Loading />
{:then LoadedComponent}
  <LoadedComponent />
  <PostNavigation prev={data.prev} next={data.next} />
  <Comments />
{:catch error}
  <p class="text-red-500">Failed to load content: {error.message}</p>
{/await}
