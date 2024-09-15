<template>
  <div>
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const font_css =
  "https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@1,800,500,100,700,400,300,200,900&f[]=satoshi@1,900,700,500,301,701,300,501,401,901,400,2&display=swap";

useHead({
  title: config.public.name,
  htmlAttrs: {
    lang: "ko",
  },
  meta: [
    { charset: "utf-8" },
    { name: "author", content: "phi.friday@gmail.com, phi" },
    { name: "robots", content: "index,follow,noarchive" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      hid: "description",
      name: "description",
      content: config.public.description,
    },
    { name: "google-site-verification", content: config.public.google.seo },
  ],
  link: [
    {
      rel: "sitemap",
      type: "application/xml",
      title: "Sitemap",
      href: "/sitemap.xml",
    },
    {
      rel: "alternate",
      type: "application/rss+xml",
      title: "RSS",
      href: "/rss.xml",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    { rel: "manifest", href: "/site.webmanifest" },
    {
      rel: "preload",
      href: font_css,
      as: "style",
      onload: "this.onload=null;this.rel='stylesheet'",
    },
  ],
  noscript: [{ innerHTML: `<link rel="stylesheet" href="${font_css}" />` }],
});

onMounted(() => {
  console.info("sha: `%s`", config.public.sha);
});
</script>
