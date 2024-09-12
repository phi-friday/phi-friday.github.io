import type { MarkdownNode, TocLink } from "@nuxt/content";

import { useCurrentUrlStore } from "~/utils/store/url";

type HasSurround = { surround: ArticleMeta[] };
type HasArticle = { article: Article };

const toc_tags: string[] = ["h1", "h2", "h3", "h4", "h5"] as const;

const add_prefix = (
  prefix: string | null | undefined,
  path: string | null | undefined
) => {
  if (!path) {
    return "";
  }

  if (!path.endsWith("/")) {
    path = path + "/";
  }

  if (!prefix) {
    return path;
  }

  if (!path.startsWith("/")) {
    return prefix + "/" + path;
  }
  return prefix + path;
};

const flatten_toc_links = (links: TocLink[]) => {
  return links
    .map((link) => {
      let _link = [link];
      if (link.children) {
        const flattened = flatten_toc_links(link.children);
        _link = [link, ...flattened];
      }
      return _link;
    })
    .flat(1);
};

const flatten_markdown_nodes = (value: MarkdownNode) => {
  if (!value.children) {
    return [];
  }
  let result: string[] = [];
  for (const sub of value.children) {
    if (sub.type === "text") {
      result = [...result, sub.value as string];
      continue;
    }
    result = [...result, ...flatten_markdown_nodes(sub)];
  }
  return result;
};

export const useCurrentArticleStore = defineStore({
  id: "current_article",
  state: () => ({
    nullable_article: null as Article | null,
    prev: null as ArticleMeta | null,
    next: null as ArticleMeta | null,
    active_toc_ids: new Set<string>(),
  }),
  getters: {
    article: (state): Article => validate_article(state.nullable_article),
    date: (state): string =>
      parse_date_only(state.nullable_article?.date || ""),
    title: (state): string => state.nullable_article?.title || "",
    tags: (state): string[] => state.nullable_article?.tags || [],
    description: (state): string => state.nullable_article?.description || "",
    prev_path: (state): string => {
      const current_url = useCurrentUrlStore();
      return add_prefix(current_url.prefix, state.prev?._path);
    },
    next_path: (state): string => {
      const current_url = useCurrentUrlStore();
      return add_prefix(current_url.prefix, state.next?._path);
    },
    toc_tags: (): string[] => toc_tags,
    toc_links: (state): TocLink[] =>
      state.nullable_article?.body.children
        .filter((value) => toc_tags.indexOf(value.tag ?? "") >= 0)
        .map((value) => ({
          id: value.props?.id as string,
          depth: toc_tags.indexOf(value.tag ?? "") + 1,
          text: flatten_markdown_nodes(value).join(""),
        })) ?? [],
    active_toc_ids_array: (state): string[] => [...state.active_toc_ids],
    flatten_toc_links: (): ((links: TocLink[]) => TocLink[]) =>
      flatten_toc_links,
  },
  actions: {
    set_article(article?: Article | null) {
      this.nullable_article = article || null;
      this.active_toc_ids.clear();
    },
    set_prev(prev?: ArticleMeta | null) {
      this.prev = prev || null;
    },
    set_next(next?: ArticleMeta | null) {
      this.next = next || null;
    },
    sync_article(value?: HasArticle | null) {
      this.set_article(value?.article);
    },
    sync_surround(value?: HasSurround | null) {
      this.set_prev(value?.surround?.[0]);
      this.set_next(value?.surround?.[1]);
    },
    set_active_toc_id(link: TocLink) {
      this.active_toc_ids.clear();
      this.active_toc_ids.add(link.id);
    },
  },
});
