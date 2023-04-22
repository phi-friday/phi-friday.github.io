export default [
  { UserAgent: '*' },
  { BlankLine: true },
  { Allow: '*' },
  { Disallow: '/' },
  { Disallow: '/@post' },
  { Disallow: '/@post/' },
  // Be aware that this will NOT work on target: 'static' mode
  { Sitemap: (req) => `${process.env.NUXT_HOSTNAME}/sitemap.xml` },
];
