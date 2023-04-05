<template>
  <div class="info-box" :class="[type]">
    <ExclamationTriangleIcon v-if="type == 'warning'" class="icon solid" />
    <ExclamationCircleIcon v-else-if="type == 'error'" class="icon solid" />
    <InformationCircleIcon v-else class="icon solid" />
    <ContentSlot :use="$slots.default" unwrap="p" />
  </div>
</template>

<script setup lang="ts">
import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
} from '@heroicons/vue/24/solid';
defineProps(['type']);
</script>

<style scoped lang="css">
.info-box {
  @apply flex items-start my-6 gap-2 p-4 bg-slate-100 border border-slate-200 text-slate-500 rounded-lg;
}
.info-box.warning {
  @apply bg-yellow-200 border-yellow-400 text-yellow-600;
}

.info-box.warning .icon.solid {
  @apply fill-yellow-600;
}

.info-box.error {
  @apply bg-red-200 border-red-400 text-red-600;
}

.info-box.error .icon.solid {
  @apply fill-red-600;
}
</style>
