// app/product/[id]/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='container mx-auto px-4 py-8 text-center'>
      <h2 className='text-2xl font-bold text-red-600 mb-4'>
        Something went wrong!
      </h2>
      <p className='mb-4'>{error.message}</p>
      <button
        onClick={() => reset()}
        className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
      >
        Try again
      </button>
    </div>
  );
}
