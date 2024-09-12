<template>
  <section class="article-section">
    <aside class="aside">
      <PostSide class="toc" />
    </aside>
    <article class="article page">
      <ContentRenderer class="nuxt-content" :value="current_article.article">
        <ContentRendererMarkdown
          :value="current_article.article"
          :components="components"
        />
      </ContentRenderer>
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
