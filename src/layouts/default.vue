<template>
  <div>
    <LazyLayoutSiteHeader />
    <slot />
    <LazyLayoutSiteFooter />
    <LazyLayoutScroll />
  </div>
</template>

<script setup lang="ts">
import { get_color_schema } from "@/utils/color";
const color_mode = computed(get_color_schema);
watch(color_mode, () => {
  document.body.setAttribute("color-scheme", color_mode.value);
});
onBeforeMount(async () => {
  await nextTick();
  document.body.setAttribute("color-scheme", color_mode.value);
});
</script>
