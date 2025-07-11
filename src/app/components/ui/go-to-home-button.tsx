'use client';

import { useRouter } from 'next/navigation';
import { Button } from './button';

export const GoToHomeButton = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Button
      className='bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700'
      onClick={handleGoHome}
    >
      GO TO HOMEPAGE
    </Button>
  );
};
