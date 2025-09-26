'use client';

import { FeatureProtect } from '@runonatlas/next/client';
import Link from 'next/link';

interface FeatureProtectionProps {
  children: React.ReactNode;
  features: string[];
}

export default function FeatureProtection({ children, features }: FeatureProtectionProps) {
  return (
    <FeatureProtect
      features={features}
      disallowedFallback={(reasons) => (
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-blue-800">Premium Feature</h3>
          
          <div className="mt-3 space-y-2">
            {reasons.map((reason) => (
              <div key={reason.id} className="text-gray-700">
                {reason.reason === 'notIncluded' && (
                  <p>
                    This feature requires a subscription. Upgrade your plan to access{' '}
                    <span className="font-semibold">{reason.id}</span>.
                  </p>
                )}
                
                {reason.reason === 'limitReached' && (
                  <p>
                    You've reached the limit for{' '}
                    <span className="font-semibold">{reason.id}</span>.{' '}
                    Current usage: {reason.currentUsage}/{reason.limit}.
                  </p>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <Link
              href="/subscription/pricing"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View Plans
            </Link>
          </div>
        </div>
      )}
    >
      {children}
    </FeatureProtect>
  );
}
