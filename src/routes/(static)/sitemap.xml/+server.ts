import { createSitemap } from "$lib/utils/sitemap";

import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = async () => {
  const { index } = await createSitemap();
  return new Response(index, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
