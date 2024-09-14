<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      <div class="error">
        <p class="error-code">Error: {{ error.statusCode }}</p>
        <h1 class="error-message">
          {{ error_msg }}
        </h1>
      </div>
      <button
        class="inline-flex items-center justify-center mt-10 gap-x-6"
        @click="redirect_home"
      >
        <p class="go-home">Go back home</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";
const props = defineProps<{
  error: NuxtError;
  path?: string;
}>();

const redirect_home = () => clearError({ redirect: "/" });
const error_msg = computed(() => {
  // strip empty space in error msg
  let message: string | undefined = props.error.message.trim();
  if (message.length > 0) {
    return message;
  }
  message = props.error.statusMessage?.trim();
  if (message?.length ?? 0 > 0) {
    return message;
  }
  return props.path ? `Page not found: ${props.path}` : "Page not found";
});
</script>

<style lang="css" scoped>
.error .error-code {
  @apply text-xl font-semibold text-slate-600 dark:text-neutral-500 sm:text-3xl;
}
.error .error-message {
  @apply mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-500 sm:text-5xl;
}
.go-home {
  @apply rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm;
  @apply text-slate-700 dark:text-neutral-50;
  @apply bg-slate-200 dark:bg-neutral-700 hover:bg-slate-100 hover:dark:bg-neutral-600;
  @apply focus-visible:outline-slate-600;
  @apply focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2;
}
</style>
