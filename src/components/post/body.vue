<template>
  <section class="article-section" v-if="current_article.nullable_article">
    <aside class="aside">
      <LazyPostSide class="toc" />
    </aside>
    <article class="article page">
      <LazyContentRenderer :value="current_article.article">
        <template #empty>
          <p>Article not found</p>
        </template>
        <template #default="{ value }">
          <LazyContentRendererMarkdown
            class="nuxt-content"
            :value="value"
            :components="components"
          />
        </template>
      </LazyContentRenderer>
    </article>
  </section>
</template>

<script setup lang="ts">
import AlertCaution from "@/components/alert/caution.vue";
import AlertImportant from "@/components/alert/important.vue";
import AlertNote from "@/components/alert/note.vue";
import AlertTip from "@/components/alert/tip.vue";
import AlertWarning from "@/components/alert/warning.vue";
import { useCurrentArticleStore } from "@/utils/store/article";

const components = {
  note: AlertNote,
  tip: AlertTip,
  important: AlertImportant,
  warning: AlertWarning,
  caution: AlertCaution,
};
const current_article = useCurrentArticleStore();
</script>

<style scoped lang="css">
.article-section {
  @apply grid grid-cols-8;
}

.aside {
  @apply col-span-full md:col-span-2 row-start-1 w-full pt-14;
}

.aside .toc {
  @apply sticky top-20;
}

.article {
  @apply col-span-full md:col-span-6 md:col-start-1 md:row-start-1 w-full;
  @apply p-4 max-w-3xl m-auto;
}
</style>
