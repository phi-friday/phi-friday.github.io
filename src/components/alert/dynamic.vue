<template>
  <div class="markdown-alert" :class="div_class">
    <p class="prose-p markdown-alert-title" dir="auto">
      <svg
        class="octicon"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        aria-hidden="true"
      >
        <path :d="icon_paths[props.type]"></path>
      </svg>
      <span class="font-bold text-base">{{ props.type.toUpperCase() }}</span>
    </p>
    <slot />
  </div>
</template>
<script setup lang="ts">
import type { IconType } from "@/utils/icon";
import { icon_paths } from "@/utils/icon";

const props = defineProps<{ type: IconType }>();
const div_class = computed(() => `markdown-alert-${props.type}`);
</script>
