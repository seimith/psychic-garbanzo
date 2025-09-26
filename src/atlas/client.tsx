'use client';

import { useSession, signIn } from 'next-auth/react';
import { AtlasProvider } from '@runonatlas/next/client';
import { redirect } from 'next/navigation';

const loginCallback = () => {
  signIn();
};

export function AtlasClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  
  // We'll use the session to get the user information
  // NextAuth doesn't include id in the default session type
  const userId = session?.user?.email || ''; // Using email as a unique identifier
  const userEmail = session?.user?.email || '';
  const userName = session?.user?.name || '';
  const isUserLoading = status === 'loading';

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
