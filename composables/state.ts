const states: Map<string, [() => Ref<any>, (value: any, state?: Ref<any>) => void]> =
  new Map();
type color_schema = 'light' | 'dark';
const default_color_schema: color_schema = 'light';
const _color_schemas: color_schema[] = ['light', 'dark'];
const get_color_schemas = () => {
  return new Set([..._color_schemas]);
};

function create_state<T>(
  name: string,
  init?: () => T
): [() => Ref<T>, (value: T, state?: Ref<T>) => void] {
  const maybe = states.get(name);
  if (maybe) {
    return maybe;
  }
  const get_state = () => useState(name, init);
  function set_state<S extends T>(value: S, state?: Ref<T>): void {
    if (state) {
      state.value = value;
    } else {
      const _state = get_state();
      _state.value = value;
    }
  }
  return [get_state, set_state];
}
const [get_expanded, set_expanded] = create_state('expanded', () => false);
const [get_tags, set_tags] = create_state('selected_tags', () => new Set<string>());
const [get_pages, set_pages] = create_state('selected_pages', () => new Set<string>());
const [get_tag_post_count, set_tag_post_count] = create_state(
  'selected_tag_post_count',
  () => 0
);
const [get_page_post_count, set_page_post_count] = create_state(
  'selected_page_post_count',
  () => 0
);
const get_color_schema_safe = (): color_schema => {
  const color_mode = useColorMode();
  if (color_mode.unknown || color_mode.preference === 'system') {
    return default_color_schema;
  }
  const color_schemas = get_color_schemas();
  if (!color_schemas.has(color_mode.value as any)) {
    return default_color_schema;
  }
  return color_mode.value as color_schema;
};
const set_color_schema_safe = (color: color_schema) => {
  const color_schemas = get_color_schemas();
  if (color_schemas.has(color)) {
    const color_mode = useColorMode();
    color_mode.preference = color;
  }
};

export {
  get_expanded,
  set_expanded,
  get_tags,
  set_tags,
  get_pages,
  set_pages,
  get_tag_post_count,
  set_tag_post_count,
  get_page_post_count,
  set_page_post_count,
  get_color_schema_safe,
  set_color_schema_safe,
};
export type { color_schema };
