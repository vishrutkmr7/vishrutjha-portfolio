/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.ignoreWarnings = [
      { module: /node_modules\/node-fetch\/lib\/index\.js/ },
      { module: /node_modules\/punycode\/punycode\.js/ },
    ];
    return config;
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
