<template>
  <ul class="prev-next-cont">
    <li class="link-item prev">
      <NuxtLink v-if="prev" :to="prev_path">
        <ArrowLeftIcon class="icon stroke" />
        <span> {{ prev.title }} </span>
      </NuxtLink>
    </li>
    <li class="link-item next">
      <NuxtLink v-if="next" :to="next_path">
        <span> {{ next.title }} </span>
        <ArrowRightIcon class="icon stroke" />
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/solid';
import type { ArticleMeta } from '~~/utils/article';
const props = defineProps<{
  prefix?: string;
  prev?: ArticleMeta;
  next?: ArticleMeta;
}>();

const add_prefix = (
  prefix: string | null | undefined,
  path: string | null | undefined
) => {
  if (!path) {
    return '';
  }

  if (!prefix) {
    return path;
  }

  if (!path.startsWith('/')) {
    return prefix + '/' + path;
  }
  return prefix + path;
};

const prev_path: string = add_prefix(props.prefix, props.prev?._path);
const next_path: string = add_prefix(props.prefix, props.next?._path);
</script>

<style scoped>
.prev-next-cont {
  @apply flex gap-4 justify-between p-4 border rounded-lg;
  @apply border-slate-200 dark:border-neutral-600;
}

.link-item a {
  @apply flex gap-2;
}
</style>
