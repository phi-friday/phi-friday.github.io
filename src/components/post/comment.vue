<template>
  <div>
    <section class="w-full" ref="section_ref">
      <div v-show="show_skleton" class="my-4">
        <SkeletonComment />
      </div>
      <ClientOnly>
        <div id="utterance-container">
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
        </div>
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

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "childList") {
      refresh_utterances_frame();
      return;
    }
  }
});

const utterances_frame = ref<HTMLIFrameElement | null>(null);
const refresh_utterances_frame = () => {
  // @ts-ignore
  utterances_frame.value = document
    .getElementsByClassName("utterances-frame")
    .item(0);
};

const show_skleton = ref<boolean>(true);

watch(color_mode, () => {
  const msg = {
    type: "set-theme",
    theme: comment_theme.value,
  };
  utterances_frame.value?.contentWindow?.postMessage(
    msg,
    "https://utteranc.es"
  );
});
watch(section_view, () => {
  if (section_view.value) {
    comment_once.value = true;
  }
});
watch(utterances_frame, () => {
  show_skleton.value = utterances_frame.value === null;
});
watch(show_skleton, () => {
  if (show_skleton.value) {
    observer.disconnect();
  }
});

onMounted(async () => {
  await nextTick();
  const target = document.getElementById("utterance-container");
  // @ts-ignore
  observer.observe(target, { childList: true });
  setTimeout(() => {
    comment_lock.value = true;
  }, 1000);
});
onUnmounted(() => {
  comment_lock.value = false;
  comment_once.value = false;
});
</script>
