<script lang="ts">
  import type { ContentFile } from "$lib/utils/contents";

  import Comments from "$lib/components/Comments.svelte";
  import Loading from "$lib/components/Loading.svelte";
  import PostNavigation from "$lib/components/post/PostNavigation.svelte";

  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  let post_loaded = $state(false);
  let comments_ref = $state<HTMLElement>();
  let show_comments = $state(false);
  const LazyPost = $derived(
    // oxlint-disable-next-line unicorn/prefer-top-level-await
    Object.entries(import.meta.glob<ContentFile>("../../../../contents/**/*.{md,svx}"))
      .find(([path]) => path.endsWith(`${data.slug}.${data.ext}`))?.[1]?.()
      .then(mod => {
        post_loaded = true;
        return mod.default;
      })
  );

  const page_title = $derived(`${data.metadata.title} | ${import.meta.env.APP_NAME}`);
  const keywords = $derived(data.metadata.tags?.join(", ") ?? "");
  $effect(() => {
    if (!post_loaded || !comments_ref || show_comments) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        show_comments = true;
        observer.disconnect();
      }
    });
    observer.observe(comments_ref);
    return (): void => observer.disconnect();
  });
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

{#await LazyPost}
  <Loading />
{:then Post}
  <Post />
{:catch error}
  <p class="text-red-500">Failed to load content: {error.message}</p>
{/await}
<div bind:this={comments_ref}></div>
<PostNavigation prev={data.prev} next={data.next} />
{#if post_loaded && show_comments}
  <Comments />
{/if}
