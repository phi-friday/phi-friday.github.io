<template>
  <div>
    <LazyTagsHeader />
    <LazyTagsBody />
    <LazyTagsFooter />
  </div>
</template>

<script setup lang="ts">
import { useCurrentPageStore } from "@/utils/store/page";
import { useCurrentTagsStore } from "@/utils/store/tag";

const route = useRoute();
const config = useRuntimeConfig();
const current_tags = useCurrentTagsStore();
const current_page = useCurrentPageStore();

const default_query = get_default_query();
const { data } = await useAsyncData("maybe_tagged_data", () => {
  return queryContent<TaggedArticle>(default_query)
    .only(["title", "description", "tags", "_path", "date"])
    .find();
});
current_tags.sync_posts(data.value as TaggedArticle[]);

watch(
  () => route.query,
  () => {
    current_page.sync_page_with_route(route);
    current_tags.sync_selected_with_route(route);
  }
);
onMounted(() => {
  current_page.sync_page_with_route(route);
  current_tags.sync_selected_with_route(route);
});

useHead({
  title: `${config.public.name} - All tagged posts`,
  meta: [
    { hid: "description", name: "description", content: "All posts with tags" },
  ],
});
</script>
