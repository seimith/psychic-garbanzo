'use client';

import { useSession, signIn } from 'next-auth/react';
import { AtlasProvider } from '@runonatlas/next/client';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';

const loginCallback = () => {
  signIn();
};

export function AtlasClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [atlasError, setAtlasError] = useState<Error | null>(null);
  
  // We'll use the session to get the user information
  // NextAuth doesn't include id in the default session type
  const userId = session?.user?.email || ''; // Using email as a unique identifier
  const userEmail = session?.user?.email || '';
  const userName = session?.user?.name || '';
  const isUserLoading = status === 'loading';
  
  // Reset Atlas error when session status changes
  useEffect(() => {
    if (atlasError && status !== 'loading') {
      setAtlasError(null);
    }
  }, [status, atlasError]);

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
    >
      {children}
    </AtlasProvider>
  );
}
