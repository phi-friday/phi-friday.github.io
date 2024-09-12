<template>
  <nav class="toc">
    <header class="toc-header">
      <h3 class="text-xl font-bold">Table of contents</h3>
    </header>
    <ul class="toc-links">
      <li
        v-for="link of current_article.flatten_toc_links(
          current_article.toc_links
        )"
        :id="create_toc_id(link.id)"
        :key="link.id"
        class="toc-link"
        :class="{
          ...create_class_name(link),
          'font-bold': current_article.active_toc_ids.has(link.id),
        }"
        @click="current_article.set_active_toc_id(link)"
      >
        <a :href="`#${link.id}`">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { TocLink } from "@nuxt/content";

import { useCurrentArticleStore } from "@/utils/store/article";

const current_article = useCurrentArticleStore();

const content = ref();
const observer: Ref<IntersectionObserver | null | undefined> = ref(null);
const observerOptions = reactive({
  root: content.value,
  threshold: 0.5,
});
onMounted(() => {
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      if (id) {
        if (entry.isIntersecting) {
          current_article.active_toc_ids.add(id);
        } else {
          current_article.active_toc_ids.delete(id);
        }
      }
    });
  }, observerOptions);
  document
    .querySelectorAll(
      current_article.toc_tags
        .map((toc_tag) => {
          return `.nuxt-content ${toc_tag}[id]`;
        })
        .join(", ")
    )
    .forEach((section) => {
      observer.value?.observe(section);
    });
});

const create_toc_id = (id: string) => {
  return `toc-${id}`;
};

const create_class_name = (link: TocLink) => {
  const obj: { [key: string]: boolean } = {};
  obj[`_${link.depth}`] = true;
  return obj;
};
</script>

<style scoped lang="css">
.toc {
  @apply py-4 max-h-[calc(100vh-6rem)] overflow-auto rounded-lg border;
  @apply bg-slate-50 border-slate-200;
  @apply dark:bg-neutral-900  dark:border-neutral-600;
}

.toc-header {
  @apply px-4 pb-2 mb-2 border-b border-slate-200 dark:border-neutral-600;
}

.toc-links {
  @apply flex flex-col gap-2 px-4;
}

.toc-link {
  @apply text-slate-500 dark:text-neutral-300 text-sm break-keep;
}

.toc-link._3 {
  @apply pl-3;
}
.toc-link._4 {
  @apply pl-6;
}
.toc-link._5 {
  @apply pl-9;
}

.toc-link._undefined {
  @apply pl-8;
}
</style>
