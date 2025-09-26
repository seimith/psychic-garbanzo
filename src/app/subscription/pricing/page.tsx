'use client';

import { PricingComponent } from '@runonatlas/next/client';
import { useAuth, useUser } from '@clerk/nextjs';
import Layout from '@/components/layout/Layout';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AtlasPricingPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [configStatus, setConfigStatus] = useState<'loading' | 'configured' | 'not-configured'>('loading');
  const [configDetails, setConfigDetails] = useState<any>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  
  // Create the absolute URL for the success redirect
  const successUrl = process.env.NEXT_PUBLIC_BASE_URL 
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/subscription/customer-portal` 
    : 'https://dadlines.netlify.app/subscription/customer-portal';

  // Check Atlas configuration on load
  useEffect(() => {
    async function checkAtlasConfig() {
      try {
        // First try the detailed debug endpoint
        try {
          const debugResponse = await fetch('/api/atlas-debug');
          const debugData = await debugResponse.json();
          setDebugInfo(debugData);
          
          if (debugData.status === 'error') {
            console.error('Atlas debug endpoint returned error:', debugData);
            setConfigStatus('not-configured');
            setError(`Atlas API error: ${debugData.message}`);
            return;
          }
        } catch (debugErr) {
          console.error('Failed to fetch from debug endpoint:', debugErr);
        }

        // Then check the general health endpoint
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
        setError('Failed to check Atlas configuration. Check browser console for details.');
        console.error('Atlas health check error:', err);
      }
    }
    
    checkAtlasConfig();
  }, []);
  
  // Monitor for Atlas-related errors in console
  useEffect(() => {
    // Add enhanced console error logging
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Log to original console.error
      originalConsoleError(...args);
      
      // Check if error is related to Atlas/subscription
      const errorString = args.join(' ');
      if (errorString.includes('subscribe') || 
          errorString.includes('plan') || 
          errorString.includes('atlas')) {
        setError(`Subscription error detected: ${args[0]}`);
      }
    };
    
    return () => {
      // Restore original console.error when component unmounts
      console.error = originalConsoleError;
    };
  }, []);

  // Clear errors on auth state change
  useEffect(() => {
    if (error && isSignedIn && isLoaded) {
      setError(null);
    }
  }, [isSignedIn, isLoaded, error]);

  return (
    <Layout title="Subscription Plans - Dadlines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Choose Your Subscription Plan
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Get access to premium dad jokes and news content
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
              
              {/* Show debug information if available */}
              {debugInfo && (
                <details className="mt-4 text-xs border-t border-red-200 pt-2">
                  <summary className="font-medium cursor-pointer">Debug Information</summary>
                  <pre className="mt-2 p-2 bg-red-100 overflow-auto max-h-40 rounded">
                    {JSON.stringify(debugInfo, null, 2)}
                  </pre>
                </details>
              )}
              <div className="mt-3">
                <p>
                  Check the <code className="bg-red-100 px-1 py-0.5 rounded">ATLAS_API_KEY</code> in your <code className="bg-red-100 px-1 py-0.5 rounded">.env.local</code> file.
                </p>
                <p className="mt-2">
                  <a 
                    href="https://app.runonatlas.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Sign in to Atlas Dashboard
                  </a> to verify your API key.
                </p>
              </div>
            </div>
          )}
          
          {/* Show auth required message if not signed in */}
          {!isSignedIn && isLoaded ? (
            <div className="text-center py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">You need to sign in first</h3>
              <p className="mb-6 text-gray-600">Please sign in to view and subscribe to plans</p>
              <Link 
                href="/sign-in"
                className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Sign in
              </Link>
            </div>
          ) : configStatus === 'loading' ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600">Checking Atlas configuration...</span>
            </div>
          ) : configStatus === 'not-configured' ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium text-yellow-800 mb-4">Atlas Configuration Issue</h3>
              <p className="text-yellow-700 mb-4">The subscription system is not properly configured. Please contact support.</p>
            </div>
          ) : (
            <div>
              <PricingComponent 
                successUrl={successUrl} 
              />
              {/* Monitor Atlas component for errors */}
              <div className="sr-only">
                {/* This is a hack to capture errors from the Atlas component */}
                <script dangerouslySetInnerHTML={{ 
                  __html: `
                    (function() {
                      const originalFetch = window.fetch;
                      window.fetch = function() {
                        const fetchPromise = originalFetch.apply(this, arguments);
                        fetchPromise.catch(error => {
                          if (arguments[0].includes('atlas') || arguments[0].includes('subscription')) {
                            console.error('Atlas fetch error:', error, arguments[0]);
                          }
                        });
                        return fetchPromise;
                      };
                    })();
                  `
                }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
