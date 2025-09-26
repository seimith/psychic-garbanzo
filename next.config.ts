/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration for both development and production
  images: {
    unoptimized: true,
  },
  
  // Production-specific settings for Netlify
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Help with Netlify deployment
  staticPageGenerationTimeout: 1,
  
  // Environment variables
  env: {
    NEXTAUTH_URL: process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3001' 
      : 'https://dadlines.netlify.app',
    NEXTAUTH_SECRET: process.env.NODE_ENV === 'development'
      ? 'dev-secret-key'
      : 'dadlines-demo-secret-key'
  }
};

export default nextConfig;
