export default [
  { UserAgent: '*' },
  { BlankLine: true },
  { Disallow: '/' },
  { Disallow: '/@post' },
  { Disallow: '/@post/' },
  { Allow: '*' },
  // Be aware that this will NOT work on target: 'static' mode
  { Sitemap: (req) => `${process.env.NUXT_HOSTNAME}/sitemap.xml` },
];
