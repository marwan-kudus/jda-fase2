import Link from 'next/link';

export default function Navbar() {
  return (
    <header className='bg-white shadow-sm'>
      <div className='container mx-auto px-4 py-6'>
        <div className='flex justify-between items-center'>
          <div className='text-2xl font-bold text-gray-800'>JABAR DIGITAL</div>

          <nav className='hidden md:flex space-x-8'>
            <Link
              href='/'
              className='text-gray-600 hover:text-gray-900 transition-colors'
            >
              Home
            </Link>
            <Link
              href='/about'
              className='text-gray-600 hover:text-gray-900 transition-colors'
            >
              About
            </Link>
            <Link
              href='/work'
              className='text-gray-600 hover:text-gray-900 transition-colors'
            >
              Profile
            </Link>
            <Link
              href='/blog'
              className='text-gray-600 hover:text-gray-900 transition-colors'
            >
              Skill
            </Link>
            <Link
              href='/contact'
              className='text-gray-600 hover:text-gray-900 transition-colors'
            >
              Contact
            </Link>
          </nav>

          {/* Mobile menu button (opsional) */}
          <button className='md:hidden text-gray-600'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
