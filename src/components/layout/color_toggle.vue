<template>
  <div @click="color_mode.toggle_color_schema">
    <ColorScheme>
      <MoonIcon v-if="color_mode.safe_color_schema === 'dark'" />
      <SunIcon v-else />
    </ColorScheme>
  </div>
</template>

<script setup>
import { MoonIcon, SunIcon } from "@heroicons/vue/24/solid";

import { useColorSchemaStore } from "@/utils/store/color";

const color_mode = useColorSchemaStore();
</script>
