'use client';

import { UserButton as ClerkUserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function UserButton() {
  const router = useRouter();
  
  return (
    <ClerkUserButton 
      afterSignOutUrl="/"
      appearance={{
        elements: {
          userButtonBox: "h-10 w-10"
        }
      }}
    />
  );
}
