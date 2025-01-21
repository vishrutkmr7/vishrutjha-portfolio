import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Generate a new nonce using Web Crypto API (available globally)
  const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  // Get the existing response
  const response = NextResponse.next();

  // Create CSP header with the nonce
  const cspHeader = [
    // Allow same origin by default
    "default-src 'self'",

    // Scripts - Allow specific domains and nonce
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: 'unsafe-eval' https://*.googletagmanager.com https://*.cloudflareinsights.com`,

    // Styles
    "style-src 'self' 'unsafe-inline' https: https://fonts.googleapis.com",

    // Images
    "img-src 'self' data: https: blob: https://*.google-analytics.com https://*.googletagmanager.com",

    // Fonts
    "font-src 'self' https: data: https://fonts.gstatic.com",

    // Connect (XHR/fetch)
    "connect-src 'self' https: https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.cloudflareinsights.com",

    // Frames
    "frame-src 'self' https://*.doubleclick.net https://www.google.com https://www.youtube.com https://*.googletagmanager.com",

    // Media
    "media-src 'self' https:",

    // Object/embed
    "object-src 'none'",

    // Base URI
    "base-uri 'self'",

    // Form submissions
    "form-action 'self'",

    // Worker scripts
    "worker-src 'self' blob:",

    // Manifest
    "manifest-src 'self'",

    // Security headers
    'upgrade-insecure-requests',
    'block-all-mixed-content',
  ].join('; ');

  // Set the CSP header
  response.headers.set('Content-Security-Policy', cspHeader);

  // Add the nonce to the response headers
  response.headers.set('x-nonce', nonce);

  return response;
}

// Add matcher to exclude static files and API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
