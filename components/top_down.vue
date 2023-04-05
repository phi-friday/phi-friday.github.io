<template>
  <div>
    <button type="button" :id="go_to_top_button_id" class="go-button bottom-20 right-5">
      <ArrowSmallUpIcon class="font-medium text-white icon" />
    </button>
    <button
      type="button"
      :id="go_to_bottom_button_id"
      class="go-button bottom-5 right-5"
    >
      <ArrowSmallDownIcon class="font-medium text-white icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ArrowSmallUpIcon, ArrowSmallDownIcon } from '@heroicons/vue/24/solid';
import { create_go_to_top_button, create_go_to_bottom_button } from '~~/utils/scroll';

const props = defineProps<{ top_id?: string; bottom_id?: string }>();

const go_to_top_button_id = props.top_id ?? 'go_to_top_button';
const go_to_bottom_button_id = props.bottom_id ?? 'go_to_bottom_button';
onMounted(() => {
  create_go_to_top_button(go_to_top_button_id, 0);
  create_go_to_bottom_button(go_to_bottom_button_id, 0);
});
</script>

<style scoped lang="css">
.go-button {
  @apply fixed inline-block rounded-full bg-red-500 p-2 uppercase;
  @apply leading-normal shadow-[0_4px_9px_-4px_#dc4c64] transition;
  @apply duration-150 ease-in-out hover:bg-red-600;
  @apply hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)];
  @apply focus:bg-red-600;
  @apply focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)];
  @apply focus:outline-none focus:ring-0 active:bg-red-700;
  @apply active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)];
}
</style>
