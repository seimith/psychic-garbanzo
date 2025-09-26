import Layout from '@/components/layout/Layout';

export default function AboutPage() {
  return (
    <Layout title="About Dadlines - Our Story" description="Learn about Dadlines - how we're changing the news landscape with dad jokes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">About Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            The story behind Dadlines
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            How a terrible dad joke turned into a revolutionary news platform.
          </p>
        </div>

        <div className="mt-12 prose prose-blue prose-lg text-gray-500 mx-auto">
          <p>
            It all started when our founder was reading the news one morning and thought, "This would be a lot more enjoyable with a dad joke." That simple idea sparked a revolution in how we consume news.
          </p>
          
          <p>
            Dadlines was born in 2023 with a simple mission: make the news more enjoyable without compromising on quality or accuracy. By combining thoroughly researched news stories with carefully crafted dad jokes, we've found the perfect formula for keeping people informed and entertained.
          </p>

          <h3>Our Philosophy</h3>
          <p>
            At Dadlines, we believe that staying informed shouldn't be a chore. News can be engaging, informative, and yes, even funny. Our team of journalists and comedy writers work together to create content that educates and entertains in equal measure.
          </p>

          <h3>Meet Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-full overflow-hidden w-32 h-32 mx-auto">
                  <div className="h-full w-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mt-4 text-center">Jane Doe</h4>
                <p className="text-sm text-gray-500 text-center">Founder & CEO</p>
                <p className="mt-2 text-sm text-gray-500">
                  Former journalist with a passion for making news accessible and enjoyable for everyone.
                </p>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-full overflow-hidden w-32 h-32 mx-auto">
                  <div className="h-full w-full bg-gradient-to-br from-green-400 to-green-600"></div>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mt-4 text-center">John Smith</h4>
                <p className="text-sm text-gray-500 text-center">Chief Editor</p>
                <p className="mt-2 text-sm text-gray-500">
                  Pulitzer-winning journalist with over 15 years of experience in news media.
                </p>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-full overflow-hidden w-32 h-32 mx-auto">
                  <div className="h-full w-full bg-gradient-to-br from-yellow-400 to-yellow-600"></div>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mt-4 text-center">Sarah Johnson</h4>
                <p className="text-sm text-gray-500 text-center">Head of Comedy</p>
                <p className="mt-2 text-sm text-gray-500">
                  Stand-up comedian and writer specializing in the art of the perfect dad joke.
                </p>
              </div>
            </div>
          </div>

          <h3 className="mt-12">Contact Us</h3>
          <p>
            We'd love to hear from you! Got a news tip? A dad joke we should know about? Or just want to say hi? Reach out to us at <a href="mailto:info@dadlines.com" className="text-blue-600 hover:text-blue-500">info@dadlines.com</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
