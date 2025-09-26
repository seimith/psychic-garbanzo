'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import FeatureProtection from '@/components/atlas/FeatureProtection';
import { ChartBarIcon, NewspaperIcon, ClockIcon, StarIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  joke: string;
  isFavorite: boolean;
}

export default function DashboardPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  // Fetch news data (mock data for now)
  useEffect(() => {
    if (isSignedIn && isLoaded) {
      // In a real app, this would be an API call
      const mockNews: NewsItem[] = [
        {
          id: '1',
          title: 'Global Warming Reaches New Highs',
          summary: 'Scientists report that global temperatures have reached record levels this summer, with heatwaves affecting multiple continents.',
          source: 'Global News Network',
          date: '2023-06-15',
          joke: "Why don't scientists trust atoms? Because they make up everything! Just like these temperature readings!",
          isFavorite: false,
        },
        {
          id: '2',
          title: 'Tech Giant Unveils New Smartphone',
          summary: 'The latest smartphone features breakthrough camera technology and all-day battery life.',
          source: 'Tech Today',
          date: '2023-06-14',
          joke: "Why was the smartphone wearing glasses? It lost all its contacts!",
          isFavorite: true,
        },
        {
          id: '3',
          title: 'Local Bakery Wins National Award',
          summary: 'A small-town bakery has won a prestigious national award for its sourdough bread.',
          source: 'Foodie Magazine',
          date: '2023-06-13',
          joke: "What do you call fake spaghetti? An impasta! Just like that 'artisanal' bread at the supermarket.",
          isFavorite: false,
        },
      ];

      setNews(mockNews);
      setIsLoading(false);
    }
  }, [isSignedIn, isLoaded]);

  const toggleFavorite = (id: string) => {
    setNews(
      news.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  if (!isSignedIn || !isLoaded) {
    return (
      <Layout title="Loading...">
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Your Dashboard - Dadlines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.fullName || 'News Enthusiast'}!</h1>
          <p className="mt-2 text-lg text-gray-600">Here's your personalized news feed with a side of dad jokes.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {news.map((item) => (
              <div key={item.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{item.title}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      {item.source} • {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className={`p-2 rounded-full ${
                      item.isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-gray-500'
                    }`}
                    aria-label={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <StarIcon className={`h-5 w-5 ${item.isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <p className="text-gray-700 mb-4">{item.summary}</p>
                  <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <NewspaperIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-blue-800">
                          Dad Joke Alert:
                        </p>
                        <p className="text-sm text-blue-700 mt-1">{item.joke}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Premium Feature - Advanced Analytics */}
        <div className="mt-12 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Premium Features</h2>
          
          <FeatureProtection features={["advanced-analytics"]}>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200 shadow-md">
              <div className="flex items-center mb-4">
                <SparklesIcon className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-blue-800">Advanced Analytics</h3>
              </div>
              
              <p className="text-gray-700 mb-6">Gain deeper insights into your reading habits with our advanced analytics dashboard.</p>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-900 mb-3">Reading Time by Category</h4>
                <div className="h-40 bg-gray-100 rounded flex items-center justify-center">
                  <ChartBarIcon className="h-20 w-20 text-blue-300" />
                  <span className="ml-3 text-gray-500">Interactive charts available in premium version</span>
                </div>
              </div>
            </div>
          </FeatureProtection>
        </div>
        
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Your Reading Stats</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <NewspaperIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Articles Read</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">42</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <span>+12% from last month</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <ClockIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Minutes Spent</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">127</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <span>+8% from last month</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <StarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Favorites</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {news.filter((item) => item.isFavorite).length}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Subscription Call to Action */}
        <div className="mt-10 bg-blue-50 border border-blue-100 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-blue-900">Upgrade to Premium</h3>
              <p className="mt-2 text-blue-700">Get access to advanced analytics, personalized news feeds, and more.</p>
            </div>
            <Link
              href="/subscription/pricing"
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              View Plans
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
