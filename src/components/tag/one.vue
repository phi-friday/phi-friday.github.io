<template>
  <li
    class="tag"
    :class="{ select: current_tags.selected.has(props.tag) }"
    @click="toggle_tag"
  >
    <NuxtLink v-if="use_link" :to="path">
      {{ tag }}
    </NuxtLink>
    <div v-else>
      {{ tag }}
    </div>
  </li>
</template>

<script setup lang="ts">
import { useCurrentTagsStore } from "@/utils/store/tag";

const props = defineProps<{
  tag: string;
  count?: number;
  add_tag?: boolean;
  do_select?: boolean;
  use_link?: boolean;
}>();
const config = useRuntimeConfig();
const current_tags = useCurrentTagsStore();
const toggle_tag = () => {
  if (!props.add_tag) {
    return;
  }
  if (current_tags.selected.has(props.tag)) {
    current_tags.remove_tag(props.tag);
  } else {
    current_tags.add_tag(props.tag);
  }
};
let path: { path: string; query?: { select?: string } };
if (props.do_select ?? false) {
  path = {
    path: add_trailing_slash(config.public.tag_prefix),
    query: { select: props.tag },
  };
} else {
  path = { path: add_trailing_slash(config.public.tag_prefix) };
}
const tag = props.count ?? 0 > 0 ? `${props.tag} [${props.count}]` : props.tag;
</script>
