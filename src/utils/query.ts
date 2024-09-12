import type { QueryBuilderParams } from "@nuxt/content";

const get_default_query = () => {
  const default_query: QueryBuilderParams = {
    sort: [{ title: 1, date: -1 }],
    where: [{ publish: { $eq: true }, title: { $ne: "dummy" } }],
    $sensitivity: "base",
  };
  return default_query;
};

export { get_default_query };
