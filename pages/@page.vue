<template>
  <main>
    <header class="page-heading">
      <div class="wrapper">
        <h1 class="text-5xl font-extrabold">{{ head_text }}</h1>
        <p
          class="text-lg font-medium"
          :class="{ 'text-transparent': desc_text === null }"
        >
          {{ desc_text || '⠀' }}
        </p>
      </div>
    </header>
    <div>
      <section class="page-section">
        <Pages :page_data="page_data" />
        <ul v-if="list.length > 0" class="article-list">
          <li v-for="article in list" :key="article._path" class="article-item">
            <PageItem
              :article="article"
              :post_prefix="config.public.post_prefix"
              :page_prefix="config.public.page_prefix"
            />
          </li>
        </ul>
        <p v-else>No articles found.</p>
      </section>
      <Pagination :count_data="page_data" how="page" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { PageArticle, FixPageArticle } from '~~/utils/article';
const route = useRoute();
const config = useRuntimeConfig();

const get_page = () => {
  let _page: number;
  if (!route.query.page || Array.isArray(route.query.page)) {
    _page = 1;
  } else {
    _page = Number(route.query.page);
  }
  if (!_page) {
    _page = 1;
  }
  return _page;
};
const limit = config.public.default_limit;
const get_skip = () => {
  const page = get_page();
  return config.public.default_skip + limit * (page - 1);
};
const skip = ref();
const set_skip = () => {
  skip.value = get_skip();
};
set_skip();

const pages = get_pages();
const filter = computed(() => {
  return [...pages.value].sort((left, right) => {
    return left.localeCompare(right);
  });
});
const default_query = get_default_query();
const { data: _maybe_page_data } = await useAsyncData('maybe_page_data', () => {
  return queryContent<PageArticle>(default_query)
    .only(['title', 'page', 'description', '_path', 'date'])
    .skip(config.public.default_skip)
    .find();
});
const maybe_page_data = remove_pick_from_ref(_maybe_page_data);
const page_data = computed(()=>{
  return maybe_page_data.value.filter((value) => value.page?.length) as FixPageArticle[]
})
const list = computed(() => {
  const _pages = pages.value;
  if (_pages.size === 0) {
    return page_data.value.slice(skip.value, skip.value + limit);
  }

  return page_data.value
    .filter((value) => _pages.has(value.page))
    .slice(skip.value, skip.value + limit);
});
onMounted(() => {
  if (
    route.query.select &&
    !Array.isArray(route.query.select) &&
    page_data.value.map((value) => value.page).includes(route.query.select)
  ) {
    pages.value.clear();
    pages.value.add(route.query.select);
  }
});

watch(
  () => route.query,
  () => {
    set_skip();
  }
);

const page_post_count = get_page_post_count();
const head_text = computed(() => {
  return `All pages: ${page_post_count.value}`;
});
const desc_text = computed(() => {
  if (pages.value.size > 0) {
    return `Selected pages: ${filter.value}`;
  }
});

useHead({
  title: `${config.public.name} - All pages`,
  meta: [{ hid: 'description', name: 'description', content: 'All posts with pages' }],
});
</script>
