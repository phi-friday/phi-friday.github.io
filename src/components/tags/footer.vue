<template>
  <div class="flex justify-center mb-3">
    <ul class="flex list-none">
      <li>
        <NuxtLink
          :to="{
            path: add_trailing_slash(route.path),
            query: { page: prev_page },
          }"
          class="botton-text"
          :class="{ active: prev_active, inactive: !prev_active }"
          >Previous</NuxtLink
        >
      </li>
      <li v-for="num in page_list" :key="num">
        <NuxtLink
          :to="{ path: add_trailing_slash(route.path), query: { page: num } }"
          class="botton-text"
          :class="{
            active: num !== here_page_remainder + page_min - 1,
            select: num === here_page_remainder + page_min - 1,
          }"
          >{{ num }}</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          :to="{
            path: add_trailing_slash(route.path),
            query: { page: next_page },
          }"
          class="botton-text"
          :class="{ active: next_active, inactive: !next_active }"
          >Next</NuxtLink
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useCurrentTagsStore } from "@/utils/store/tag";
import { add_trailing_slash } from "@/utils/url";

const config = useRuntimeConfig();
const route = useRoute();

const current_tags = useCurrentTagsStore();
const max_page = computed(() => {
  const size = current_tags.selected_posts[0];
  const _max_page = Math.floor(size / config.public.default_limit);
  if (size % config.public.default_limit) {
    return _max_page + 1;
  }
  return _max_page;
});
const pagination_size = config.public.pagination_size;
const max_page_quotient = computed(() => {
  return Math.floor(max_page.value / pagination_size);
});
const max_page_remainder = computed(() => {
  return max_page.value % pagination_size;
});

const page = ref(1);
const here_page_quotient = computed(() => {
  let _here_page_quotient = Math.floor(page.value / pagination_size);
  const _here_page_remainder = page.value % pagination_size;
  if (_here_page_remainder === 0) {
    _here_page_quotient -= 1;
  }
  return _here_page_quotient;
});
const here_page_remainder = computed(() => {
  const _here_page_remainder = page.value % pagination_size;
  return _here_page_remainder === 0 ? pagination_size : _here_page_remainder;
});
const prev_active = computed(() => {
  let _prev_active = true;
  if (here_page_quotient.value === 0) {
    _prev_active = _prev_active && false;
  }
  if (
    here_page_quotient.value === max_page_quotient.value ||
    (here_page_quotient.value + 1 === max_page_quotient.value &&
      here_page_remainder.value > 0)
  ) {
    _prev_active = _prev_active && true;
  }
  return _prev_active;
});
const next_active = computed(() => {
  let _next_active = true;
  if (here_page_quotient.value === 0) {
    _next_active = _next_active && true;
  }
  if (here_page_quotient.value === max_page_quotient.value) {
    _next_active = _next_active && false;
  }
  return _next_active;
});
const page_size = computed(() => {
  if (
    here_page_quotient.value < max_page_quotient.value ||
    here_page_remainder.value === 0
  ) {
    return pagination_size;
  } else {
    return max_page_remainder.value;
  }
});
const page_min = computed(() => {
  let _here_page_quotient = Math.floor(page.value / pagination_size);
  const _here_page_remainder = page.value % pagination_size;
  if (!_here_page_remainder) {
    _here_page_quotient -= 1;
  }
  return _here_page_quotient * pagination_size + 1;
});
const page_list = computed(() => {
  return [...Array(page_size.value).keys()].map((value) => {
    return value + page_min.value;
  });
});
const prev_page = computed(() => {
  let _prev_page = page_list.value.at(0) ?? -1;
  if (_prev_page >= 2) {
    _prev_page -= 1;
  }
  return _prev_page;
});
const next_page = computed(() => {
  let _next_page = page_list.value.at(-1) ?? -1;
  if (_next_page < max_page.value) {
    _next_page += 1;
  }
  return _next_page;
});
const refresh = () => {
  if (!current_tags.selected.size) {
    return;
  }

  let _page: number;
  if (route.query.page) {
    _page = Number(route.query.page);
  } else {
    _page = 1;
  }

  if (_page > max_page.value) {
    throw createError({
      statusCode: 400,
      statusMessage: `invalid page: ${page.value}`,
    });
  }
  page.value = _page;
};
refresh();

watch(
  () => route.query,
  () => {
    refresh();
  }
);
</script>

<style scoped lang="css">
.botton-text {
  @apply relative block px-4 py-2 text-sm transition-all duration-300;
  @apply bg-transparent rounded-full;
}
.botton-text.active {
  @apply text-neutral-700 dark:text-neutral-400;
  @apply hover:bg-neutral-100 dark:hover:bg-neutral-700;
}
.botton-text.inactive {
  @apply text-neutral-400 dark:text-neutral-700 pointer-events-none;
}
.botton-text.select {
  @apply text-neutral-700 dark:text-neutral-200;
  @apply bg-slate-100 dark:bg-neutral-700;
  @apply font-semibold;
}
</style>
