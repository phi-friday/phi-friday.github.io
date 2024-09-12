<template>
  <ul class="prev-next-cont">
    <li class="link-item prev">
      <NuxtLink
        v-if="current_article.prev"
        :to="add_trailing_slash(current_article.prev_path)"
      >
        <ArrowLeftIcon class="icon stroke" />
        <span> {{ current_article.prev.title }} </span>
      </NuxtLink>
    </li>
    <li class="link-item next">
      <NuxtLink
        v-if="current_article.next"
        :to="add_trailing_slash(current_article.next_path)"
      >
        <span> {{ current_article.next.title }} </span>
        <ArrowRightIcon class="icon stroke" />
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/24/solid";

import { add_trailing_slash } from "#imports";
import { useCurrentArticleStore } from "~/utils/store/article";

const current_article = useCurrentArticleStore();
</script>

<style scoped>
.prev-next-cont {
  @apply flex gap-4 justify-between p-4 border rounded-lg;
  @apply border-slate-200 dark:border-neutral-600;
}

.link-item a {
  @apply flex gap-2;
}
</style>
