'use client';

import { PricingComponent } from '@runonatlas/next/client';
import Layout from '@/components/layout/Layout';

export default function AtlasPricingPage() {
  // Create the absolute URL for the success redirect
  const successUrl = process.env.NEXT_PUBLIC_BASE_URL 
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/subscription/customer-portal` 
    : 'https://dadlines.netlify.app/subscription/customer-portal';

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
          <PricingComponent 
            successUrl={successUrl} 
          />
        </div>
      </div>
    </Layout>
  );
}
