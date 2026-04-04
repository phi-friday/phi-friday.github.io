import { loadContentMetadatas } from "$lib/utils/contents";

import type { PageLoad } from "./$types";

export const csr = true;
export const ssr = true;

export const load: PageLoad = async () => {
  const metadatas = await loadContentMetadatas();
  const counts: Record<string, number> = {};
  for (const meta of Object.values(metadatas)) {
    for (const tag of meta.tags ?? []) {
      counts[tag] = (counts[tag] || 0) + 1;
    }
  }
  const tags = Object.keys(counts).toSorted((left, right) => {
    const _left = left.toLowerCase();
    const _right = right.toLowerCase();
    if (_left < _right) return -1;
    if (_left > _right) return 1;
    return 0;
  });
  return { metadatas, counts, tags };
};
