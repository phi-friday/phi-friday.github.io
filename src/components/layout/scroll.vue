<template>
  <div>
    <ColorScheme>
      <button
        ref="top_button"
        type="button"
        class="go-button bottom-20 right-5"
        :class="{ dark: is_dark }"
        @click="go_top"
      >
        <ArrowUpIcon class="font-medium text-white icon" />
      </button>
      <button
        ref="bottom_button"
        type="button"
        class="go-button bottom-5 right-5"
        :class="{ dark: is_dark }"
        @click="go_bottom"
      >
        <ArrowDownIcon class="font-medium text-white icon" />
      </button>
    </ColorScheme>
  </div>
</template>

<script setup lang="ts">
import { get_color_schema } from "@/utils/color";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/vue/24/solid";

const props = defineProps<{
  display_bound?: number;
}>();

const color_mode = computed(get_color_schema);
const top_button = ref<HTMLElement>();
const bottom_button = ref<HTMLElement>();
const { y: scroll_y } = useWindowScroll({ behavior: "auto" });
const display_bound = computed(() => props.display_bound ?? 0);
const is_dark = computed(() => color_mode.value === "dark");

const go_top = () => {
  scroll_y.value = 0;
};
const go_bottom = () => {
  scroll_y.value = document.documentElement.offsetHeight;
};

const set_block = (el: Ref<HTMLElement | undefined>) => {
  if (el.value) {
    el.value.style.display = "block";
  }
};
const set_none = (el: Ref<HTMLElement | undefined>) => {
  if (el.value) {
    el.value.style.display = "none";
  }
};

watch(
  () => scroll_y.value,
  () => {
    if (display_bound.value <= 0) {
      set_block(top_button);
      set_block(bottom_button);
      return;
    }

    if (
      document.body.scrollTop > display_bound.value ||
      document.documentElement.scrollTop > display_bound.value
    ) {
      set_block(top_button);
      set_block(bottom_button);
    } else {
      set_none(top_button);
      set_none(bottom_button);
    }
  }
);
</script>

<style scoped lang="css">
.go-button {
  @apply fixed inline-block rounded-full p-2 uppercase;
  @apply leading-normal transition;
  @apply duration-150 ease-in-out;
  @apply focus:outline-none focus:ring-0;
  @apply shadow-[0_4px_9px_-4px_#dc4c64];
  @apply bg-red-500 hover:bg-red-600 focus:bg-red-600 active:bg-red-700;
  @apply hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)];
  @apply focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)];
  @apply active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)];
}
.go-button.dark {
  @apply shadow-[0_4px_9px_-4px_#8C8C8C];
  @apply bg-neutral-500 hover:bg-neutral-600 focus:bg-neutral-600 active:bg-neutral-700;
  @apply hover:shadow-[0_8px_9px_-4px_rgba(10,10,10,0.3),0_4px_18px_0_rgba(10,10,10,0.2)];
  @apply focus:shadow-[0_8px_9px_-4px_rgba(10,10,10,0.3),0_4px_18px_0_rgba(10,10,10,0.2)];
  @apply active:shadow-[0_8px_9px_-4px_rgba(10,10,10,0.3),0_4px_18px_0_rgba(10,10,10,0.2)];
}
</style>
