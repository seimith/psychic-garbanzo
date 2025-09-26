/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output standalone build for better Netlify compatibility
  output: 'standalone',
  
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
  staticPageGenerationTimeout: 180,
  
  // Environment variables
  env: {
    NEXTAUTH_URL: process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3001' 
      : 'https://dadlines.netlify.app',
    NEXTAUTH_SECRET: process.env.NODE_ENV === 'development'
      ? 'dev-secret-key'
      : 'dadlines-demo-secret-key'
  },

  // Fix for fs module not found error in browser environment
  transpilePackages: ['tailwindcss'],

  // Optimize for Netlify deployment
  experimental: {
    // Edge runtime where possible
    runtime: 'experimental-edge',
    // Optimize bundle size
    optimizeCss: true,
    // Enable code splitting
    granularChunks: true,
  },

  // Properly handle Node.js modules in browser
  webpack: (config, { isServer }) => {
    // This is to handle the 'fs' module used by Tailwind's dependencies
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      module: false,
    };

    // Reduce bundle size
    if (isServer) {
      // Exclude large modules from server bundle
      config.externals = [...(config.externals || []), 'canvas', 'jsdom'];
    }

    // Optimize chunk size
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 90000,
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    };

    return config;
  },
};

module.exports = nextConfig;
