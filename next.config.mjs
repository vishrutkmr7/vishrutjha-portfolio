/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Don't run ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react', 'react-icons'],
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Optimize for macOS platform only
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Exclude other platform binaries
      '@next/swc-linux-x64-gnu': false,
      '@next/swc-linux-x64-musl': false,
      '@next/swc-win32-x64-msvc': false,
      '@next/swc-linux-arm64-gnu': false,
      '@next/swc-linux-arm64-musl': false,
      '@next/swc-win32-arm64-msvc': false,
    };
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/resume',
        destination: '/resume.pdf',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/hey',
        destination: 'https://nohello.net',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
