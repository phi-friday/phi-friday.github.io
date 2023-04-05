<template>
  <div class="mb-2">
    <div class="flex row-span-1 row-start-1 gap-x-2">
      <div class="cta w-icon" @click="reset_page">
        <NuxtLink :to="`${config.public.page_prefix}`">
          <ArrowPathRoundedSquareIcon class="icon solid" />
          <span> Reset</span>
        </NuxtLink>
      </div>
      <button @click="toggle_expand" class="cta w-icon">
        <DocumentIcon class="icon solid" />
        <span>Pages</span>
      </button>
    </div>
  </div>
  <div class="tag-list" ref="page_parent_ref" :class="{ active: expanded }">
    <ul
      class="flex flex-wrap article-tags"
      ref="page_ref"
      :class="{ expanded: expanded }"
    >
      <div v-for="(page, n) in article_pages" :key="n">
        <Page class="font-semibold" :page="page" :add_page="true" />
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ArrowPathRoundedSquareIcon, DocumentIcon } from '@heroicons/vue/24/solid';
import type { FixPageArticle } from '~~/utils/article';
const props = defineProps<{ page_data: FixPageArticle[] }>();
const config = useRuntimeConfig();

const pages = get_pages();
const reset_page = () => {
  pages.value.clear();
};
const article_pages = [
  ...new Set(
    props.page_data.map((value) => {
      return value.page;
    })
  ),
].sort((left, right) => {
  return left.localeCompare(right);
});

const expanded = get_expanded();
const toggle_expand = () => {
  set_expanded(!expanded.value, expanded);
};
const page_parent_ref = ref<HTMLElement>();
const page_ref = ref<HTMLElement>();
const toggle_page = () => {
  if (expanded.value) {
    page_parent_ref.value?.appendChild(page_ref.value as HTMLElement);
  } else {
    page_parent_ref.value?.removeChild(page_ref.value as HTMLElement);
  }
};
onMounted(() => toggle_page());
watch(
  () => expanded.value,
  () => toggle_page()
);
</script>

<style scoped lang="css">
.tag-list {
  @apply items-center gap-2 p-2 border;
  @apply border-transparent rounded-lg;
}
.tag-list.active {
  @apply border-slate-200;
}
.article-tags {
  @apply transition-all max-w-0 overflow-hidden;
}
.article-tags.expanded {
  @apply max-w-full;
}
</style>
