<template>
  <div>
    <SiteHeader />
    <NuxtPage />
    <SiteFooter />
    <TopDown />
    <GoogleAnalysis />
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
useHead({
  title: config.public.name,
  meta: [
    { charset: 'utf-8' },
    { name: 'author', content: 'phi.friday@gmail.com, phi' },
    { name: 'robots', content: 'index,follow,noarchive' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: config.public.description },
  ],
  link: [
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
  ],
});
</script>
