<template>
  <KeepAlive>
    <div class="flex items-center text-black">
      <div class="gcse-searchbox-only"></div>
    </div>
  </KeepAlive>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
useHead({
  script: [{ defer: true, src: config.public.google.search }],
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
