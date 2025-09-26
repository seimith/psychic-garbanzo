'use client';

import { useAuth, useUser, useClerk } from '@clerk/nextjs';
import { AtlasProvider } from '@runonatlas/next/client';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';

const loginCallback = () => {
  window.location.href = '/sign-in';
};

export function AtlasClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const clerk = useClerk();
  const [atlasError, setAtlasError] = useState<Error | null>(null);
  
  // We'll use Clerk to get the user information
  const userId = user?.id || '';
  const userEmail = user?.emailAddresses[0]?.emailAddress || '';
  const userName = user?.fullName || '';
  const isUserLoading = !isLoaded;
  
  // Reset Atlas error when auth status changes
  useEffect(() => {
    if (atlasError && isLoaded) {
      setAtlasError(null);
    }
  }, [isLoaded, atlasError]);

  // Handle Atlas errors gracefully
  if (atlasError) {
    console.error('Atlas initialization error:', atlasError);
  }

  // Catch unhandled errors that might cause "Failed to fetch status"
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('fetch') || event.message.includes('network')) {
        console.error('Network error detected:', event);
        // You could implement fallback behavior here
      }
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return (
    <AtlasProvider
      loginCallback={loginCallback}
      userId={userId}
      userEmail={userEmail}
      userName={userName}
      isUserLoading={isUserLoading}
      getAuth={clerk.session ? async () => {
        const token = await clerk.session?.getToken();
        return token || null;
      } : undefined}
    >
      {children}
    </AtlasProvider>
  );
}
