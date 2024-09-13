<template>
  <div>
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

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
  ],
});
</script>
