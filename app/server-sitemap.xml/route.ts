export async function GET() {
  // Add your dynamic routes here with their priorities
  const routes = [
    { path: '', priority: 1.0 },
    { path: '/media', priority: 0.8 },
    { path: '/journey', priority: 0.8 },
    { path: '/projects', priority: 0.8 },
    { path: '/referrals', priority: 0.8 },
    { path: '/resume', priority: 0.7 },
    { path: '/hey', priority: 0.5 },
  ];

  // Transform routes into sitemap entries
  const entries = routes.map(({ path, priority }) => ({
    url: `https://vishrutjha.com${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority,
  }));

  // Return the sitemap XML
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${entries
        .map(
          entry => `
        <url>
          <loc>${entry.url}</loc>
          <lastmod>${entry.lastModified.toISOString()}</lastmod>
          <changefreq>${entry.changeFrequency}</changefreq>
          <priority>${entry.priority}</priority>
        </url>
      `
        )
        .join('')}
    </urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
      },
    }
  );
}
