// Development-only Next.js configuration
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Development-specific settings
  reactStrictMode: false,  // Disable strict mode in development for fewer double-renders
  swcMinify: false,        // Faster builds in development
  
  // NextAuth.js specific configuration
  env: {
    NEXTAUTH_URL: "http://localhost:3001",
    NEXTAUTH_SECRET: "development-secret-key"
  }
};

module.exports = nextConfig;
