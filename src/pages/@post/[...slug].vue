<template>
  <main id="main">
    <LazyCommonError v-if="error" :error="error" :path="current_url.path" />
    <div v-else>
      <div class="article-main">
        <PostHeader />
        <hr />
        <PostBody />
        <PostFooter />
      </div>
      <ClientOnly>
        <PostComment />
      </ClientOnly>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";
import { useCurrentArticleStore } from "@/utils/store/article";
import { useCurrentUrlStore } from "@/utils/store/url";

const config = useRuntimeConfig();
const current_article = useCurrentArticleStore();
const current_url = useCurrentUrlStore();
const error = ref<NuxtError | null>(null);

current_url.sync_route();
current_url.validate_url(config.public.post_prefix);

const default_query = get_default_query();
const { data } = await useAsyncData(
  `selected_data_with_surround_${current_url.path}`,
  async () => {
    const result: any = {};
    const article = queryContent(default_query)
      .where({ _path: current_url.path })
      .findOne()
      .then((value) => (result.article = value));
    const surround = queryContent(default_query)
      .only(["_path", "title", "description"])
      .findSurround(current_url.path)
      .then((value) => (result.surround = value));

    await Promise.all([article, surround]);
    return result as { article: Article; surround: ArticleMeta[] };
  }
);

if (!data.value) {
  console.error("Article not found, path: %s", current_url.path);
  error.value = createError({
    statusCode: 404,
  });
}

current_article.sync_article(data.value);
current_article.sync_surround(data.value);

useHead({
  title: `${config.public.name} - ${current_article.title}`,
  meta: [
    {
      hid: "description",
      name: "description",
      content: current_article.description,
    },
  ],
});
</script>

<style scoped lang="css">
.article-main {
  @apply p-4 max-w-5xl m-auto;
}
</style>
