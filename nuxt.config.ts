// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: "@nuxt-themes/typography",
  devtools: {
    enabled: false,
  },
  build: {
    transpile: ["/image-edge/"],
  },
  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/robots",
    "@nuxt-themes/tokens",
    "@nuxt/image",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/mdc",
  ],
  router: { options: { strict: true } },
  content: {
    // https://content.nuxtjs.org/api/configuration
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: "github-light",
        // Theme used if `html.dark`
        dark: "github-dark",
      },
      preload: [
        "diff",
        "json",
        "js",
        "ts",
        "shell",
        "html",
        "md",
        "yaml",
        "python",
      ],
    },
    markdown: {
      toc: {
        depth: 5,
        searchDepth: 5,
      },
      mdc: true,
    },
  },
  routeRules: {
    "/": { prerender: true },
    "/rss.xml": { prerender: true },
    "/sitemap.xml": { prerender: true },
  },
  srcDir: "src/",
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        blockSpacing: true,
        commaDangle: "always-multiline",
        arrowParens: true,
        braceStyle: "1tbs",
        flat: true,
        quotes: "double",
        quoteProps: "as-needed",
      },
      typescript: true,
    },
  },
  tailwindcss: {},
  runtimeConfig: {
    public: {
      name: process.env.NUXT_HOST_TITLE,
      description: "phi.log",
      hostname: process.env.NUXT_HOSTNAME,
      post_prefix: process.env.POST_PREFIX,
      tag_prefix: process.env.TAG_PREFIX,
      default_limit: 5,
      pagination_size: 5,
      comment: {
        src: "https://utteranc.es/client.js",
        repo: "phi-friday/phi-friday.github.io",
        issue_term: "pathname",
        crossorigin: "anonymous",
        async: true,
      },
      google: {
        search: "https://cse.google.com/cse.js?cx=b368175c2b370414c",
        seo: "lW107Dj5ageygd67UUzTm-kGls5d-THy9jJQZqLoauw",
      },
    },
  },
  robots: {
    mergeWithRobotsTxtPath: "src/assets/robots.txt",
    header: true,
  },
  compatibilityDate: "2024-09-10",
});
