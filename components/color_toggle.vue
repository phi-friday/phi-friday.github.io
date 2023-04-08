<template>
  <div @click="toggle_color">
    <ColorScheme placeholder="" tag="span">
      <span>
        <SunIcon v-if="color_now === 'light'" />
        <MoonIcon v-else />
      </span>
    </ColorScheme>
  </div>
</template>

<script setup>
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid';
const color_now = computed(get_color_schema_safe);
const toggle_color = () => {
  if (color_now.value === 'light') {
    set_color_schema_safe('dark');
    return;
  }
  set_color_schema_safe('light');
};
</script>