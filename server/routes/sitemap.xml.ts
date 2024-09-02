import { SitemapAndIndexStream, SitemapStream, streamToPromise } from 'sitemap';
import { dirname, resolve } from 'path';

import type { ParsedContent } from '@nuxt/content';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { serverQueryContent } from '#content/server';

const BASE_URL = process.env.NUXT_HOSTNAME;
const POST_PREFIX = process.env.POST_PREFIX as string;
const re_date = /\d{4}-[01]{1}\d{1}-[0-3]{1}\d{1}/;

function add_prefix(path: undefined): undefined;
function add_prefix(path: string): string;
function add_prefix(path: string | undefined): string | undefined;
function add_prefix(path: string | undefined) {
  // empty string -> pass
  if (path === undefined) {
    return undefined;
  }
  if (!path) {
    return '/';
  }
  if (!path.endsWith('/')) {
    path = path + '/';
  }
  if (path.startsWith('/')) {
    return POST_PREFIX + '/' + path.slice(1);
  }
  return POST_PREFIX + '/' + path;
}

const get_date = (doc: ParsedContent) => {
  if (doc.date instanceof Date) {
    doc.date = doc.date.toISOString();
  }
  if (!doc.date || !re_date.test(doc.date)) {
    return undefined;
  }
  return (doc.date as string).match(re_date)?.at(0) as string;
};

const get_static_endpoints = (): string[] => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const files = get_files(`${__dirname}/../../pages`);
  return files
    .filter((file) => !file.includes('slug')) // exclude dynamic content
    .map((file) => file.split('pages')[1])
    .map((file) => {
      return file.endsWith('index.vue')
        ? file.split('/index.vue')[0]
        : file.split('.vue')[0];
    });
};

/**
 * recursively get all files from /pages folder
 */
const get_files = (dir: string): string[] => {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? get_files(res) : res;
  });
  return files.flat();
};

const xml_files: Set<string> = new Set();

export default defineEventHandler(async (event) => {
  const sitemap_index_stream = new SitemapAndIndexStream({
    limit: 45000,
    lastmodDateOnly: false,
    getSitemapStream: (i: number) => {
      const sitemap_stream = new SitemapStream({ hostname: BASE_URL });
      const path = `./sitemap-${i}.xml`;
      xml_files.add(path);
      const ws = sitemap_stream.pipe(fs.createWriteStream(resolve(path)));

      return [new URL(path, BASE_URL).toString(), sitemap_stream, ws];
    },
  });

  const docs = await serverQueryContent(event)
    .where({ publish: { $eq: true }, title: { $ne: 'dummy' } })
    .sort({ title: 1, date: -1 })
    .find();
  let date: string | undefined;
  for (const doc of docs) {
    date = get_date(doc);
    if (date) {
      sitemap_index_stream.write({
        url: add_prefix(doc._path),
        changefreq: 'daily',
        lastmod: date,
      });
    } else {
      sitemap_index_stream.write({
        url: add_prefix(doc._path),
        changefreq: 'daily',
      });
    }
  }

  const static_endpoints = get_static_endpoints();
  for (const static_endpoint of static_endpoints) {
    sitemap_index_stream.write({
      url: static_endpoint,
      changefreq: 'daily',
    });
  }

  sitemap_index_stream.end();
  sitemap_index_stream.addListener('resume', () =>
    Promise.all([...xml_files].map(rename_xml_path))
  );
  return streamToPromise(sitemap_index_stream);
});

const rename_xml_path = async (xml_file: string): Promise<void> => {
  const origin_path = origin_xml_path(xml_file);
  const new_path = new_xml_path(xml_file);
  return await fs.promises.rename(origin_path, new_path);
};

const origin_xml_path = (xml_file: string) => {
  const filename = xml_file.split('/').at(-1);
  return `${process.env.PWD}/${filename}`;
};

const new_xml_path = (xml_file: string) => {
  const filename = xml_file.split('/').at(-1);
  return `${process.env.PWD}/.output/public/${filename}`;
};
