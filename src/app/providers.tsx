'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  // Handle both development and production environments
  const baseUrl = process.env.NEXTAUTH_URL || 
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001');
  
  return (
    <SessionProvider 
      session={undefined} 
      basePath={`${baseUrl}/api/auth`}
    >
      {children}
    </SessionProvider>
  );
}
