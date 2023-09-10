export default [
  { UserAgent: '*' },
  { BlankLine: true },
  // Be aware that this will NOT work on target: 'static' mode
  { Sitemap: (req) => `${process.env.NUXT_HOSTNAME}/sitemap.xml` },
  { BlankLine: true },
  { Disallow: '/@post' },
  { Allow: '/@post/*' },
  { Allow: '/@tag' },
  { Allow: '/@tag/*' },
  { Allow: '/@page' },
  { Allow: '/@page/*' },
];
