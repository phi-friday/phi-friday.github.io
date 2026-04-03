import { resolve } from "$app/paths";

import { Feed } from "feed";

import { loadContentMetadatas } from "$lib/utils/contents";

export const createFeed: () => Promise<Feed> = (() => {
  let feed: Feed | null = null;
  return async (): Promise<Feed> => {
    if (feed) return feed;
    const metadatas = await loadContentMetadatas();
    const hostname = import.meta.env.APP_HOSTNAME.replace(/\/$/, "");
    feed = new Feed({
      title: import.meta.env.APP_NAME,
      description: import.meta.env.APP_DESCRIPTION,
      id: hostname,
      link: hostname,
      copyright: `All rights reserved ${new Date().getFullYear()}, ${import.meta.env.APP_AUTHOR_NAME}`,
      author: {
        name: import.meta.env.APP_AUTHOR_NAME,
        email: import.meta.env.APP_AUTHOR_EMAIL,
        link: import.meta.env.APP_AUTHOR_URL,
      },
      feedLinks: {
        json: resolve("/rss.json"),
        atom: resolve("/rss.atom.xml"),
      },
    });
    for (const [slug, meta] of Object.entries(metadatas)) {
      if (!meta.publish) continue;
      const path = `/@post/${slug}/`;
      feed?.addItem({
        title: meta.title,
        id: path,
        link: hostname + path,
        description: meta.description,
        date: new Date(meta.date),
      });
    }

    return feed;
  };
})();
