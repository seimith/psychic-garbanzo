import { AtlasNextServerClient } from '@runonatlas/next/server';
import { getServerSession } from 'next-auth';

// Initialize the Atlas server client with a callback to get the current user ID
export const atlasServerClient = new AtlasNextServerClient(
  async () => {
    const session = await getServerSession();
    // Using email as unique identifier since NextAuth doesn't expose ID by default
    // Return null if email is undefined to satisfy TypeScript
    return session?.user?.email || null;
  },
  {
    // Configure event handling for serverless environment
    eventsFlushAt: 0,
    eventsFlushInterval: 0,
  }
);
