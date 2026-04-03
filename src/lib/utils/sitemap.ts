import { createWriteStream } from "node:fs";
import { resolve as pathResolve } from "node:path";
import { Readable } from "node:stream";

import { SitemapAndIndexStream, SitemapStream, streamToPromise } from "sitemap";

import { loadContentMetadatas } from "$lib/utils/contents";

export interface SitemapItem {
  url: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
}

export const createSitemap: () => Promise<[string, Set<string>]> = (() => {
  let sitemap: string | null = null;
  const xml_files: Set<string> = new Set();

  return async (): Promise<[string, Set<string>]> => {
    if (sitemap) return [sitemap, xml_files];
    const metadatas = await loadContentMetadatas();
    const hostname = import.meta.env.APP_HOSTNAME.replace(/\/$/, "");
    const items = Object.entries(metadatas)
      .filter(([, meta]) => meta.publish)
      .map(([slug, meta]) => {
        const path = `/@post/${slug}/`;
        return {
          url: new URL(path, hostname).toString(),
          lastmod: meta.date,
          changefreq: "daily",
        };
      });
    const stream: SitemapAndIndexStream = new SitemapAndIndexStream({
      limit: 10_000,
      lastmodDateOnly: false,
      encoding: "utf8",
      getSitemapStream: index => {
        const _stream: SitemapStream = new SitemapStream({
          hostname,
        });
        const path = `./static/sitemap-${index}.xml`;
        xml_files.add(path);
        const ws = _stream.pipe(createWriteStream(pathResolve(path)));

        return [new URL(`/sitemap-${index}.xml`, hostname).toString(), _stream, ws];
      },
    });

    sitemap = await streamToPromise(Readable.from(items).pipe(stream)).then(data =>
      data.toString()
    );
    // oxlint-disable-next-line typescript/no-non-null-assertion
    return [sitemap!, xml_files];
  };
})();
