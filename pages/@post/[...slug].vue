<template>
  <main id="main">
    <Post :article="article" :prev="prev" :next="next" :prefix="prefix" />
    <Comment />
  </main>
</template>

<script setup lang="ts">
import type { ArticleMeta, Article } from '~~/utils/article';

const config = useRuntimeConfig();
let { path } = useRoute();

if (path === config.public.post_prefix || path === config.public.post_prefix + '/') {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' });
}

const prefix = '/' + (path.split('/').at(1) ?? '');
path = '/' + path.split('/').slice(2).join('/');
if (path.endsWith('/')) {
  path = path.slice(0, -1);
}

const default_query = get_default_query();
const { data } = await useAsyncData(`selected_data_with_surround_${path}`, async () => {
  const article = queryContent(default_query).where({ _path: path }).findOne();
  const surround = queryContent(default_query)
    .only(['_path', 'title', 'description'])
    .findSurround(path);
  return {
    article: await article,
    surround: await surround,
  };
});
let prev: ArticleMeta | undefined = undefined;
let next: ArticleMeta | undefined = undefined;
if (data.value?.surround) {
  [prev, next] = data.value?.surround as ArticleMeta[];
}
const article = data.value?.article as Article;
</script>
