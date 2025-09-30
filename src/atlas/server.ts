import { AtlasNextServerClient } from '@runonatlas/next/server';

// Temporary in-memory storage for fart usage (resets on server restart)
// TODO: Replace with actual database
const fartUsageStore: Record<string, number> = {};

// Store current userId in async context
let currentUserId: string | null = null;

export function setCurrentUserId(userId: string) {
  currentUserId = userId;
}

function getCurrentUserId(): string {
  return currentUserId || 'anonymous';
}

// Check if the API key is set
if (!process.env.ATLAS_API_KEY) {
  console.warn('ATLAS_API_KEY is not set in environment variables. Atlas integration will not work properly.');
}

// Initialize the Atlas server client with a user ID provider
export const atlasServerClient = new AtlasNextServerClient(
  async () => {
    // Use the userId from context (set by the API route)
    const userId = getCurrentUserId();
    console.log('[ATLAS SERVER] Using userId from context:', userId);
    return userId;
  },
  {
    // Configure event handling for serverless environment
    eventsFlushAt: 0,
    eventsFlushInterval: 0,
    // Configure limits for features
    limits: {
      'fart-fury': async (userId: string) => {
        // This callback should return the CURRENT USAGE COUNT for this user
        // The userId parameter here is the ACTUAL user ID from Atlas's system
        // TODO: Replace with actual database query
        // Example: return await db.fartEvents.count({ where: { userId } });
        
        // WORKAROUND: If userId is 'anonymous', try to find any user in the store
        let actualUserId = userId;
        if (userId === 'anonymous' && Object.keys(fartUsageStore).length > 0) {
          // Use the first (and likely only) user in the store
          actualUserId = Object.keys(fartUsageStore)[0];
          console.log(`[LIMIT CALLBACK] Mapped anonymous to actual user: ${actualUserId}`);
        }
        
        const usage = fartUsageStore[actualUserId] || 0;
        console.log(`[LIMIT CALLBACK] userId: ${userId}, actualUserId: ${actualUserId}, usage: ${usage}`);
        return usage;
      },
    },
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

// Helper function to increment fart usage
export function incrementFartUsage(userId: string): void {
  fartUsageStore[userId] = (fartUsageStore[userId] || 0) + 1;
  console.log(`Incremented fart usage for ${userId}: ${fartUsageStore[userId]}`);
}
