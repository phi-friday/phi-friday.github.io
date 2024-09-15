<template>
  <div>
    <LazyLayoutSiteHeader />
    <slot />
    <LazyLayoutSiteFooter />
    <LazyLayoutScroll />
  </div>
</template>

<script setup lang="ts">
import { useColorSchemaStore } from "@/utils/store/color";

const color_mode = useColorSchemaStore();
watch(
  () => color_mode.color_schema,
  () => {
    document.body.setAttribute("color-scheme", color_mode.safe_color_schema);
  }
);
onBeforeMount(async () => {
  await nextTick();
  document.body.setAttribute("color-scheme", color_mode.safe_color_schema);
});
</script>
