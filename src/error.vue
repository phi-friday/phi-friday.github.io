<template>
  <div>
    <NuxtLayout name="default">
      <CommonError :error="error" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";
defineProps<{ error: NuxtError }>();
</script>
