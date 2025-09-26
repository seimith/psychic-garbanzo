import { AtlasNextServerClient } from '@runonatlas/next/server';
import { auth } from '@clerk/nextjs/server';

// Initialize the Atlas server client with a callback to get the current user ID
export const atlasServerClient = new AtlasNextServerClient(
  async () => {
    const { userId } = await auth();
    // Return the Clerk user ID or null
    return userId || null;
  },
  {
    // Configure event handling for serverless environment
    eventsFlushAt: 0,
    eventsFlushInterval: 0,
  }
);
