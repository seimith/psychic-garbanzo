'use client';

import { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { UserIcon, CogIcon, BellIcon } from '@heroicons/react/24/outline';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  preferences: {
    emailNotifications: boolean;
    darkMode: boolean;
    categories: string[];
  };
}

export default function ProfilePage() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    avatar: '',
    preferences: {
      emailNotifications: true,
      darkMode: false,
      categories: ['politics', 'technology', 'entertainment'],
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  // Load user profile data
  useEffect(() => {
    if (isSignedIn && isLoaded && user) {
      // In a real app, you would fetch this from an API
      setProfile({
        name: user.fullName || 'User',
        email: user.emailAddresses[0]?.emailAddress || 'user@example.com',
        avatar: user.imageUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.fullName || 'User'),
        preferences: {
          emailNotifications: true,
          darkMode: false,
          categories: ['politics', 'technology', 'entertainment'],
        },
      });
      setIsLoading(false);
    }
  }, [isSignedIn, isLoaded, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // In a real app, you would send this to your API
      await new Promise((resolve) => setTimeout(resolve, 800)); // Simulating API call
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const updatePreference = (key: keyof UserProfile['preferences'], value: any) => {
    setProfile({
      ...profile,
      preferences: {
        ...profile.preferences,
        [key]: value,
      },
    });
  };

  const toggleCategory = (category: string) => {
    if (profile.preferences.categories.includes(category)) {
      updatePreference(
        'categories',
        profile.preferences.categories.filter((c) => c !== category)
      );
    } else {
      updatePreference('categories', [...profile.preferences.categories, category]);
    }
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
    <Layout title="Your Profile - Dadlines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full ${
                  activeTab === 'profile'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                <UserIcon
                  className={`flex-shrink-0 -ml-1 mr-3 h-6 w-6 ${
                    activeTab === 'profile' ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                <span className="truncate">Profile Information</span>
              </button>

              <button
                onClick={() => setActiveTab('preferences')}
                className={`group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full ${
                  activeTab === 'preferences'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                <CogIcon
                  className={`flex-shrink-0 -ml-1 mr-3 h-6 w-6 ${
                    activeTab === 'preferences' ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                <span className="truncate">News Preferences</span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full ${
                  activeTab === 'notifications'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                <BellIcon
                  className={`flex-shrink-0 -ml-1 mr-3 h-6 w-6 ${
                    activeTab === 'notifications' ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                <span className="truncate">Notifications</span>
              </button>
            </nav>
          </aside>

          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            {message.text && (
              <div
                className={`p-4 rounded-md ${
                  message.type === 'success' ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    {message.type === 'success' ? (
                      <svg
                        className="h-5 w-5 text-green-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <p
                      className={`text-sm font-medium ${
                        message.type === 'success' ? 'text-green-800' : 'text-red-800'
                      }`}
                    >
                      {message.text}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                {activeTab === 'profile' && (
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="bg-white py-6 px-4 sm:p-6">
                      <div>
                        <h2 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h2>
                        <p className="mt-1 text-sm text-gray-500">
                          Update your personal information and how you appear on the site.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-4 gap-6">
                        <div className="col-span-4 sm:col-span-2">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="name"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-4">
                          <label className="block text-sm font-medium text-gray-700">Photo</label>
                          <div className="mt-1 flex items-center">
                            <img
                              className="h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                              src={profile.avatar}
                              alt={profile.name}
                            />
                            <div className="ml-4 flex">
                              <div className="relative bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm flex items-center cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                <label
                                  htmlFor="avatar-upload"
                                  className="relative text-sm font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                                >
                                  <span>Change</span>
                                  <input
                                    id="avatar-upload"
                                    name="avatar-upload"
                                    type="file"
                                    className="sr-only"
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-4 flex justify-end">
                          <button
                            type="submit"
                            disabled={isSaving}
                            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                              isSaving
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            }`}
                          >
                            {isSaving ? 'Saving...' : 'Save'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {activeTab === 'preferences' && (
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="bg-white py-6 px-4 sm:p-6">
                      <div>
                        <h2 className="text-lg leading-6 font-medium text-gray-900">News Preferences</h2>
                        <p className="mt-1 text-sm text-gray-500">
                          Customize your news feed and category preferences.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                        <fieldset>
                          <legend className="text-base font-medium text-gray-900">News Categories</legend>
                          <div className="mt-4 space-y-4">
                            {['politics', 'technology', 'entertainment', 'sports', 'health', 'science'].map(
                              (category) => (
                                <div key={category} className="flex items-start">
                                  <div className="flex items-center h-5">
                                    <input
                                      id={`category-${category}`}
                                      name={`category-${category}`}
                                      type="checkbox"
                                      checked={profile.preferences.categories.includes(category)}
                                      onChange={() => toggleCategory(category)}
                                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    />
                                  </div>
                                  <div className="ml-3 text-sm">
                                    <label htmlFor={`category-${category}`} className="font-medium text-gray-700">
                                      {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </label>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </fieldset>

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={isSaving}
                            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                              isSaving
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            }`}
                          >
                            {isSaving ? 'Saving...' : 'Save Preferences'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="bg-white py-6 px-4 sm:p-6">
                      <div>
                        <h2 className="text-lg leading-6 font-medium text-gray-900">Notification Settings</h2>
                        <p className="mt-1 text-sm text-gray-500">
                          Manage how and when you receive notifications from Dadlines.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                        <fieldset>
                          <legend className="text-base font-medium text-gray-900">By Email</legend>
                          <div className="mt-4 space-y-4">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="email-notifications"
                                  name="email-notifications"
                                  type="checkbox"
                                  checked={profile.preferences.emailNotifications}
                                  onChange={(e) =>
                                    updatePreference('emailNotifications', e.target.checked)
                                  }
                                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="email-notifications" className="font-medium text-gray-700">
                                  Daily News Digest
                                </label>
                                <p className="text-gray-500">
                                  Get a daily email with the latest news and dad jokes.
                                </p>
                              </div>
                            </div>
                          </div>
                        </fieldset>

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={isSaving}
                            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                              isSaving
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            }`}
                          >
                            {isSaving ? 'Saving...' : 'Save Notification Settings'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
