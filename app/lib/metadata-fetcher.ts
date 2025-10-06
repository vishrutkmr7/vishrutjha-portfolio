// Server-side utility to fetch metadata from referral URLs
import * as cheerio from 'cheerio';

interface ReferralMetadata {
  favicon: string;
  description: string;
  title?: string;
}

/**
 * Fetches favicon and meta description from a URL
 * Uses Google's favicon service for reliable favicon fetching
 */
export async function fetchReferralMetadata(url: string): Promise<ReferralMetadata> {
  try {
    // Get domain for favicon
    const domain = new URL(url).hostname;
    const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

    // Fetch the page HTML to get meta description
    let description = '';
    let title = '';

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; MetadataBot/1.0; +https://vishrutjha.com)',
        },
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const html = await response.text();
        const $ = cheerio.load(html);

        // Try multiple meta description sources
        description =
          $('meta[name="description"]').attr('content') ||
          $('meta[property="og:description"]').attr('content') ||
          $('meta[name="twitter:description"]').attr('content') ||
          '';

        // Get title as fallback
        title =
          $('meta[property="og:title"]').attr('content') ||
          $('title').text() ||
          $('meta[name="twitter:title"]').attr('content') ||
          '';
      }
    } catch (fetchError) {
      console.warn(`Failed to fetch metadata for ${url}:`, fetchError);
      // Continue with just the favicon
    }

    return {
      favicon,
      description: description || `Check out this service at ${domain}`,
      title,
    };
  } catch (error) {
    console.error(`Error processing metadata for ${url}:`, error);
    // Return fallback values
    return {
      favicon: '/favicon.png',
      description: 'Discover this amazing service',
      title: '',
    };
  }
}

/**
 * Batch fetch metadata for multiple URLs with caching
 */
export async function batchFetchMetadata(urls: string[]): Promise<Map<string, ReferralMetadata>> {
  const results = new Map<string, ReferralMetadata>();

  // Fetch all metadata in parallel with a reasonable concurrency limit
  const batchSize = 3;
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(async url => ({
        url,
        metadata: await fetchReferralMetadata(url),
      }))
    );

    for (const { url, metadata } of batchResults) {
      results.set(url, metadata);
    }
  }

  return results;
}
