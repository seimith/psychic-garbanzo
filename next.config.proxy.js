/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Only apply proxy in development
    if (process.env.NODE_ENV === 'development' && process.env.ATLAS_BASE_URL) {
      return [
        {
          source: '/atlas-proxy/:path*',
          destination: `${process.env.ATLAS_BASE_URL}/:path*`,
        },
      ];
    }
    return [];
  },
};

module.exports = nextConfig;
