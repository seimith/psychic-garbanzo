'use client';

import { SignUp } from '@clerk/nextjs';
import Layout from '@/components/layout/Layout';

export default function SignUpPage() {
  return (
    <Layout title="Sign Up - Dadlines">
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
            Create your account
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <SignUp
              appearance={{
                elements: {
                  formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
                  card: "bg-white shadow-none",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                }
              }}
              path="/sign-up"
              afterSignUpUrl="/dashboard"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
