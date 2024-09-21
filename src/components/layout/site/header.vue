<template>
  <header class="site-header">
    <div class="flex flex-nowrap justify-between max-w-6xl m-auto">
      <div class="flex items-start justify-start gap-x-3">
        <NuxtLink to="/" class="no-underline">
          <figure class="text-2xl site-logo">
            <h1>{{ config.public.name }}</h1>
          </figure>
        </NuxtLink>

        <nav class="site-nav">
          <div class="flex flex-nowrap justify-start">
            <div class="justify-between grid grid-cols-1">
              <ul class="mr-2">
                <NuxtLink
                  :to="add_trailing_slash(config.public.tag_prefix)"
                  class="no-underline"
                >
                  <figure class="pt-1 text-lg site-logo">
                    <h1>Tags</h1>
                  </figure>
                </NuxtLink>
              </ul>
            </div>
            <ul class="w-8 h-8 my-0 shrink-0">
              <LayoutColorToggle />
            </ul>
          </div>
        </nav>
      </div>
      <div class="flex shrink items-end justify-end gap-x-5">
        <LazySearchWrapGoogle />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { add_trailing_slash } from "@/utils/url";
const config = useRuntimeConfig();
</script>

<style scoped lang="css">
.site-header {
  @apply sticky top-0 w-full p-4 bg-slate-100 bg-opacity-40;
  @apply border-b-2 border-white border-opacity-30 backdrop-blur-lg z-20;
  @apply dark:bg-neutral-900 dark:border-neutral-800;
}

.site-logo {
  @apply font-black;
}
</style>
