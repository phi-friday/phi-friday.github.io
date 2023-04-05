<template>
  <div>
    <NuxtLink :to="add_prefix(article._path, 'post')">
      <div class="wrapper">
        <header>
          <h1 class="text-2xl font-semibold">{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <ul class="flex-wrap article-tags">
            <Page :page="article.page" :add_page="true" />
          </ul>
          <p class="font-mono text-sm font-thin text-slate-400">
            created at: {{ date }}
          </p>
        </header>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { FixPageArticle } from '~~/utils/article';
const props = defineProps<{
  article: FixPageArticle;
  post_prefix?: string;
  page_prefix?: string;
}>();
const article = props.article;
const re_date = /\d{4}-[01]{1}\d{1}-[0-3]{1}\d{1}/;

if (!re_date.test(article.date)) {
  throw createError({
    statusCode: 400,
    statusMessage: `invalid date string: ${article.date}`,
  });
} else if (!article.page) {
  throw createError({
    statusCode: 400,
    statusMessage: 'article has no page',
  });
}
const date = article.date.match(re_date)?.at(0) as string

const add_prefix = (
  path: string | null | undefined,
  how: 'post' | 'page',
  prefix: string | undefined = undefined
) => {
  let _prefix = prefix;
  if (!_prefix) {
    if (how === 'post') {
      _prefix = props.post_prefix;
    } else {
      _prefix = props.page_prefix;
    }
  }

  if (!path || !_prefix) {
    return path ?? undefined;
  }

  if (path.startsWith('/')) {
    return _prefix + path;
  }
  return _prefix + '/' + path;
};
</script>