'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import FeatureProtection from '@/components/atlas/FeatureProtection';
import { useCustomerFeatures } from '@runonatlas/next/client';
import { 
  EnvelopeIcon, 
  SparklesIcon, 
  NewspaperIcon, 
  EyeSlashIcon,
  LockClosedIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function FeaturesPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const { features } = useCustomerFeatures();
  
  // Features is an array, so we need to find the feature by id/slug
  const fartFuryFeature = Array.isArray(features) 
    ? features.find((f: any) => f.id === 'fart-fury' || f.slug === 'fart-fury')
    : undefined;

  const triggerFart = async () => {
    try {
      if (!user?.id) {
        alert('User not authenticated');
        return;
      }

      const response = await fetch('/api/fart', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });
      
      console.log('Response status:', response.status);
      
      // Check if response has content
      const text = await response.text();
      console.log('Response text:', text);
      
      if (!text) {
        alert('Empty response from server. Check server logs.');
        return;
      }
      
      const data = JSON.parse(text);
      
      if (response.ok) {
        alert(data.message);
        // Wait a moment for Atlas to process, then refresh
        setTimeout(() => {
          window.location.href = window.location.href.split('?')[0] + '?t=' + Date.now();
        }, 500);
      } else {
        alert(data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error triggering fart:', error);
      alert('Failed to trigger fart fury: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  // Debug: Log features data
  useEffect(() => {
    console.log('All features:', features);
    console.log('Fart Fury feature:', fartFuryFeature);
    if (fartFuryFeature && typeof fartFuryFeature === 'object') {
      console.log('Fart Fury full object:', JSON.stringify(fartFuryFeature, null, 2));
    }
  }, [features, fartFuryFeature]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isSignedIn || !isLoaded) {
    return (
      <Layout title="Loading...">
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Premium Features - Dadlines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Feature 1: Daily Dad Joke Emails */}
          <FeatureProtection features={["Daily-Dad-Joke-Emails"]} >
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <EnvelopeIcon className="h-6 w-6 text-purple-600 mr-3" />
                  <div>
                    <h2 className="text-lg font-semibold text-purple-900">Daily Dad Joke Emails</h2>
                    <p className="text-sm text-gray-600">Get jokes delivered daily</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ Active
                </span>
              </div>
            </div>
          </FeatureProtection>

          {/* Feature 2: Exclusive Joke Content */}
          <FeatureProtection features={["Exclusive-Joke-Content"]}>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <SparklesIcon className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <h2 className="text-lg font-semibold text-blue-900">Exclusive Joke Content</h2>
                    <p className="text-sm text-gray-600">Premium curated jokes</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ Active
                </span>
              </div>
            </div>
          </FeatureProtection>

          {/* Feature 3: Weekly Humor Digest */}
          <FeatureProtection features={["Weekly-Humor-Digest"]}>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <NewspaperIcon className="h-6 w-6 text-green-600 mr-3" />
                  <div>
                    <h2 className="text-lg font-semibold text-green-900">Weekly Humor Digest</h2>
                    <p className="text-sm text-gray-600">Sunday digest emails</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ Active
                </span>
              </div>
            </div>
          </FeatureProtection>

          {/* Feature 4: Ad-Free Experience */}
          <FeatureProtection features={["Ad-Free-Experience"]}>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <EyeSlashIcon className="h-6 w-6 text-amber-600 mr-3" />
                  <div>
                    <h2 className="text-lg font-semibold text-amber-900">Ad-Free Experience</h2>
                    <p className="text-sm text-gray-600">No ads, no interruptions</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ Active
                </span>
              </div>
            </div>
          </FeatureProtection>

          {/* Feature 5: Fart Fury */}
          <FeatureProtection features={["fart-fury"]}>
            <div className="bg-gradient-to-r from-red-50 to-rose-50 p-4 rounded-lg border border-red-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FireIcon className="h-6 w-6 text-red-600 mr-3" />
                  <div>
                    <h2 className="text-lg font-semibold text-red-900">Fart Fury</h2>
                    <p className="text-sm text-gray-600">
                      {fartFuryFeature && typeof fartFuryFeature === 'object' && 'limit' in fartFuryFeature 
                        ? `${fartFuryFeature.currentUsage || 0} used/${fartFuryFeature.limit} farts limit`
                        : 'Loading usage...'}
                    </p>
                    <button
                      onClick={triggerFart}
                      className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      💨 Trigger Fart
                    </button>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ Active
                </span>
              </div>
            </div>
          </FeatureProtection>
        </div>

      </div>
    </Layout>
  );
}
