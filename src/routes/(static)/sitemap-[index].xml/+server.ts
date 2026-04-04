import { getSitemapShard, getSitemapShardIndices } from "$lib/utils/sitemap";

import type { EntryGenerator, RequestHandler } from "./$types";

export const entries: EntryGenerator = async () => {
  const indices = await getSitemapShardIndices();
  return indices.map(i => ({ index: String(i) }));
};

export const GET: RequestHandler = async ({ params }) => {
  const index = Number.parseInt(params.index, 10);
  const shard = await getSitemapShard(index);
  if (!shard) return new Response(null, { status: 404 });
  return new Response(shard, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
