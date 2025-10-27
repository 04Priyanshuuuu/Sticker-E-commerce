/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "127.0.0.1"], // ✅ allow local dev images
  },
};

module.exports = nextConfig;
