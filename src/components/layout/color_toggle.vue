<template>
  <div @click="toggle_color_schema">
    <ColorScheme>
      <MoonIcon v-show="is_dark" />
      <SunIcon v-show="!is_dark" />
    </ColorScheme>
  </div>
</template>

<script setup>
import { get_color_schema, toggle_color_schema } from "@/utils/color";
import { MoonIcon, SunIcon } from "@heroicons/vue/24/solid";

const color_mode = computed(get_color_schema);
const is_dark = computed(() => color_mode.value === "dark");
</script>
