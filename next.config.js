/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // Correct key to disable Turbopack (Next.js 16+)
  },
};

module.exports = nextConfig;