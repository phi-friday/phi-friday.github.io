import { createFeed } from "$lib/utils/rss";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  const feed = await createFeed();
  const json = feed.json1();

  return new Response(json, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};
