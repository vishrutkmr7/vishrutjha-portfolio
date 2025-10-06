export async function GET() {
  // Add your dynamic routes here
  const routes = ['', '/media', '/journey', '/projects', '/resume', '/hey', '/referrals'];

  // Transform routes into sitemap entries
  const entries = routes.map(route => ({
    url: `https://vishrutjha.com${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
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
