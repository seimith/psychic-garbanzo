'use client';

import { CustomerPortalComponent } from '@runonatlas/next/client';
import Layout from '@/components/layout/Layout';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function AtlasCustomerPortalPage() {
  const { data: session, status } = useSession();
  
  // Redirect to login if not authenticated
  if (status === 'unauthenticated') {
    redirect('/login');
  }

  // Create the absolute URL for the success redirect
  const successUrl = process.env.NEXT_PUBLIC_BASE_URL 
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/subscription/customer-portal` 
    : 'https://dadlines.netlify.app/subscription/customer-portal';

  // Show loading state while checking authentication
  if (status === 'loading') {
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
          <CustomerPortalComponent 
            successUrl={successUrl} 
          />
        </div>
      </div>
    </Layout>
  );
}
