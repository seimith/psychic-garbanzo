'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  // Next.js 15+ with App Router handles the basePath automatically
  // We should not specify the full URL as basePath, only the path portion
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
