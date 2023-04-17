<template>
  <nav class="toc">
    <header class="toc-header">
      <h3 class="text-xl font-bold">Table of contents</h3>
    </header>
    <ul class="toc-links">
      <li
        v-for="link of flatten(links)"
        :key="link.id"
        :id="create_toc_id(link.id)"
        @click="force_active_id(link)"
        class="toc-link"
        :class="{ ...create_class_name(link), 'font-bold': link.id === current_toc_id }"
      >
        <a :href="`#${link.id}`">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { TocLink } from '@nuxt/content/dist/runtime/types';
const props = defineProps<{ links: TocLink[]; active_toc_id?: string }>();

const current_toc_id = ref();

const create_toc_id = (id: string) => {
  return `toc-${id}`;
};
watch(
  () => props.active_toc_id,
  () => {
    current_toc_id.value = props.active_toc_id;
  }
);

const flatten = (links: TocLink[]) => {
  return links
    .map((link) => {
      let _link = [link];
      if (link.children) {
        let flattened = flatten(link.children);
        _link = [link, ...flattened];
      }
      return _link;
    })
    .flat(1);
};
const create_class_name = (link: TocLink) => {
  const obj: { [key: string]: boolean } = {};
  obj[`_${link.depth}`] = true;
  return obj;
};
const force_active_id = (link: TocLink) => {
  current_toc_id.value = link.id;
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
