import { QueryBuilderParams } from '@nuxt/content/dist/runtime/types';

const get_default_query = () => {
  const default_query: QueryBuilderParams = {
    sort: [{ title: 1, date: -1 }],
    where: [{ publish: { $eq: true } }],
    $sensitivity: 'base',
  };
  return default_query;
};

export { get_default_query };
