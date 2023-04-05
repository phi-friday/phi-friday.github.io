<template>
  <div>
    <section class="w-full" ref="self"></section>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const self = ref<HTMLElement>();
onMounted(() => {
  const script_element = document.createElement('script');
  const comment = config.public.comment;
  for (const key in comment) {
    script_element.setAttribute(
      key.replace('_', '-'),
      // @ts-expect-error
      String(comment[key])
    );
  }
  if (self.value) {
    self.value.appendChild(script_element);
  }
});
</script>