<template>
  <div>
    <section ref="self" class="w-full"></section>
  </div>
</template>

<script setup lang="ts">
import { useColorSchemaStore } from "@/utils/store/color";

const config = useRuntimeConfig();
const self = ref<HTMLElement>();

const color_mode = useColorSchemaStore();
const comment_theme = computed(() =>
  color_mode.safe_color_schema === "dark" ? "github-dark" : "github-light"
);
onMounted(() => {
  const script_element = document.createElement("script");
  const comment = config.public.comment;
  for (const key in comment) {
    script_element.setAttribute(
      key.replace("_", "-"),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      String(comment[key])
    );
  }
  script_element.setAttribute("theme", comment_theme.value);
  if (self.value) {
    self.value.appendChild(script_element);
  }
});

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
