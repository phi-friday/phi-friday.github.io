<template>
  <div class="mb-2">
    <div class="flex row-span-1 row-start-1 gap-x-2">
      <div class="cta w-icon" @click="reset_page">
        <NuxtLink :to="`${add_trailing_slash(config.public.page_prefix)}`">
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
    <ul class="flex flex-wrap article-tags" ref="page_ref">
      <div v-for="([page, count], n) in article_pages" :key="n">
        <PageOne class="font-semibold" :page="page" :count="count" :add_page="true" />
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ArrowPathRoundedSquareIcon, DocumentIcon } from '@heroicons/vue/24/solid';
import type { FixPageArticle } from '~~/utils/article';
const props = defineProps<{ page_data: FixPageArticle[] }>();
const config = useRuntimeConfig();

const reset_page = () => {
  set_pages(new Set());
};
const article_pages = computed((): [string, number][] => {
  const count = get_page_count();
  return [
    ...new Set(
      props.page_data.map((value) => {
        return value.page;
      })
    ),
  ]
    .map((page): [string, number] => [page, count.value.get(page) ?? 0])
    .sort((left, right) => {
      if (left[1] === right[1]) {
        return left[0].localeCompare(right[0]);
      }
      return right[1] > left[1] ? 1 : -1;
    });
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
