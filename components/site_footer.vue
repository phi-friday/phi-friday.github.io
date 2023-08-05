<template>
  <footer v-if="!root_path" class="site-footer">
    <div class="wrapper">
      <div class="footer-info"></div>
      <ul class="footer-links"></ul>
    </div>
  </footer>
</template>

<script setup lang="ts">
const route = useRoute();
const root_path = computed(() => route.path === '/');
</script>

<style scoped lang="css">
.site-footer {
  @apply px-4 py-12 border-t border-slate-100 dark:border-neutral-800;
}

.site-footer > .wrapper {
  @apply flex flex-wrap gap-16 justify-between m-auto max-w-6xl;
}
</style>
