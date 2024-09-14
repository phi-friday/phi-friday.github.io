<template>
  <div>
    <section class="w-full">
      <ClientOnly>
        <component
          is="script"
          defer
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
import { useColorSchemaStore } from "@/utils/store/color";

const config = useRuntimeConfig();

const color_mode = useColorSchemaStore();
const comment_theme = computed(() =>
  color_mode.safe_color_schema === "dark" ? "github-dark" : "github-light"
);

watch(
  () => color_mode.color_schema,
  () => {
    const msg = {
      type: "set-theme",
      theme: comment_theme.value,
    };
    const utterances = document.querySelector("iframe")?.contentWindow;
    utterances?.postMessage(msg, "https://utteranc.es");
  }
);
</script>
