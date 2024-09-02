import { createResolver } from '@nuxt/kit';
const { resolve } = createResolver(import.meta.url);

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  extends: ['@nuxt-themes/typography'],

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/robots',
    '@nuxtjs/color-mode',
    '@nuxt/image-edge',
    '@nuxt-themes/tokens',
    'nuxt-gtag',
  ],

  build: {
    transpile: ['/image-edge/'],
  },

  router: { options: { strict: true } },

  components: [
    {
      path: resolve('components'),
      global: true,
      prefix: '',
    },
    {
      path: resolve('node_modules/@nuxt-themes/elements/components/globals'),
      global: true,
      prefix: '',
      ignore: ['NuxtImg.vue', 'NuxtImg'],
    },
    {
      path: resolve('node_modules/@nuxt-themes/elements/components/icons'),
      global: true,
      prefix: '',
    },
    {
      path: resolve('node_modules/@nuxt-themes/elements/components/landing'),
      global: true,
      prefix: '',
    },
    {
      path: resolve('node_modules/@nuxt-themes/elements/components/volta'),
      global: true,
      prefix: '',
    },
    {
      path: resolve('node_modules/@nuxt-themes/elements/components/meta'),
      global: true,
      prefix: '',
    },
  ],

  gtag: {
    id: process.env.GTAG_ID ?? '',
    initialConsent: true,
    loadingStrategy: 'async',
    config: {
      page_title: process.env.NUXT_HOST_TITLE ?? '',
    },
  },

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
      name: process.env.NUXT_HOST_TITLE,
      description: 'phi.log',
      hostname: process.env.NUXT_HOSTNAME,
      post_prefix: process.env.POST_PREFIX,
      tag_prefix: process.env.TAG_PREFIX,
      page_prefix: process.env.PAGE_PREFIX,
      default_skip: 0,
      default_limit: 5,
      pagination_size: 5,
      comment: {
        src: 'https://utteranc.es/client.js',
        repo: 'phi-friday/phi-friday.github.io',
        issue_term: 'pathname',
        crossorigin: 'anonymous',
        async: true,
      },
      google: {
        search: 'https://cse.google.com/cse.js?cx=b368175c2b370414c',
        seo: 'lW107Dj5ageygd67UUzTm-kGls5d-THy9jJQZqLoauw',
      },
    },
  },

  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/rss.xml'],
    },
  },

  robots: {
    configPath: '~/robots.config.js',
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    storageKey: 'nuxt-color-schema',
    classSuffix: '',
  },

  compatibilityDate: '2024-09-02',
});