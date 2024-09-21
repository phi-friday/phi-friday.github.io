type color_schema = "light" | "dark";
const _default_color_schema: color_schema = "light";
const _color_schemas_all = (): Set<string> =>
  new Set<string>(["light", "dark"]);
const _check_is_color_schema = (color: string): color is color_schema =>
  _color_schemas_all().has(color);

const get_color_schema = (): color_schema => {
  const color_mode = useColorMode();
  if (
    color_mode.unknown ||
    color_mode.preference === "system" ||
    !_check_is_color_schema(color_mode.value)
  ) {
    return _default_color_schema;
  }
  return color_mode.value;
};
const set_color_schema = (color: color_schema) => {
  const color_mode = useColorMode();
  if (_check_is_color_schema(color)) {
    color_mode.preference = color;
  }
};
const toggle_color_schema = () => {
  const color_schema = get_color_schema();
  if (color_schema === "light") {
    set_color_schema("dark");
  } else {
    set_color_schema("light");
  }
};

export { get_color_schema, set_color_schema, toggle_color_schema };
