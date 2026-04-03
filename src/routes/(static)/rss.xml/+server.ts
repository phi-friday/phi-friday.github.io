import { createFeed } from "$lib/utils/rss";

import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = async () => {
  const feed = await createFeed();
  const rss = feed.rss2();

  return new Response(rss, {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
    },
  });
};
