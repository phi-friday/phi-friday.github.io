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
        <TagSelect :tag_data="tagged_data" />
        <ul v-if="list.length > 0" class="article-list">
          <li v-for="article in list" :key="article._path" class="article-item">
            <TagItem
              :article="article"
              :post_prefix="config.public.post_prefix"
              :tag_prefix="config.public.tag_prefix"
            />
          </li>
        </ul>
        <p v-else>No articles found.</p>
      </section>
      <Pagination :count_data="tagged_data" how="tag" />
    </div>
  </main>
</template>

<script setup lang="ts">
import type { TaggedArticle, FixTaggedArticle } from '~~/utils/article';

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

const tags = get_tags();
const filter = computed(() => {
  return [...tags.value].sort((left, right) => {
    return left.localeCompare(right);
  });
});
const default_query = get_default_query();
const { data: _maybe_tagged_data } = await useAsyncData('maybe_tagged_data', () => {
  return queryContent<TaggedArticle>(default_query)
    .only(['title', 'description', 'tags', '_path', 'date'])
    .skip(config.public.default_skip)
    .find();
});
const maybe_tagged_data = remove_pick_from_ref(_maybe_tagged_data);
const tagged_data = computed(() => {
  return maybe_tagged_data.value.filter(
    (value) => value.tags?.length
  ) as FixTaggedArticle[];
});
const list = computed(() => {
  const _tags = tags.value;
  if (_tags.size === 0) {
    return tagged_data.value.slice(skip.value, skip.value + limit);
  }
  return tagged_data.value
    .filter((value) => {
      return (
        [...new Set(value.tags)].filter((tag) => {
          return _tags.has(tag);
        }).length == _tags.size
      );
    })
    .slice(skip.value, skip.value + limit);
});

onMounted(() => {
  if (route.query.select && !Array.isArray(route.query.select)) {
    for (const tag_data of tagged_data.value) {
      if (!tag_data.tags) {
        continue;
      }
      if (tag_data.tags.includes(route.query.select)) {
        set_tags(new Set([route.query.select]));
        break;
      }
    }
  }
});

watch(
  () => route.query,
  () => {
    set_skip();
  }
);

const tag_post_count = get_tag_post_count();
const head_text = computed(() => {
  return `All tagged posts: ${tag_post_count.value}`;
});
const desc_text = computed(() => {
  if (tags.value.size > 0) {
    return `Selected tags: ${filter.value}`;
  }
});

useHead({
  title: `${config.public.name} - All tagged posts`,
  meta: [{ hid: 'description', name: 'description', content: 'All posts with tags' }],
});
</script>
