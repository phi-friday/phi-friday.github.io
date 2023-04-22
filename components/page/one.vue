<template>
  <li class="tag" :class="{ select: is_select }" @click="toggle_page">
    <NuxtLink :to="path">
      {{ props.page }}
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  page: string;
  add_page?: boolean;
  do_select?: boolean;
}>();
const config = useRuntimeConfig();
const page_flag = props.add_page ?? false;
const pages = get_pages();
const is_select = computed(() => {
  if (!page_flag) {
    return false;
  }
  return pages.value.has(props.page);
});
const toggle_page = () => {
  if (!page_flag) {
    return;
  }
  if (is_select.value) {
    set_pages(new Set([...pages.value].filter((element) => element !== props.page)));
  } else {
    set_pages(new Set([...pages.value, props.page]));
  }
};
let path: { path: string; query?: { select?: string } };
if (props.do_select ?? false) {
  path = { path: config.public.page_prefix, query: { select: props.page } };
} else {
  path = { path: config.public.page_prefix };
}
</script>
