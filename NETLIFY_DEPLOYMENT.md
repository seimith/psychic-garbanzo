# Netlify Deployment Guide

This document explains the optimizations made to ensure successful deployment to Netlify, specifically addressing the function size limitations.

## Deployment Configuration

The project has been optimized for Netlify deployment with the following considerations:

### Function Size Optimization

Netlify has a 250MB size limit for serverless functions. Our Next.js application has been optimized to stay within this limit:

1. **Custom Build Process**: We use a custom `build:netlify` script that includes post-build optimizations
2. **Edge Functions**: Utilizes Netlify Edge Functions for more efficient request handling
3. **Bundle Optimization**: Configured webpack to split code into smaller chunks
4. **Standalone Output**: Using Next.js standalone output mode for better dependency management

### Key Files

- `netlify.toml`: Main configuration for Netlify deployment
- `scripts/netlify-optimize.js`: Post-build script to reduce function size
- `netlify/edge-functions/nextjs-edge.ts`: Edge function for handling certain routes
- `next.config.js`: Configuration for Next.js build optimizations

## Environment Variables

The following environment variables need to be configured in the Netlify dashboard:

- `ATLAS_API_KEY`: Your Atlas API key
- `CLERK_SECRET_KEY`: Your Clerk secret key
- `NEXTAUTH_SECRET`: Secret for NextAuth (legacy)

## Deployment Process

1. Push changes to your connected Git repository
2. Netlify will automatically trigger a build using the command specified in `netlify.toml`
3. The build process will run the custom optimization script after the standard Next.js build
4. Deployment artifacts will be uploaded to Netlify's CDN

## Troubleshooting

If you encounter deployment issues:

1. **Function Size Errors**: Check if any new dependencies have significantly increased your function size
   - Solution: Add them to `external_node_modules` in `netlify.toml`

2. **Build Failures**: Check the build logs for specific errors
   - For memory issues: Adjust `NODE_OPTIONS` in `netlify.toml`

3. **Runtime Errors**: Use Netlify's function logs to debug issues after deployment

## Local Testing

To test the Netlify build process locally:

```bash
# Install the Netlify CLI
npm install -g netlify-cli

# Run a local build test
npm run build:netlify

# Test locally with Netlify Dev
netlify dev
```

This ensures your application will build successfully when deployed to Netlify's environment.
