<template>
  <li class="tag" :class="{ select: is_select }" @click="toggle_tag">
    <NuxtLink :to="path">
      {{ tag }}
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  tag: string;
  count?: number;
  add_tag?: boolean;
  do_select?: boolean;
}>();
const config = useRuntimeConfig();
const tag_flag = props.add_tag ?? false;
const tags = get_tags();
const is_select = computed(() => {
  if (!tag_flag) {
    return false;
  }
  return tags.value.has(props.tag);
});
const toggle_tag = () => {
  if (!tag_flag) {
    return;
  }
  if (is_select.value) {
    set_tags(new Set([...tags.value].filter((element) => element !== props.tag)));
  } else {
    set_tags(new Set([...tags.value, props.tag]));
  }
};
let path: { path: string; query?: { select?: string } };
if (props.do_select ?? false) {
  path = { path: config.public.tag_prefix, query: { select: props.tag } };
} else {
  path = { path: config.public.tag_prefix };
}
const tag = props.count ?? 0 > 0 ? `${props.tag} [${props.count}]` : props.tag;
</script>
