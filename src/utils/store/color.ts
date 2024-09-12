type color_schema = "light" | "dark";
const _default_color_schema: color_schema = "light";
const _color_schemas_all = (): Set<string> =>
  new Set<string>(["light", "dark"]);
const _check_is_color_schema = (color: string): color is color_schema =>
  _color_schemas_all().has(color);

export const useColorSchemaStore = defineStore({
  id: "color_schema",
  state: () => ({
    color_schema: _default_color_schema as color_schema,
  }),
  getters: {
    safe_color_schema: (): color_schema => {
      const color_mode = useColorMode();
      if (color_mode.unknown || color_mode.preference === "system") {
        return _default_color_schema;
      }
      if (!_check_is_color_schema(color_mode.value)) {
        return _default_color_schema;
      }
      return color_mode.value;
    },
  },
  actions: {
    set_color_schema_safe(color: color_schema) {
      if (_check_is_color_schema(color)) {
        const color_mode = useColorMode();
        color_mode.preference = color;
        this.color_schema = color;
      }
    },
    toggle_color_schema() {
      if (this.safe_color_schema === "light") {
        this.set_color_schema_safe("dark");
      } else {
        this.set_color_schema_safe("light");
      }
    },
  },
});
