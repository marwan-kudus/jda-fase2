'use client';

import { GoToHomeButton } from '@/app/components/ui/go-to-home-button';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white'>
      <h1 className='text-[100px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-blue-700'>
        Oops!
      </h1>
      <p className='text-xl text-black mb-6'>404 - PAGE NOT FOUND</p>
      <p className='text-center text-black max-w-md mb-8'>
        Halaman yang Anda cari mungkin telah dihapus, namanya telah diubah, atau
        saat ini sedang tidak tersedia.
      </p>
      <GoToHomeButton />
    </div>
  );
}
