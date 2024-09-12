<template>
  <header class="page-heading">
    <div class="wrapper">
      <h1 class="text-5xl font-extrabold">
        All tagged posts: {{ current_tags.selected_posts[0] }}
      </h1>
      <!-- <p class="text-lg font-medium">
        Selected tags: {{ current_tags.sorted_selected }}
      </p> -->
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCurrentTagsStore } from "@/utils/store/tag";

const current_tags = useCurrentTagsStore();
</script>
