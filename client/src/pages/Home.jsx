import Navbar from '../components/Navbar';

function Home() {
    return (
        <div className="bg-gray-100">
            <Navbar />
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold">Streamline Your Asset Management</h2>
          <p className="mt-4 text-lg">Keep track of your assets effortlessly with our intuitive platform.</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto py-12">
        <h3 className="text-2xl font-bold text-center mb-8">What Our Users Say</h3>
        <div className="flex flex-col space-y-4">
          <blockquote className="bg-white p-6 rounded shadow">
            <p>The Asset Manager has transformed how we track our assets!</p>
            <footer className="mt-4 text-gray-500">- John Doe, Company A</footer>
          </blockquote>
          <blockquote className="bg-white p-6 rounded shadow">
            <p>Incredible tool! It has saved us so much time and effort.</p>
            <footer className="mt-4 text-gray-500">- Jane Smith, Company B</footer>
          </blockquote>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto py-12">
        <h3 className="text-2xl font-bold text-center mb-8">Pricing Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h4 className="font-bold">Basic</h4>
            <p>$10/month</p>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">Learn More</button>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h4 className="font-bold">Pro</h4>
            <p>$25/month</p>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">Learn More</button>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h4 className="font-bold">Enterprise</h4>
            <p>Contact us for pricing</p>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">Learn More</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white shadow mt-8">
        <div className="container mx-auto py-4 text-center">
          <p className="text-gray-600">© 2023 Asset Manager. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-gray-600 hover:text-blue-500">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-blue-500">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-blue-500">Contact Us</a>
          </div>
        </div>
      </footer>

    </div>
    )
}

export default Home;