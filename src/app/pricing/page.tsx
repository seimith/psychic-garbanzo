'use client';

import { PricingComponent } from '@runonatlas/next/client';
import Layout from '@/components/layout/Layout';

export default function Pricing() {
  // Create the absolute URL for the success redirect
  const successUrl = process.env.NEXT_PUBLIC_BASE_URL 
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/subscription/customer-portal` 
    : 'https://dadlines.netlify.app/subscription/customer-portal';

  return (
    <Layout title="Pricing - Dadlines" description="Choose the perfect plan for your dad joke news needs">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl text-center">
              Pricing plans for teams of all sizes
            </h2>
            <p className="mt-5 max-w-2xl text-xl text-gray-500 mx-auto text-center">
              Choose an affordable plan that's packed with the best features for engaging your audience, creating your dad joke news, and sharing it with the world.
            </p>
          </div>

          <div className="mt-12">
            {/* Atlas Pricing Component */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
              <PricingComponent 
                successUrl={successUrl} 
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
