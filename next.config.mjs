/** @type {import('next').NextConfig} */

// Suppress the punycode deprecation warning
process.removeAllListeners("warning");

const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-icons",
      "lucide-react",
      "react-icons",
    ],
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        port: "",
        pathname: "/s2/favicons/**",
      },
      {
        protocol: "https",
        hostname: "t3.gstatic.com",
        port: "",
        pathname: "/faviconV2/**",
      },
    ],
    // Enable image optimization
    minimumCacheTTL: 60,
    qualities: [75, 85, 90, 100],
  },
  // Add security and caching headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://*.cloudflareinsights.com https://*.vercel-scripts.com https://plausible.io",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' https://fonts.gstatic.com https://r2cdn.perplexity.ai",
              "connect-src 'self' https: wss:",
              "frame-src 'self' https://*.doubleclick.net",
              "frame-ancestors 'none'",
              "object-src 'none'",
              "base-uri 'self'",
            ].join("; "),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      // Cache static assets
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/image/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.{jpg,jpeg,png,gif,webp,ico,svg}",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.{js,css}",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  turbopack: {
    root: "/Users/vishrutjha/Developer/vishrutjha-portfolio",
  },
  async rewrites() {
    return [
      {
        source: "/resume",
        destination: "/resume.pdf",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/hey",
        destination: "https://nohello.net",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
