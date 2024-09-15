<template>
  <div class="mb-2">
    <div class="flex row-span-1 row-start-1 gap-x-2">
      <div class="cta w-icon" @click="current_tags.clear_selected">
        <NuxtLink :to="`${add_trailing_slash(config.public.tag_prefix)}`">
          <ArrowPathRoundedSquareIcon class="icon solid" />
          <span> Reset</span>
        </NuxtLink>
      </div>
      <button
        class="cta w-icon"
        @click="current_tags.toggle = !current_tags.toggle"
      >
        <TagIcon class="icon solid" />
        <span>Tags</span>
      </button>
    </div>
  </div>
  <div
    ref="tag_parent_ref"
    class="tag-list"
    :class="{ active: current_tags.toggle }"
  >
    <ul ref="tag_ref" class="flex flex-wrap article-tags">
      <div v-for="([tag, count], n) in current_tags.sorted_by_count" :key="n">
        <LazyTagOne
          class="font-semibold"
          :tag="tag"
          :count="count"
          :add_tag="true"
        />
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ArrowPathRoundedSquareIcon, TagIcon } from "@heroicons/vue/24/solid";

import { useCurrentTagsStore } from "@/utils/store/tag";
import { add_trailing_slash } from "@/utils/url";

const config = useRuntimeConfig();
const current_tags = useCurrentTagsStore();

const tag_parent_ref = ref<HTMLElement>();
const tag_ref = ref<HTMLElement>();

const refresh = () => {
  if (current_tags.toggle) {
    tag_parent_ref.value?.appendChild(tag_ref.value as HTMLElement);
  } else if (tag_parent_ref.value?.hasChildNodes()) {
    tag_parent_ref.value?.removeChild(tag_ref.value as HTMLElement);
  }
};
onMounted(refresh);
watch(() => current_tags.toggle, refresh);
</script>
