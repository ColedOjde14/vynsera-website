/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/sign-in',
        destination: 'https://accounts.vynseracorp.com/sign-in',
      },
      {
        source: '/sign-up',
        destination: 'https://accounts.vynseracorp.com/sign-up',
      },
      {
        source: '/sso-callback',
        destination: 'https://accounts.vynseracorp.com/sso-callback',
      },
      // Optional: Add more Clerk routes if needed
    ];
  },
};

module.exports = nextConfig;