import type { WriteStream } from "node:fs";
import { PassThrough, Readable } from "node:stream";

import { SitemapAndIndexStream, SitemapStream, streamToPromise } from "sitemap";

import { loadContentMetadatas } from "$lib/utils/contents";

export interface SitemapItem {
  url: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
}

type SitemapCache = {
  index: string;
  shards: Map<number, string>;
};

export const createSitemap: () => Promise<SitemapCache> = (() => {
  let cache: SitemapCache | null = null;

  return async (): Promise<SitemapCache> => {
    if (cache) return cache;
    const metadatas = await loadContentMetadatas();
    const hostname = import.meta.env.APP_HOSTNAME.replace(/\/$/, "");
    const items = Object.entries(metadatas)
      .filter(([, meta]) => meta.publish)
      .map(([slug, meta]) => ({
        url: new URL(`/@post/${slug}/`, hostname).toString(),
        lastmod: meta.date,
        changefreq: "daily" as const,
      }));

    const shard_promises = new Map<number, Promise<Buffer>>();

    const stream: SitemapAndIndexStream = new SitemapAndIndexStream({
      limit: 10_000,
      lastmodDateOnly: false,
      encoding: "utf8",
      getSitemapStream: index => {
        const _stream: SitemapStream = new SitemapStream({ hostname });
        const pass = new PassThrough();
        _stream.pipe(pass);
        shard_promises.set(index, streamToPromise(pass));
        return [
          new URL(`/sitemap-${index}.xml`, hostname).toString(),
          _stream,
          // PassThrough is functionally compatible;
          // cast required due to sitemap lib's fs.WriteStream type
          pass as unknown as WriteStream,
        ];
      },
    });

    const index_xml = await streamToPromise(Readable.from(items).pipe(stream)).then(data =>
      data.toString()
    );

    const shard_entries = await Promise.all(
      [...shard_promises.entries()].map(
        async ([i, promise]) => [i, (await promise).toString()] as const
      )
    );
    const shards = new Map<number, string>(shard_entries);

    cache = { index: index_xml, shards };
    return cache;
  };
})();

export const getSitemapShardIndices = async (): Promise<number[]> => {
  const { shards } = await createSitemap();
  return [...shards.keys()];
};

export const getSitemapShard = async (index: number): Promise<string | null> => {
  const { shards } = await createSitemap();
  return shards.get(index) ?? null;
};
