import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const About: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>
            About Our Store
          </h1>
          <p className='text-lg md:text-xl max-w-2xl mx-auto'>
            Discover the story behind our passion for delivering quality
            products and exceptional shopping experiences.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row items-center gap-8'>
            <div className='md:w-1/2'>
              <h2 className='text-3xl font-semibold text-gray-800 mb-4'>
                Our Story
              </h2>
              <p className='text-gray-600 leading-relaxed mb-4'>
                Founded in 2025, our web store began with a simple mission: to
                bring high-quality, curated products to customers worldwide.
                From humble beginnings, we&apos;ve grown into a trusted name,
                offering a wide range of products that blend style,
                functionality, and sustainability.
              </p>
              <p className='text-gray-600 leading-relaxed'>
                Every item in our store is carefully selected to ensure it meets
                our high standards, and we work closely with artisans and
                suppliers who share our values. Join us on this journey as we
                continue to innovate and inspire.
              </p>
            </div>
            <div className='md:w-1/2'>
              <Image
                src='/images/store-front.jpg'
                alt='Store front'
                width={600}
                height={400}
                className='rounded-lg shadow-lg object-cover'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='bg-gray-100 py-16'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-semibold text-gray-800 text-center mb-12'>
            Meet Our Team
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[
              {
                name: 'Asep',
                role: 'Founder & CEO',
                image: '/images/team/jane.jpg',
              },
              {
                name: 'Ujang',
                role: 'Head of Design',
                image: '/images/team/john.jpg',
              },
              {
                name: 'Uci',
                role: 'Customer Success Lead',
                image: '/images/team/emily.jpg',
              },
            ].map((member, index) => (
              <div
                key={index}
                className='bg-white rounded-lg shadow-lg p-6 text-center'
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={150}
                  height={150}
                  className='rounded-full mx-auto mb-4'
                />
                <h3 className='text-xl font-semibold text-gray-800'>
                  {member.name}
                </h3>
                <p className='text-gray-600'>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='py-16 bg-gradient-to-r from-indigo-700 to-blue-600 text-white'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-semibold mb-4'>Shop With Us Today</h2>
          <p className='text-lg max-w-xl mx-auto mb-6'>
            Explore our curated collection and experience shopping like never
            before. Your perfect product is just a click away!
          </p>
          <Link
            href='/shop'
            className='inline-block bg-white text-indigo-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition'
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
