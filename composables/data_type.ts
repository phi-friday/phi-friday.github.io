import type { ParsedContent } from '@nuxt/content'

function remove_pick_from_ref<T = ParsedContent>(
  value: Ref<Pick<T, any>[] | null> | Ref<Pick<T, any>[]>
): Ref<T[]>;
function remove_pick_from_ref<T = ParsedContent>(
  value: Ref<Pick<T, any> | null> | Ref<Pick<T, any>>
): Ref<T>;
function remove_pick_from_ref<T = ParsedContent>(
  value:
    | Ref<Pick<T, any> | null>
    | Ref<Pick<T, any>>
    | Ref<Pick<T, any>[] | null>
    | Ref<Pick<T, any>[]>
) {
  return value;
}

function remove_pick<T = ParsedContent>(value: Pick<T, any>[]): T[];
function remove_pick<T = ParsedContent>(value: Pick<T, any>): T;
function remove_pick<T = ParsedContent>(value: Pick<T, any>[] | Pick<T, any>) {
  return value;
}

export { remove_pick_from_ref, remove_pick };
