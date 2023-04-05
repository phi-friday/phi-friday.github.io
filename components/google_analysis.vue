<template>
</template>
<script setup lang="ts">
const config = useRuntimeConfig()
useHead({
  script: [
    { async: true, src: config.public.google.analysis },
    { src: '/google.js' },
  ],
});
</script>
