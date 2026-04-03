import { createSitemap } from "$lib/utils/sitemap";

import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = async () => {
  const [sitemap, xml_files] = await createSitemap();
  // oxlint-disable-next-line no-console: FIXME
  console.info("Sitemap generated: %d", xml_files.size);
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
