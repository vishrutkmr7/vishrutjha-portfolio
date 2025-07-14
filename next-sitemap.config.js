module.exports = {
  siteUrl: 'https://vishrutjha.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*', '/server-sitemap.xml'],
  // Add additional paths to be included
  additionalPaths: async _config => {
    const result = [];
    result.push({
      loc: '/llms.txt',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    });

    return result;
  },
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
