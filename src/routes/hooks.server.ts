import * as amp from "@sveltejs/amp";
import type { Handle } from "@sveltejs/kit";
// @ts-expect-error: dts
import dropcss from "dropcss";

export const handle: Handle = async ({ event, resolve }) => {
  let buffer = "";

  return await resolve(event, {
    transformPageChunk: ({ html, done }) => {
      buffer += html;

      if (done) {
        let css = "";
        const markup = amp
          .transform(buffer)
          .replace("⚡", "amp") // dropcss can't handle this character
          .replace(/<style amp-custom([^>]*?)>([^]+?)<\/style>/, (match, attributes, contents) => {
            css = contents;
            return `<style amp-custom${attributes}></style>`;
          });

        css = dropcss({ css, html: markup }).css;
        return markup.replace("</style>", `${css}</style>`);
      }
    },
  });
};
