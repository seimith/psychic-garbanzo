import { CheckIcon } from '@heroicons/react/24/outline';
import Layout from '@/components/layout/Layout';

const tiers = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for casual readers who enjoy a good dad joke now and then.',
    features: [
      '5 dad jokes per day',
      'Basic news categories',
      'Email support',
      'Community access',
    ],
    cta: 'Get started',
    featured: false,
  },
  {
    name: 'Pro',
    price: 9,
    description: 'For those who want more dad jokes and news in their daily life.',
    features: [
      'Unlimited dad jokes',
      'All news categories',
      'Priority email support',
      'Exclusive content',
      'Ad-free experience',
    ],
    cta: 'Get started',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 29,
    description: 'For organizations that want to spread dad joke joy company-wide.',
    features: [
      'Everything in Pro',
      'Team management',
      'Dedicated account manager',
      'API access',
      'Custom integrations',
    ],
    cta: 'Contact sales',
    featured: false,
  },
];

export default function Pricing() {
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

          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`border rounded-lg shadow-sm divide-y ${
                  tier.featured ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                <div className="p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{tier.name}</h3>
                  <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-gray-900">${tier.price}</span>{' '}
                    <span className="text-base font-medium text-gray-500">/mo</span>
                  </p>
                  <a
                    href={tier.featured ? '/register' : '/contact'}
                    className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                      tier.featured
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    }`}
                  >
                    {tier.cta}
                  </a>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <h4 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h4>
                  <ul className="mt-6 space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex">
                        <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                        <span className="ml-3 text-base text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
