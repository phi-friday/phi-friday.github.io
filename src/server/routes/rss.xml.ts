import type { ParsedContent } from "@nuxt/content";
import RSS from "rss";
import { serverQueryContent } from "#content/server";

const BASE_URL = process.env.NUXT_HOSTNAME as string;
const POST_PREFIX = process.env.POST_PREFIX as string;
const RE_DATE = /\d{4}-[01]{1}\d{1}-[0-3]{1}\d{1}/;
const RE_DATETIME = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}/;
const RE_DATETIME_WITH_TIMEZONE =
  /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}/;

function add_prefix(path: undefined): undefined;
function add_prefix(path: string): string;
function add_prefix(path: string | undefined): string | undefined;
function add_prefix(path: string | undefined) {
  // empty string -> pass
  if (path === undefined) {
    return undefined;
  }
  if (!path) {
    return "/";
  }
  if (!path.endsWith("/")) {
    path = path + "/";
  }
  if (path.startsWith("/")) {
    return POST_PREFIX + "/" + path.slice(1);
  }
  return POST_PREFIX + "/" + path;
}
const get_date = (doc: ParsedContent) => {
  if (doc.date instanceof Date) {
    doc.date = doc.date.toISOString();
  }
  if (typeof doc.date !== "string" || !doc.date) {
    return undefined;
  }

  for (const re of [RE_DATETIME_WITH_TIMEZONE, RE_DATETIME, RE_DATE]) {
    if (re.test(doc.date)) {
      return (doc.date as string).match(re)?.at(0) as string;
    }
  }

  return undefined;
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
  if (path.endsWith("/")) {
    return path;
  }
  return path + "/";
}

function add_base_url(path: undefined): undefined;
function add_base_url(path: string): string;
function add_base_url(path: string | undefined): string | undefined;
function add_base_url(path: string | undefined) {
  // empty string -> pass
  if (path === undefined) {
    return undefined;
  }
  if (!path) {
    return add_suffix(BASE_URL);
  }
  const _path = path.startsWith("/") ? path.slice(1) : path;
  const _base = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
  return _base + "/" + _path;
}

export default defineEventHandler(async (event) => {
  const feed = new RSS({
    title: process.env.NUXT_HOST_TITLE as string,
    site_url: add_suffix(BASE_URL),
    feed_url: `${add_suffix(BASE_URL)}rss.xml`,
  });

  const docs = await serverQueryContent(event)
    .where({ publish: { $eq: true }, title: { $ne: "dummy" } })
    .sort({ title: 1, date: -1 })
    .find();
  let maybe_date: string | undefined;
  let date: string;
  let path: string;
  let title: string;
  let url: string;
  for (const doc of docs) {
    maybe_date = get_date(doc);
    if (!maybe_date || !doc._path || !doc.title) {
      continue;
    }
    date = maybe_date;
    path = doc._path;
    title = doc.title;
    url = add_prefix(path);
    feed.item({
      title,
      url: add_base_url(url),
      guid: url,
      date,
      description: doc.description ?? "",
      categories: doc.tags,
    });
  }

  const feed_string = feed.xml({ indent: true });
  event.node.res.setHeader("content-type", "text/xml");
  event.node.res.end(feed_string);
});
