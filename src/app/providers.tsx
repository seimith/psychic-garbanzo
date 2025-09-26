'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { AtlasClientProvider } from '@/atlas/client';
import AtlasErrorBoundary from '@/components/atlas/ErrorBoundary';

export function Providers({ children }: { children: ReactNode }) {
  // Next.js 15+ with App Router handles the basePath automatically
  // We should not specify the full URL as basePath, only the path portion
  return (
    <SessionProvider>
      <AtlasErrorBoundary>
        <AtlasClientProvider>
          {children}
        </AtlasClientProvider>
      </AtlasErrorBoundary>
    </SessionProvider>
  );
}
