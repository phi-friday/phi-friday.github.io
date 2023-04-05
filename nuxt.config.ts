// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  extends: '@nuxt-themes/typography',
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxtjs/robots'],
  content: {
    // https://content.nuxtjs.org/api/configuration
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'github-light',
        // Theme used if `html.dark`
        dark: 'github-dark',
      },
      preload: ['diff', 'json', 'js', 'ts', 'shell', 'html', 'md', 'yaml', 'python'],
    },
    markdown: {
      toc: {
        depth: 5,
        searchDepth: 5,
      },
    },
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  runtimeConfig: {
    public: {
      name: 'phi.log',
      description: 'phi.log',
      hostname: process.env.NUXT_HOSTNAME,
      post_prefix: process.env.POST_PREFIX,
      tag_prefix: process.env.TAG_PREFIX,
      page_prefix: process.env.PAGE_PREFIX,
      default_skip: 0,
      default_limit: 2,
      pagination_size: 3,
      comment: {
        src: 'https://utteranc.es/client.js',
        repo: 'phi-friday/phi-friday.github.io',
        issue_term: 'pathname',
        theme: 'github-light',
        crossorigin: 'anonymous',
        async: true,
      },
    },
  },
  nitro: {
    prerender: {
      routes: ['/@page', '/sitemap.xml'],
    },
  },
});
