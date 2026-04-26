import type Fuse from "fuse.js";

import type { SearchPost } from "$lib/utils/search";

export type SearchResult = {
  item: SearchPost;
  score: number;
};

class SearchStore {
  #dialog_open = $state(false);
  #last_query = $state("");
  #is_loading = $state(false);
  #results = $state.raw<SearchResult[]>([]);
  #fuse: Fuse<SearchPost> | null = null;

  async #initFuse(): Promise<Fuse<SearchPost>> {
    if (this.#fuse) return this.#fuse;
    const [{ default: Fuse }, posts] = await Promise.all([
      import("fuse.js"),
      fetch("/search-data.json").then(r => r.json() as Promise<SearchPost[]>),
    ]);
    this.#fuse = new Fuse(posts, {
      keys: [
        { name: "title", weight: 0.5 },
        { name: "tags", weight: 0.25 },
        { name: "description", weight: 0.15 },
        { name: "content", weight: 0.1 },
      ],
      includeScore: true,
      threshold: 0.35,
      ignoreLocation: true,
      minMatchCharLength: 2,
      ignoreDiacritics: true,
    });
    return this.#fuse;
  }
  public async startSearch(query: string): Promise<void> {
    this.#last_query = query;
    this.#dialog_open = true;
    this.#is_loading = true;
    try {
      const fuse = await this.#initFuse();
      const raw = fuse.search(query, { limit: 20 });
      this.#results = raw.map(r => ({ item: r.item, score: r.score ?? 1 }));
    } finally {
      this.#is_loading = false;
    }
  }

  public openDialog(): void {
    this.#dialog_open = true;
  }

  public closeDialog(): void {
    this.#dialog_open = false;
  }
  public get dialog_open(): boolean {
    return this.#dialog_open;
  }
  public get last_query(): string {
    return this.#last_query;
  }
  public get is_loading(): boolean {
    return this.#is_loading;
  }
  public get results(): SearchResult[] {
    return this.#results;
  }
}

export const search_store = new SearchStore();
