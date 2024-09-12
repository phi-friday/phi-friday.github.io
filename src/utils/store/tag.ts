import type { RouteLocationNormalizedLoadedGeneric } from "vue-router";

import { useCurrentPageStore } from "@/utils/store/page";

export const useCurrentTagsStore = defineStore({
  id: "current_tags",
  state: () => ({
    tags: new Set<string>(),
    selected: new Set<string>(),
    count: new Map<string, number>(),
    posts: [] as TaggedArticle[],
    tagged_posts: [] as FixTaggedArticle[],
    toggle: true as boolean,
  }),
  getters: {
    sorted_tags: (state): string[] =>
      [...state.tags].sort((left, right) => left.localeCompare(right)),
    sorted_selected: (state): string[] =>
      [...state.selected].sort((left, right) => left.localeCompare(right)),
    sorted_by_count: (state): [string, number][] => {
      return [...state.count.entries()].sort((left, right) => {
        if (left[1] < right[1]) {
          return 1;
        } else if (left[1] > right[1]) {
          return -1;
        }
        return left[0].localeCompare(right[0]);
      });
    },
    selected_posts: (state): [number, FixTaggedArticle[]] => {
      const current_page = useCurrentPageStore();
      const config = useRuntimeConfig();
      if (state.selected.size === 0) {
        return [
          state.tagged_posts.length,
          state.tagged_posts.slice(
            current_page.skip,
            current_page.skip + config.public.default_limit
          ),
        ];
      }
      const selected = state.tagged_posts.filter((post) => {
        return new Set(post.tags).isSupersetOf(state.selected);
      });
      return [
        selected.length,
        selected.slice(
          current_page.skip,
          current_page.skip + config.public.default_limit
        ),
      ];
    },
  },
  actions: {
    sync_posts(posts: TaggedArticle[]) {
      const result = new Map<string, number>();

      const tagged_posts =
        (posts.filter(
          (article) => article.tags?.length
        ) as FixTaggedArticle[]) || [];

      tagged_posts.forEach((article) => {
        article.tags.forEach((tag) => {
          result.set(tag, (result.get(tag) || 0) + 1);
        });
      });

      this.tags = new Set<string>(result.keys());
      this.selected = new Set<string>();
      this.count = new Map<string, number>(result);
      this.posts = posts;
      this.tagged_posts = tagged_posts;
    },
    add_tag(tag: string) {
      if (this.tags.has(tag)) {
        this.selected.add(tag);
      }
    },
    remove_tag(tag: string) {
      this.selected.delete(tag);
    },
    clear_selected() {
      this.selected.clear();
    },
    sync_selected_with_route(
      route?: RouteLocationNormalizedLoadedGeneric | null
    ) {
      if (!route) {
        route = useRoute();
      }

      if (!route.query.select) {
        return;
      }

      if (Array.isArray(route.query.select)) {
        const selected = new Set([...route.query.select]);
        this.selected = selected.intersection(this.tags);
        return;
      }

      if (this.tags.has(route.query.select)) {
        this.selected = new Set<string>([route.query.select]);
      }
    },
  },
});
