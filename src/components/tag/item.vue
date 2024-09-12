<template>
  <div>
    <NuxtLink :to="add_prefix(article._path, 'post')">
      <div class="wrapper">
        <header>
          <h1 class="text-2xl font-semibold">{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <ul class="flex-wrap article-tags">
            <div v-for="(tag, n) in article_tags" :key="n">
              <TagOne :tag="tag" :add_tag="props.add_tag" :use_link="false" />
            </div>
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
const props = defineProps<{
  article: FixTaggedArticle;
  post_prefix?: string;
  tag_prefix?: string;
  add_tag?: boolean;
}>();
const article = props.article;
const re_date = /\d{4}-[01]{1}\d{1}-[0-3]{1}\d{1}/;

if (!re_date.test(article.date)) {
  throw createError({
    statusCode: 400,
    statusMessage: `invalid date string: ${article.date}`,
  });
}
const date = article.date.match(re_date)?.at(0) as string;
const article_tags = [...new Set(article.tags)].sort(
  (left: string, right: string) => {
    return left.localeCompare(right);
  }
);

const add_prefix = (
  path: string | null | undefined,
  how: "post" | "tag",
  prefix: string | undefined = undefined
) => {
  let _prefix = prefix;
  if (!_prefix) {
    if (how === "post") {
      _prefix = props.post_prefix;
    } else {
      _prefix = props.tag_prefix;
    }
  }

  if (!path || !_prefix) {
    return add_trailing_slash(path ?? undefined);
  }

  if (path.startsWith("/")) {
    return add_trailing_slash(_prefix + path);
  }
  return add_trailing_slash(_prefix + "/" + path);
};
</script>
