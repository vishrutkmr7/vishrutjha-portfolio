/** @type {import('next').NextConfig} */
const nextConfig = {
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
