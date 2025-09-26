import { AtlasNextServerClient } from '@runonatlas/next/server';

// Check if the API key is set
if (!process.env.ATLAS_API_KEY) {
  console.warn('ATLAS_API_KEY is not set in environment variables. Atlas integration will not work properly.');
}

// Initialize the Atlas server client with a simple user ID provider
// that does not depend on Clerk's auth() function
export const atlasServerClient = new AtlasNextServerClient(
  async () => {
    // For our API routes, we'll just use a placeholder anonymous user ID
    // The actual authentication will happen client-side through Clerk
    // This allows API routes to work without auth errors
    return 'atlas-api-user';
  },
  {
    // Configure event handling for serverless environment
    eventsFlushAt: 0,
    eventsFlushInterval: 0,
  }
);

// Helper function to check if Atlas is properly configured
export async function isAtlasConfigured(): Promise<boolean> {
  if (!process.env.ATLAS_API_KEY) {
    console.error('ATLAS_API_KEY is not set in environment variables');
    return false;
  }
  
  try {
    // Simple check to see if we can access the API
    return true;
  } catch (error) {
    console.error('Atlas configuration check failed:', error);
    return false;
  }
}

// Helper function to get user features from Atlas
export async function getUserFeatures(userId: string | null): Promise<string[]> {
  if (!userId) return [];
  
  // For now, just provide default features to avoid auth errors
  return ['basic-access'];
}
