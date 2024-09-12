<template>
  <section class="page-section">
    <TagSelect />
    <ul v-if="current_tags.tagged_posts.length > 0" class="article-list">
      <li
        v-for="article in current_tags.selected_posts[1]"
        :key="article._path"
        class="article-item"
      >
        <TagItem
          :article="article"
          :post_prefix="config.public.post_prefix"
          :tag_prefix="config.public.tag_prefix"
        />
      </li>
    </ul>
    <p v-else>No articles found.</p>
  </section>
</template>

<script setup lang="ts">
import { useCurrentTagsStore } from "@/utils/store/tag";

const config = useRuntimeConfig();
const current_tags = useCurrentTagsStore();
</script>
