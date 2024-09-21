<template>
  <div>
    <section class="w-full" ref="section_ref">
      <ClientOnly>
        <component
          v-if="comment_flag"
          is="script"
          async
          :src="config.public.comment.src"
          :repo="config.public.comment.repo"
          :issue-term="config.public.comment.issue_term"
          :crossorigin="config.public.comment.crossorigin"
          :theme="comment_theme"
        />
      </ClientOnly>
    </section>
  </div>
</template>

<script setup lang="ts">
import { get_color_schema } from "@/utils/color";
const config = useRuntimeConfig();

const color_mode = computed(get_color_schema);
const comment_lock = ref<boolean>(false);
const section_ref = ref<HTMLElement | null>(null);
const section_view = useElementVisibility(section_ref);
const comment_theme = computed(() =>
  color_mode.value === "dark" ? "github-dark" : "github-light"
);
const comment_once = ref<boolean>(false);
const comment_flag = computed(() => comment_once.value && comment_lock.value);

watch(color_mode, () => {
  const msg = {
    type: "set-theme",
    theme: comment_theme.value,
  };
  const utterances = document.querySelector("iframe")?.contentWindow;
  utterances?.postMessage(msg, "https://utteranc.es");
});
watch(section_view, () => {
  if (section_view.value) {
    comment_once.value = true;
  }
});

onMounted(() => {
  setTimeout(() => {
    comment_lock.value = true;
  }, 1000);
});
onUnmounted(() => {
  comment_lock.value = false;
  comment_once.value = false;
});
</script>
