import { createFeed } from "$lib/utils/rss";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  const feed = await createFeed();
  const atom = feed.atom1();

  return new Response(atom, {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
    },
  });
};
