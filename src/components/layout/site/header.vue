<template>
  <header class="site-header">
    <div class="flex flex-wrap justify-between max-w-6xl m-auto">
      <div class="flex items-center justify-start gap-x-5">
        <NuxtLink to="/" class="no-underline">
          <figure class="text-2xl site-logo">
            <h1>{{ config.public.name }}</h1>
          </figure>
        </NuxtLink>

        <nav class="site-nav">
          <div class="grid justify-between grid-cols-2">
            <div class="col-span-1 col-start-1">
              <div class="grid justify-between grid-cols-1">
                <ul class="col-span-1 col-start-1 row-auto mr-2">
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
            </div>
            <div class="col-span-1 col-start-2">
              <LayoutColorToggle class="w-8 h-8 mx-2 my-0"></LayoutColorToggle>
            </div>
          </div>
        </nav>
      </div>
      <div class="flex items-center text-black">
        <div class="gcse-searchbox-only"></div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { add_trailing_slash } from "@/utils/url";

const config = useRuntimeConfig();
useHead({
  script: [{ async: true, src: config.public.google.search }],
});
</script>

<style scoped lang="css">
.site-header {
  @apply sticky top-0 w-full p-4 bg-slate-100 bg-opacity-40;
  @apply border-b-2 border-white border-opacity-30 backdrop-blur-lg z-20;
  @apply dark:bg-neutral-900 dark:border-neutral-800;
}

.site-header > .wrapper {
  @apply flex items-center justify-start max-w-6xl m-auto gap-x-5;
}

.site-logo {
  @apply font-black;
}
</style>
