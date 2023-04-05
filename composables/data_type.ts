import type {
  FixPageArticle,
  FixTaggedArticle,
  PageArticle,
  TaggedArticle,
} from '~~/utils/article';

import { ParsedContent } from '@nuxt/content/dist/runtime/types';

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

export { remove_pick_from_ref };
