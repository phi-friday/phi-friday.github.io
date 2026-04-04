import { json } from "@sveltejs/kit";

import { loadSearchPostDatas } from "$lib/utils/search";

export async function GET(): Promise<Response> {
  const posts = await loadSearchPostDatas();

  return json(posts);
}
