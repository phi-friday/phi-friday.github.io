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
    <p class="font-mono text-sm font-thin text-slate-400">
      created at: {{ current_article.date }}
    </p>
  </header>
</template>

<script setup lang="ts">
import { useCurrentArticleStore } from "~/utils/store/article";

const current_article = useCurrentArticleStore();
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
