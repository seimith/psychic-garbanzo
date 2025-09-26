'use client';

import Link from 'next/link';
import { useAuth, useUser } from '@clerk/nextjs';
import { useState } from 'react';
import UserButton from '@/components/auth/UserButton';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between border-b border-gray-200">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">Dadlines</span>
            </Link>
            <div className="ml-10 hidden space-x-8 lg:block">
              <Link href="/subscription/pricing" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Subscription
              </Link>
              <Link href="/pricing" className="ml-8 text-base font-medium text-gray-500 hover:text-gray-900">
                Pricing
              </Link>
              <Link href="/about" className="ml-8 text-base font-medium text-gray-500 hover:text-gray-900">
                About
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:ml-10 lg:flex lg:space-x-4">
            {isSignedIn ? (
              <>
                <Link href="/dashboard" className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Dashboard
                </Link>
                <Link href="/profile" className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Profile
                </Link>
                <Link href="/subscription/customer-portal" className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Subscription
                </Link>
                <div className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1">
                  <UserButton />
                </div>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50">
                  Sign in
                </Link>
                <Link href="/sign-up" className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu, show/hide based on menu state. */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              href="/subscription/pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Subscription
            </Link>
            <Link 
              href="/pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <Link 
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              About
            </Link>

            {isSignedIn ? (
              <>
                <Link 
                  href="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <Link 
                  href="/subscription/customer-portal"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  Subscription
                </Link>
                <div className="flex items-center px-3 py-2">
                  <UserButton />
                </div>
              </>
            ) : (
              <>
                <Link 
                  href="/sign-in"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  Sign in
                </Link>
                <Link 
                  href="/sign-up"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={toggleMenu}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
