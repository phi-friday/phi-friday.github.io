import { loadContentMetadatas } from "$lib/utils/contents";

export interface SearchPost {
  slug: string;
  title: string;
  tags: string[];
  description: string;
  date: string;
}

export const loadSearchPostDatas = async (): Promise<SearchPost[]> => {
  const metadatas = await loadContentMetadatas();
  return Object.entries(metadatas)
    .filter(([, meta]) => meta.publish !== false)
    .map(
      ([slug, meta]) =>
        ({
          slug,
          title: meta.title,
          tags: meta.tags ?? [],
          description: meta.description ?? "",
          date: meta.date,
        }) satisfies SearchPost
    );
};
