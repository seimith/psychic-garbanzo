import { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children, title = 'Dadlines - News with a Dad Joke Twist', description = 'Get your daily news with a side of dad jokes. Stay informed and entertained!' }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="flex-grow mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start space-x-6 md:order-2">
              <Link href="/" className="text-gray-400 hover:text-gray-600">
                Home
              </Link>
              <Link href="/pricing" className="text-gray-400 hover:text-gray-600">
                Pricing
              </Link>
              <Link href="/login" className="text-gray-400 hover:text-gray-600">
                Login
              </Link>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center md:text-left text-base text-gray-500">
                &copy; {new Date().getFullYear()} Dadlines. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
