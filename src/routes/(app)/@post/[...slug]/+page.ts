import { error } from "@sveltejs/kit";

import { globContentSlugs, loadContentMetadatas } from "$lib/utils/contents";

import type { EntryGenerator, PageLoad } from "./$types";

const TRIM_SLASHES = /^\/+|\/+$/g;
const slugs = globContentSlugs();

export const entries: EntryGenerator = () => {
  return Object.keys(slugs).map(slug => ({ slug }));
};
export const csr = true;
export const ssr = true;

export const load: PageLoad = async ({ params }) => {
  const slug = params.slug.replace(TRIM_SLASHES, "");
  if (!(slug in slugs)) {
    error(404, `Page not found: ${params.slug}`);
  }
  const { ext, module } = slugs[slug];
  const { metadata } = await module();

  const all_metadatas = await loadContentMetadatas();
  const { prev, next } = all_metadatas[slug];

  return { slug, ext, parts: slug.split("/"), metadata, prev, next };
};
