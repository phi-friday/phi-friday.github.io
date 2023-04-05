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
            <ul class="col-span-1 col-start-1 row-auto mr-2">
              <NuxtLink :to="config.public.tag_prefix" class="no-underline">
                <figure class="pt-1 text-lg site-logo">
                  <h1>Tags</h1>
                </figure>
              </NuxtLink>
            </ul>
            <ul class="col-span-1 col-start-2 row-auto links">
              <NuxtLink :to="config.public.page_prefix" class="no-underline">
                <figure class="pt-1 text-lg site-logo">
                  <h1>Pages</h1>
                </figure>
              </NuxtLink>
            </ul>
          </div>
        </nav>
      </div>
      <div class="flex items-center">
        <div class="gcse-searchbox-only"></div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const url = config.public.hostname;
useHead({
  script: [{ async: true, src: 'https://cse.google.com/cse.js?cx=b368175c2b370414c' }],
});
</script>

<style scoped lang="css">
.site-header {
  @apply sticky top-0 w-full p-4 bg-slate-100 bg-opacity-40;
  @apply border-b-2 border-white border-opacity-30 backdrop-blur-lg z-20;
}

.site-header > .wrapper {
  @apply flex items-center justify-start max-w-6xl m-auto gap-x-5;
}

.site-logo {
  @apply font-black;
}
</style>
