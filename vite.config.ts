import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import type { UserConfigFnObject } from "vite";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";

import packgeJson from "./package.json";

// oxlint-disable-next-line complexity
const config: UserConfigFnObject = defineConfig(({ command }) => {
  process.env.APP_NAME ||= packgeJson.name;
  process.env.APP_HOSTNAME =
    process.env.APP_HOSTNAME && process.env.APP_HOSTNAME !== "localhost"
      ? process.env.APP_HOSTNAME
      : "http://localhost:5173";
  process.env.APP_HOSTNAME = process.env.APP_HOSTNAME.replace(/\/$/, "");
  process.env.APP_DESCRIPTION = packgeJson.description || packgeJson.name;
  process.env.APP_AUTHOR_NAME ||= packgeJson.author.name || "";
  process.env.APP_AUTHOR_EMAIL ||= packgeJson.author.email || "";
  process.env.APP_AUTHOR_URL ||= packgeJson.author.url || "";
  process.env.GOOGLE_SEARCH = packgeJson.google?.search || "";
  process.env.GOOGLE_SEO = packgeJson.google?.seo || "";
  process.env.GOOGLE_GTAG = packgeJson.google?.gtag || "";
  process.env.UTTERANCE_SRC = packgeJson.utterance?.src || "";
  process.env.UTTERANCE_REPO = packgeJson.utterance?.repo || "";
  process.env.UTTERANCE_ISSUE_TERM = packgeJson.utterance?.issue_term || "pathname";
  process.env.UTTERANCE_CROSSORIGIN = packgeJson.utterance?.crossorigin || "anonymous";

  return {
    plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
    define: {
      "import.meta.env.APP_NAME": JSON.stringify(process.env.APP_NAME),
      "import.meta.env.APP_HOSTNAME": JSON.stringify(process.env.APP_HOSTNAME),
      "import.meta.env.APP_DESCRIPTION": JSON.stringify(process.env.APP_DESCRIPTION),
      "import.meta.env.APP_AUTHOR_NAME": JSON.stringify(process.env.APP_AUTHOR_NAME),
      "import.meta.env.APP_AUTHOR_EMAIL": JSON.stringify(process.env.APP_AUTHOR_EMAIL),
      "import.meta.env.APP_AUTHOR_URL": JSON.stringify(process.env.APP_AUTHOR_URL),
      "import.meta.env.GOOGLE_SEARCH": JSON.stringify(process.env.GOOGLE_SEARCH),
      "import.meta.env.GOOGLE_SEO": JSON.stringify(process.env.GOOGLE_SEO),
      "import.meta.env.GOOGLE_GTAG": JSON.stringify(process.env.GOOGLE_GTAG),
      "import.meta.env.UTTERANCE_SRC": JSON.stringify(process.env.UTTERANCE_SRC),
      "import.meta.env.UTTERANCE_REPO": JSON.stringify(process.env.UTTERANCE_REPO),
      "import.meta.env.UTTERANCE_ISSUE_TERM": JSON.stringify(process.env.UTTERANCE_ISSUE_TERM),
      "import.meta.env.UTTERANCE_CROSSORIGIN": JSON.stringify(process.env.UTTERANCE_CROSSORIGIN),
    },
    build: {
      sourcemap: command === "serve",
      minify: true,
    },
  };
});

export default config;
