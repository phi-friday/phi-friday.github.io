<template>
  <div @click="color_mode.toggle_color_schema">
    <ColorScheme>
      <MoonIcon v-show="is_dark" />
      <SunIcon v-show="!is_dark" />
    </ColorScheme>
  </div>
</template>

<script setup>
import { useColorSchemaStore } from "@/utils/store/color";
import { MoonIcon, SunIcon } from "@heroicons/vue/24/solid";

const color_mode = useColorSchemaStore();
const is_dark = computed(() => color_mode.safe_color_schema === "dark");
</script>
