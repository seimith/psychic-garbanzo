'use client';

import { SignIn } from '@clerk/nextjs';
import Layout from '@/components/layout/Layout';

export default function SignInPage() {
  return (
    <Layout title="Sign In - Dadlines">
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
            Sign in to your account
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <SignIn
              appearance={{
                elements: {
                  formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
                  card: "bg-white shadow-none",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                }
              }}
              path="/sign-in"
              afterSignInUrl="/dashboard"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
