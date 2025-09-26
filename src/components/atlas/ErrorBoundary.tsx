'use client';

import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';

interface ErrorBoundaryProps {
  children: ReactNode;
}

export default function AtlasErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  // Handle unexpected errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Check if this is a fetch error related to Atlas
      if (
        (event.message.includes('fetch') || 
        event.message.includes('network') || 
        event.message.includes('Failed to fetch')) && 
        (event.filename?.includes('atlas') || 
         event.error?.stack?.includes('atlas'))
      ) {
        console.error('Atlas API error detected:', event);
        setHasError(true);
        setErrorInfo(event.message);
        
        // Prevent error propagation
        event.preventDefault();
        event.stopPropagation();
      }
    };
    
    // Global error handler
    window.addEventListener('error', handleError);
    
    // Unhandled promise rejection handler
    const handlePromiseRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason;
      if (
        error?.message?.includes('fetch') || 
        error?.message?.includes('atlas') ||
        error?.stack?.includes('atlas')
      ) {
        console.error('Atlas API promise rejection:', error);
        setHasError(true);
        setErrorInfo(error.message || 'Connection error with subscription service');
        
        // Prevent error propagation
        event.preventDefault();
      }
    };
    
    window.addEventListener('unhandledrejection', handlePromiseRejection);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handlePromiseRejection);
    };
  }, []);

  if (hasError) {
    return (
      <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg my-4">
        <h3 className="text-lg font-medium text-amber-800">Subscription Service Connection Issue</h3>
        <p className="mt-2 text-amber-700">
          We're having trouble connecting to our subscription service. This won't affect
          your ability to use the basic features of Dadlines.
        </p>
        
        {errorInfo && (
          <div className="mt-2 p-2 bg-amber-100 rounded text-sm text-amber-800 font-mono">
            {errorInfo}
          </div>
        )}
        
        <div className="mt-4 flex gap-4">
          <button 
            onClick={() => setHasError(false)} 
            className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
          >
            Try Again
          </button>
          
          <Link 
            href="/"
            className="px-4 py-2 border border-amber-600 text-amber-700 rounded hover:bg-amber-100"
          >
            Continue to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
