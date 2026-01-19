/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: false, // Correct key to disable Turbopack
  },
};

module.exports = nextConfig;