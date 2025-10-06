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
/**
 * Extract root domain from a URL or map to brand domain for favicons
 * Maps known referral domains to their brand domains for better favicon results
 */
function getRootDomain(hostname: string): string {
  // Mapping of referral domains to brand domains for favicon lookup
  const domainMapping: Record<string, string> = {
    'referrals.uber.com': 'uber.com',
    'get.venmo.com': 'venmo.com',
    'join.robinhood.com': 'robinhood.com',
    'refer.discover.com': 'discover.com',
    'referyourchasecard.com': 'chase.com',
    'drd.sh': 'doordash.com',
    'waymo.smart.link': 'waymo.com',
    'bilt.page': 'bilt.com',
    'app.warp.dev': 'warp.dev',
    'app.privacy.com': 'privacy.com',
  };

  // Check if we have a direct mapping
  if (domainMapping[hostname]) {
    return domainMapping[hostname];
  }

  // Strip 'www.' only if present
  if (hostname.startsWith('www.')) {
    const withoutWww = hostname.slice(4);
    // Check if the non-www version has a mapping
    if (domainMapping[withoutWww]) {
      return domainMapping[withoutWww];
    }
    // For most cases, stripping www is fine
    return withoutWww;
  }

  // Return as-is for everything else
  return hostname;
}

export async function fetchReferralMetadata(url: string): Promise<ReferralMetadata> {
  try {
    // Get domain for favicon and extract root domain
    const { hostname } = new URL(url);
    const rootDomain = getRootDomain(hostname);

    // Use Google's faviconV2 API which is more reliable
    const favicon = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${rootDomain}&size=128`;

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
      description: description || `Check out this service at ${rootDomain}`,
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
