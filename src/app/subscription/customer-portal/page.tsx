'use client';

import { CustomerPortalComponent } from '@runonatlas/next/client';
import Layout from '@/components/layout/Layout';
import { useAuth, useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AtlasCustomerPortalPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [configStatus, setConfigStatus] = useState<'loading' | 'configured' | 'not-configured'>('loading');
  const [configDetails, setConfigDetails] = useState<any>(null);
  
  // Check Atlas configuration on load
  useEffect(() => {
    async function checkAtlasConfig() {
      try {
        const response = await fetch('/api/atlas-health');
        const data = await response.json();
        
        if (data.status === 'ok' && data.configured) {
          setConfigStatus('configured');
        } else {
          setConfigStatus('not-configured');
          setConfigDetails(data);
          setError(data.message || 'Atlas is not properly configured');
        }
      } catch (err) {
        setConfigStatus('not-configured');
        setError('Failed to check Atlas configuration');
        console.error('Atlas health check error:', err);
      }
    }
    
    checkAtlasConfig();
  }, []);
  
  // Listen for subscription-related errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message?.includes('subscription') || 
          event.message?.includes('atlas') || 
          event.message?.includes('plan')) {
        console.error('Atlas subscription error:', event);
        setError('There was an issue with your subscription. Please try again later.');
      }
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
  // Redirect to login if not authenticated
  if (isLoaded && !isSignedIn) {
    redirect('/sign-in');
  }

  // Create the absolute URL for the success redirect
  const successUrl = process.env.NEXT_PUBLIC_BASE_URL 
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/subscription/customer-portal` 
    : 'https://dadlines.netlify.app/subscription/customer-portal';

  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      <Layout title="Customer Portal - Dadlines">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Customer Portal - Dadlines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Your Subscription
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Manage your subscription and payment information
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6">
          {/* Display configuration errors */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <p className="font-medium">Error: {error}</p>
              {configDetails?.suggestions && (
                <div className="mt-3">
                  <p className="font-medium">Suggestions:</p>
                  <ul className="list-disc pl-5 mt-1">
                    {configDetails.suggestions.map((suggestion: string, index: number) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-3 flex justify-between items-center">
                <p>
                  Check the <code className="bg-red-100 px-1 py-0.5 rounded">ATLAS_API_KEY</code> configuration.
                </p>
                <button 
                  className="text-blue-600 underline"
                  onClick={() => setError(null)}
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
          
          {/* Handle configuration states */}
          {configStatus === 'loading' ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600">Checking Atlas configuration...</span>
            </div>
          ) : configStatus === 'not-configured' ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-yellow-800 mb-4">Atlas Configuration Issue</h3>
              <p className="text-yellow-700 mb-4">The subscription system is not properly configured.</p>
              <div className="flex space-x-4">
                <Link
                  href="/"
                  className="px-4 py-2 bg-white border border-yellow-400 rounded text-yellow-700 hover:bg-yellow-50"
                >
                  Return to Homepage
                </Link>
                <Link
                  href="/subscription/pricing"
                  className="px-4 py-2 bg-yellow-100 border border-yellow-400 rounded text-yellow-700 hover:bg-yellow-200"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          ) : (
            <CustomerPortalComponent 
              successUrl={successUrl} 
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
