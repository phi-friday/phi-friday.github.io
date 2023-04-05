<template>
  <main id="main">
    <Post :article="article" :prev="surround[0]" :next="surround[1]" :prefix="prefix" />
    <Comment />
  </main>
</template>

<script setup lang="ts">
import type { ArticleMeta, Article } from '~~/utils/article';

let { path } = useRoute();
const prefix = '/' + (path.split('/').at(1) ?? '');
path = '/' + path.split('/').slice(2).join('/');

const default_query = get_default_query();
const { data: selected_article } = await useAsyncData(`selected_data_${path}`, () => {
  return queryContent<Article>(default_query).where({ _path: path }).findOne();
});
const article = remove_pick_from_ref(selected_article);
const { data: selected_surround } = await useAsyncData(
  `selected_surround_${path}`,
  () => {
    return queryContent<ArticleMeta>(default_query)
      .only(['_path', 'title', 'description'])
      .findSurround(path);
  }
);
const surround = remove_pick_from_ref(selected_surround);
</script>
