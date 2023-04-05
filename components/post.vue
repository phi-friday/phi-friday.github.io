<template>
  <div class="article-main">
    <div>
      <header class="article-header">
        <h1 class="mb-1 heading">{{ props.article.title }}</h1>
        <p v-if="Boolean(article.description)" class="mb-1 supporting">
          {{ props.article.description }}
        </p>
        <ul v-if="props.article.tags?.length" class="flex-wrap pb-0 article-tags">
          <p class="pt-1 font-mono text-sm font-thin text-slate-400">tags:</p>
          <div v-for="(tag, n) in props.article.tags" :key="n">
            <Tag :tag="tag" :do_select="true" />
          </div>
        </ul>
        <ul v-if="article.page" class="flex-wrap mt-0 mb-1 article-tags">
          <p class="pt-1 font-mono text-sm font-thin text-slate-400">page:</p>
          <Page :page="article.page" :do_select="true" />
        </ul>
        <p class="font-mono text-sm font-thin text-slate-400">created at: {{ date }}</p>
      </header>
    </div>
    <hr />
    <div>
      <section class="article-section">
        <aside class="aside">
          <Toc class="toc" :links="toc_links" :active_toc_id="active_toc_id" />
        </aside>
        <article class="article page">
          <ContentRenderer class="nuxt-content" :value="props.article" ref="content">
            <template #empty>
              <p>No content found.</p>
            </template>
          </ContentRenderer>
        </article>
      </section>
      <PrevNext :prev="prev" :next="next" :prefix="prefix" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Article, ArticleMeta } from '~~/utils/article';
import { TocLink, MarkdownNode } from '@nuxt/content/dist/runtime/types';
const props = defineProps<{
  article: Article;
  prev?: ArticleMeta | null;
  next?: ArticleMeta | null;
  prefix?: string;
}>();

const re_date = /\d{4}-[01]{1}\d{1}-[0-3]{1}\d{1}/;
const prev = props.prev ?? undefined
const next = props.next ?? undefined

if (!re_date.test(props.article.date)) {
  throw createError({
    statusCode: 400,
    statusMessage: `invalid date string: ${props.article.date}`,
  });
}
const date = props.article.date.match(re_date)?.at(0) as string;

const config = useRuntimeConfig();
useHead({
  title: `${config.public.name} - ${props.article.title}`,
  meta: [
    { hid: 'description', name: 'description', content: props.article.description },
  ],
});

const flatten = (value: MarkdownNode) => {
  if (!value.children) {
    return [];
  }
  let result: string[] = [];
  for (const sub of value.children) {
    if (sub.type === 'text') {
      result = [...result, sub.value as string];
      continue;
    }
    result = [...result, ...flatten(sub)];
  }
  return result;
};
const toc_tags = ['h1', 'h2', 'h3', 'h4', 'h5'];
const toc_links: TocLink[] = props.article.body.children
  .filter((value) => {
    return toc_tags.indexOf(value.tag ?? '') >= 0;
  })
  .map((value) => {
    return {
      id: value.props?.id as string,
      depth: toc_tags.indexOf(value.tag ?? '') + 1,
      text: flatten(value).join(''),
    };
  });

const active_toc_id = ref();
const content = ref();
const observer: Ref<IntersectionObserver | null | undefined> = ref(null);
const observerOptions = reactive({
  root: content.value,
  threshold: 0.5,
});
onMounted(() => {
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id');
      if (entry.isIntersecting) {
        active_toc_id.value = id;
      }
    });
  }, observerOptions);
  document
    .querySelectorAll(
      [1, 2, 3, 4, 5]
        .map((value) => {
          return `.nuxt-content h${value}[id]`;
        })
        .join(', ')
    )
    .forEach((section) => {
      observer.value?.observe(section);
    });
});
onUnmounted(() => {
  observer.value?.disconnect();
});
</script>

<style scoped lang="css">
.article-main {
  @apply p-4 max-w-5xl m-auto;
}

.article-header {
  @apply p-4 pb-12;
}

.article-header .heading {
  @apply font-extrabold text-5xl;
}

.article-header .supporting {
  @apply font-medium text-lg;
}
.article-section {
  @apply grid grid-cols-8;
}

.aside {
  @apply col-span-full md:col-span-2 row-start-1 w-full pt-14;
}

.aside .toc {
  @apply sticky top-20;
}

.article {
  @apply col-span-full md:col-span-6 md:col-start-1 md:row-start-1 w-full;
  @apply p-4 max-w-3xl m-auto;
}
</style>
