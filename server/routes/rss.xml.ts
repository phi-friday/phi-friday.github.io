import { ParsedContent } from '@nuxt/content/dist/runtime/types';
import RSS from 'rss';
import { serverQueryContent } from '#content/server';

const BASE_URL = process.env.NUXT_HOSTNAME as string;
const POST_PREFIX = process.env.POST_PREFIX as string;
const re_date = /\d{4}-[01]{1}\d{1}-[0-3]{1}\d{1}/;

const add_prefix = (path: string | undefined) => {
  // empty string -> pass
  if (path === undefined) {
    return undefined;
  }
  if (!path) {
    return path;
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

function add_suffix(path: undefined): undefined;
function add_suffix(path: string): string;
function add_suffix(path: string | undefined): string | undefined;
function add_suffix(path: string | undefined) {
  // empty string -> pass
  if (path === undefined) {
    return undefined;
  }
  if (!path) {
    return path;
  }
  if (path.endsWith('/')) {
    return path;
  }
  return path + '/';
}

function add_prefix_and_suffix(path: undefined): undefined;
function add_prefix_and_suffix(path: string): string;
function add_prefix_and_suffix(path: string | undefined): string | undefined;
function add_prefix_and_suffix(path: string | undefined) {
  return add_suffix(add_prefix(path));
}


export default defineEventHandler(async (event) => {
  const feed = new RSS({
    title: process.env.NUXT_HOST_TITLE as string,
    site_url: add_suffix(BASE_URL),
    feed_url: `${add_suffix(BASE_URL)}rss.xml`,
  });

  const docs = await serverQueryContent(event)
    .where({ publish: { $eq: true }, title: { $ne: 'dummy' } })
    .sort({ title: 1, date: -1 })
    .find();
  let maybe_date: string | undefined;
  let date: string;
  let path: string;
  let title: string;
  for (const doc of docs) {
    maybe_date = get_date(doc);
    if (!maybe_date || !doc._path || !doc.title) {
      continue;
    }
    date = maybe_date;
    path = doc._path;
    title = doc.title;
    feed.item({
      title,
      url: add_prefix_and_suffix(path),
      date,
      description: doc.description ?? '',
    });
  }

  const feed_string = feed.xml({ indent: true });
  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(feed_string);
});
