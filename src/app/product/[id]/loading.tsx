export default function ProductLoading() {
  return (
    <div className='container mx-auto px-4 py-8 animate-pulse'>
      <div className='h-8 bg-gray-200 rounded w-3/4 mb-6'></div>
      <div className='grid md:grid-cols-2 gap-8'>
        <div className='bg-gray-100 rounded-lg p-4'>
          <div className='aspect-square bg-gray-200 rounded'></div>
        </div>
        <div>
          <div className='h-4 bg-gray-200 rounded mb-2'></div>
          <div className='h-4 bg-gray-200 rounded mb-2'></div>
          <div className='h-4 bg-gray-200 rounded mb-2 w-3/4'></div>

          <div className='h-8 bg-gray-200 rounded w-1/4 mb-6'></div>

          <div className='h-4 bg-gray-200 rounded mb-2 w-1/3'></div>
          <div className='h-4 bg-gray-200 rounded mb-2 w-1/3'></div>
          <div className='h-4 bg-gray-200 rounded mb-2 w-1/3'></div>

          <div className='h-10 bg-gray-200 rounded w-1/3 mt-8'></div>
        </div>
      </div>
    </div>
  );
}
