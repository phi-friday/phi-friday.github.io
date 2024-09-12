import { defineStore } from "pinia";
import { useRoute } from "vue-router";

export const useCurrentUrlStore = defineStore({
  id: "current_url",
  state: () => ({
    route_path: null as string | null,
  }),
  getters: {
    path: (state): string => parse_path(state.route_path || ""),
    prefix: (state): string => "/" + (state.route_path?.split("/").at(1) ?? ""),
  },
  actions: {
    sync_route() {
      const { path: route_path } = useRoute();
      this.route_path = route_path;
    },
    validate_url(prefix: string) {
      validate_url(prefix, this.path);
    },
  },
});
