<template>
  <div>
    <div v-if="expanded" :style="expanded_style">
      <NuxtImg
        @click="expanded = false"
        :style="expandable_img_style"
        v-bind="$attrs"
        :src="refinedSrc"
        :alt="alt"
        :width="width"
        :height="height"
        loading="lazy"
        format="webp"
        quality="90"
      />
    </div>
    <NuxtImg
      @click="expanded = true"
      v-bind="$attrs"
      :src="refinedSrc"
      :alt="alt"
      :width="width"
      :height="height"
      loading="lazy"
      format="webp"
      quality="90"
    />
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'ufo';

const expanded = ref(false);
const expandable_style = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  'background-color': 'rgba(0, 0, 0, 0.9)',
  display: 'flex',
  'justify-content': 'center',
  'align-items': 'center',
  'z-index': 9999,
};
const expandable_img_style = {
  width: '100%',
  height: '100%',
  'object-fit': 'contain',
};
const expanded_style = computed((): any => {
  if (expanded.value) {
    return {
      ...expandable_style,
      overflow: 'hidden',
    };
  }
  return {
    ...expandable_style,
    overflow: 'auto',
  };
});

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
});

const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    return withBase(props.src, useRuntimeConfig().app.baseURL);
  }
  return props.src;
});
</script>

<style lang="ts" scoped>
css({
  img: {
    margin: '{prose.img.margin}'
  },
})
</style>
