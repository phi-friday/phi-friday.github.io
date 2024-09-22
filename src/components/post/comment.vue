<template>
  <div>
    <section class="w-full" ref="section_ref">
      <div
        v-show="!current_article.nullable_article || !has_frame"
        class="my-4"
      >
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
import { useCurrentArticleStore } from "@/utils/store/article";
const config = useRuntimeConfig();

const current_article = useCurrentArticleStore();
const color_mode = computed(get_color_schema);
const comment_lock = ref<boolean>(false);
const section_ref = ref<HTMLElement | null>(null);
const section_view = useElementVisibility(section_ref);
const comment_theme = computed(() =>
  color_mode.value === "dark" ? "github-dark" : "github-light"
);
const comment_once = ref<boolean>(false);
const comment_flag = computed(
  () =>
    current_article.nullable_article && comment_once.value && comment_lock.value
);
const has_frame = computed(() => utterances_frame.value !== null);

const frame_observer = new MutationObserver(() => {
  refresh_utterances_frame();
  if (utterances_frame.value) {
    frame_observer.disconnect();
  }
  return;
});

const utterances_frame = ref<HTMLIFrameElement | null>(null);
const refresh_utterances_frame = () => {
  // @ts-ignore
  utterances_frame.value = document
    .getElementsByClassName("utterances-frame")
    .item(0);
};

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

onMounted(async () => {
  await nextTick();
  const target = document.getElementById("utterance-container");
  // @ts-ignore
  frame_observer.observe(target, { childList: true });

  let interval: NodeJS.Timeout;
  const setup_interval = () => {
    interval = setTimeout(setup_interval, 1000);
    if (current_article.nullable_article) {
      clearInterval(interval);
      comment_lock.value = true;
    }
  };
  setTimeout(setup_interval, 1000);
});
onUnmounted(() => {
  comment_lock.value = false;
  comment_once.value = false;
});
</script>
