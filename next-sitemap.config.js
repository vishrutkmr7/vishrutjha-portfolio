module.exports = {
  siteUrl: 'https://vishrutjha.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*', '/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'Perplexity-User',
        allow: '/',
      },
    ],
    additionalSitemaps: ['https://vishrutjha.com/server-sitemap.xml'],
  },
  //   exclude: ["/protected-page", "/private-page"],
};
