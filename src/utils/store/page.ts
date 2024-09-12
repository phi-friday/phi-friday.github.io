import type { RouteLocationNormalizedLoadedGeneric } from "vue-router";

export const useCurrentPageStore = defineStore({
  id: "current_page",
  state: () => ({
    nullable_page: null as number | null,
  }),
  getters: {
    page: (state): number => state.nullable_page || 1,
    skip: (state): number => {
      const config = useRuntimeConfig();
      return config.public.default_limit * ((state.nullable_page || 1) - 1);
    },
  },
  actions: {
    sync_page_with_route(route?: RouteLocationNormalizedLoadedGeneric | null) {
      if (!route) {
        route = useRoute();
      }

      if (!route.query.page || Array.isArray(route.query.page)) {
        this.nullable_page = 1;
      } else {
        this.nullable_page = Number(route.query.page);
      }

      if (!this.nullable_page) {
        this.nullable_page = 1;
      }
    },
    clear_page() {
      this.nullable_page = null;
    },
  },
});
