<template>
  <div>
    <section class="w-full" ref="self"></section>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const self = ref<HTMLElement>();
const color_now = computed(get_color_schema_safe);
const comment_theme = computed(() => `github-${color_now.value}`);
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
  script_element.setAttribute('theme', comment_theme.value);
  if (self.value) {
    self.value.appendChild(script_element);
  }
});
watch(
  () => color_now.value,
  () => {
    const msg = {
      type: 'set-theme',
      theme: comment_theme.value,
    };
    const utterances = document.querySelector('iframe')?.contentWindow;
    utterances?.postMessage(msg, 'https://utteranc.es');
  }
);
</script>
