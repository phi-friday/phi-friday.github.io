import { SitemapStream, streamToPromise } from 'sitemap';
import { dirname, resolve } from 'path';

import { ParsedContent } from '@nuxt/content/dist/runtime/types';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { serverQueryContent } from '#content/server';

const BASE_URL = process.env.NUXT_HOSTNAME;
const POST_PREFIX = process.env.POST_PREFIX as string;
const re_date = /\d{4}-[01]{1}\d{1}-[0-3]{1}\d{1}/;

const add_prefix = (path: string | undefined) => {
  if (!path) {
    return undefined;
  }
  if (path.startsWith('/')) {
    return POST_PREFIX + '/' + path.slice(1);
  }
  return POST_PREFIX + '/' + path;
};
const get_date = (doc: ParsedContent) => {
  if (!doc.date || !re_date.test(doc.date)) {
    return undefined;
  }
  return (doc.date as string).match(re_date)?.at(0) as string;
};

export default defineEventHandler(async (event) => {
  const sitemap = new SitemapStream({ hostname: BASE_URL });

  const docs = await serverQueryContent(event)
    .where({ publish: { $eq: true }, title: { $ne: 'dummy' } })
    .find();
  let date: string | undefined;
  for (const doc of docs) {
    date = get_date(doc);
    if (date) {
      sitemap.write({
        url: add_prefix(doc._path),
        changefreq: 'daily',
        lastmod: doc.date,
      });
    } else {
      sitemap.write({ url: add_prefix(doc._path), changefreq: 'daily' });
    }
  }

  const staticEndpoints = getStaticEndpoints();
  for (const staticEndpoint of staticEndpoints) {
    sitemap.write({ url: staticEndpoint, changefreq: 'daily' });
  }

  sitemap.end();
  return streamToPromise(sitemap);
});

function getStaticEndpoints(): string[] {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const files = getFiles(`${__dirname}/../../pages`);
  return files
    .filter((file) => !file.includes('slug')) // exclude dynamic content
    .map((file) => file.split('pages')[1])
    .map((file) => {
      return file.endsWith('index.vue')
        ? file.split('/index.vue')[0]
        : file.split('.vue')[0];
    });
}

/**
 * recursively get all files from /pages folder
 */
function getFiles(dir: string): string[] {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return files.flat();
}
