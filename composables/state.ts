const states: Map<string, [() => Ref<any>, (value: any, state?: Ref<any>) => void]> =
  new Map();
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
};
