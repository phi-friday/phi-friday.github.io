<template>
  <div class="mb-2">
    <div class="flex row-span-1 row-start-1 gap-x-2">
      <div class="cta w-icon" @click="reset_tag">
        <NuxtLink :to="`${config.public.tag_prefix}`">
          <ArrowPathRoundedSquareIcon class="icon solid" />
          <span> Reset</span>
        </NuxtLink>
      </div>
      <button @click="toggle_expand" class="cta w-icon">
        <TagIcon class="icon solid" />
        <span>Tags</span>
      </button>
    </div>
  </div>
  <div class="tag-list" ref="tag_parent_ref" :class="{ active: expanded }">
    <ul
      class="flex flex-wrap article-tags"
      ref="tag_ref"
      :class="{ expanded: expanded }"
    >
      <div v-for="(tag, n) in article_tags" :key="n">
        <Tag class="font-semibold" :tag="tag" :add_tag="true" />
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { TagIcon, ArrowPathRoundedSquareIcon } from '@heroicons/vue/24/solid';
import type { FixTaggedArticle } from '~~/utils/article';
const props = defineProps<{ tag_data: FixTaggedArticle[] }>();
const config = useRuntimeConfig();

const flatten = (tags: any, key: any = undefined) => {
  let _tags = tags
    .map((tag: any) => {
      let _tag = tag;
      if (tag[key]) {
        let flattened = flatten(tag[key]);
        _tag = flattened;
      }
      return _tag;
    })
    .flat(1);
  return _tags;
};

const tags = get_tags();
const reset_tag = () => {
  tags.value.clear();
};
const _article_tags = [...new Set(flatten(props.tag_data, 'tags'))]
  .filter((value: any) => {
    return typeof value == 'string';
  })
  .sort((left, right) => {
    return (left as string).localeCompare(right as string);
  });
const article_tags = _article_tags as string[];

const expanded = get_expanded();
const toggle_expand = () => {
  set_expanded(!expanded.value, expanded);
};
const tag_parent_ref = ref<HTMLElement>();
const tag_ref = ref<HTMLElement>();
const toggle_tag = () => {
  if (expanded.value) {
    tag_parent_ref.value?.appendChild(tag_ref.value as HTMLElement);
  } else {
    tag_parent_ref.value?.removeChild(tag_ref.value as HTMLElement);
  }
};
onMounted(() => toggle_tag());
watch(
  () => expanded.value,
  () => toggle_tag()
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
