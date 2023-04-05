<template>
  <li
    class="tag text-slate-700"
    :class="{
      'bg-slate-100': !is_select,
      'bg-sky-200': is_select,
    }"
    @click="toggle_tag"
  >
    <NuxtLink :to="path">
      {{ props.tag }}
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  tag: string;
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
    tags.value.delete(props.tag);
  } else {
    tags.value.add(props.tag);
  }
};
let path : {path: string, query?: {select?: string}}
if (props.do_select ?? false) {
  path = {path: config.public.tag_prefix, query: {select: props.tag}}
} else {
  path = {path: config.public.tag_prefix}
}
</script>
