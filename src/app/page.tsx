import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <section className='relative bg-white text-black py-24'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>
            Welcome to Our Web Store
          </h1>
          <p className='text-lg md:text-xl max-w-2xl mx-auto mb-8'>
            Discover premium products crafted with care. Shop now for unbeatable
            quality and style!
          </p>
          <Link
            href='/shop'
            className='inline-block bg-blue-200 text-black font-semibold py-3 px-8 rounded-lg hover:bg-gray-200 transition'
          >
            Shop Now
          </Link>
        </div>
        <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent' />
      </section>

      {/* Featured Products Section */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-semibold text-gray-800 text-center mb-12'>
            Featured Products
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {[
              {
                name: 'Elegant Watch',
                price: 99.99,
                image: '/images/products/watch.jpg',
              },
              {
                name: 'Leather Bag',
                price: 149.99,
                image: '/images/products/bag.jpg',
              },
              {
                name: 'Wireless Earbuds',
                price: 79.99,
                image: '/images/products/earbuds.jpg',
              },
              {
                name: 'Sunglasses',
                price: 59.99,
                image: '/images/products/sunglasses.jpg',
              },
            ].map((product, index) => (
              <div
                key={index}
                className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition'
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className='w-full h-48 object-cover'
                />
                <div className='p-4'>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {product.name}
                  </h3>
                  <p className='text-gray-600'>${product.price.toFixed(2)}</p>
                  <Link
                    href={`/products/${index + 1}`}
                    className='mt-4 inline-block text-indigo-600 font-semibold hover:underline'
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className='bg-indigo-600 text-white py-12'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-semibold mb-4'>Limited Time Offer</h2>
          <p className='text-lg max-w-xl mx-auto mb-6'>
            Get 20% off your first purchase! Use code{' '}
            <span className='font-bold'>FIRST20</span> at checkout.
          </p>
          <Link
            href='/shop'
            className='inline-block bg-white text-indigo-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition'
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-gray-800 text-white py-8'>
        <div className='container mx-auto px-4 text-center'>
          <p className='text-lg mb-4'>© 2025 Web Store. All rights reserved.</p>
          <div className='flex justify-center gap-6'>
            <Link href='/about' className='hover:text-gray-300'>
              About
            </Link>
            <Link href='/contact' className='hover:text-gray-300'>
              Contact
            </Link>
            <Link href='/privacy' className='hover:text-gray-300'>
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
