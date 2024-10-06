<template>
  <header class="article-header">
    <h1 class="mb-1 heading">{{ current_article.title }}</h1>
    <p v-if="current_article.description" class="mb-1 supporting">
      {{ current_article.description }}
    </p>
    <ul v-if="current_article.tags.length" class="flex-wrap pb-0 article-tags">
      <p class="pt-1 font-mono text-sm font-thin text-slate-400">tags:</p>
      <div v-for="(tag, n) in current_article.tags" :key="n">
        <LazyTagOne :tag="tag" :do_select="true" :use_link="true" />
      </div>
    </ul>
    <p class="font-mono text-sm text-slate-400">
      <span class="font-thin">created at: </span>
      <span class="font-normal">{{ local_date }}</span>
    </p>
  </header>
</template>

<script setup lang="ts">
import { useCurrentArticleStore } from "~/utils/store/article";

const current_article = useCurrentArticleStore();
const local_date = ref("...");
onBeforeMount(() => {
  local_date.value = new Date(current_article.utc_datetime).toLocaleString();
});
</script>

<style scoped lang="css">
.article-header {
  @apply p-4 pb-12;
}

.article-header .heading {
  @apply font-extrabold text-5xl leading-tight break-keep;
}

.article-header .supporting {
  @apply font-medium text-lg;
}
</style>
