<script lang="ts">
  import type { ContentFile } from "$lib/utils/contents";

  import Comments from "$lib/components/Comments.svelte";
  import PostNavigation from "$lib/components/post/PostNavigation.svelte";

  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const Post = $derived(
    await Object.entries(import.meta.glob<ContentFile>("../../../../contents/**/*.{md,svx}"))
      .find(([path]) => path.endsWith(`${data.slug}.${data.ext}`))?.[1]?.()
      .then(mod => mod.default)
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

<Post />
<PostNavigation prev={data.prev} next={data.next} />
<Comments />
