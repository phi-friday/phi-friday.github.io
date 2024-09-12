<template>
  <div class="main_content">
    <div class="grid grid-rows-2">
      <h1 class="main_header">
        <span class="colorful">phi.log</span>
        <span> in github.io</span>
      </h1>
      <div class="enter_container">
        <NuxtLink :to="path">
          <button class="enter_button">
            Enter
            <svg
              class="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAsyncData, useRuntimeConfig } from "#app";
import { computed } from "#imports";
import type { OnlyPathArticle } from "~/utils/article";
import { get_default_query } from "~/utils/query";
import { create_url_with_prefix } from "~/utils/url";

const config = useRuntimeConfig();
const query = get_default_query();
const { data } = await useAsyncData("last-article-only-path", () => {
  return queryContent<OnlyPathArticle>(query)
    .only(["_path"])
    .sort({ date: -1 })
    .limit(1)
    .findOne();
});
const path = computed(() =>
  create_url_with_prefix(config.public.post_prefix, data as any)
);
</script>
<style scoped lang="css">
.main_content {
  @apply flex items-center justify-center h-screen;
}
.main_header {
  @apply mb-4 text-3xl font-extrabold;
  @apply md:text-5xl lg:text-6xl;
  @apply text-gray-900 dark:text-white;
}
.colorful {
  @apply text-transparent bg-clip-text bg-gradient-to-r;
  @apply to-emerald-600 from-sky-400;
}
.enter_container {
  @apply inline-flex items-center justify-center h-12 px-6 m-2;
}
.enter_button {
  @apply inline-flex items-center justify-center px-4 py-2 font-semibold;
  @apply text-blue-700 bg-transparent border;
  @apply border-blue-500 rounded;
  @apply hover:bg-blue-500 hover:text-white hover:border-transparent;
}
</style>
