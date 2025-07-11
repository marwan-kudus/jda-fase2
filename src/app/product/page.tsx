// app/product/page.tsx
import Link from 'next/link';
import { Product } from './[id]/page';

// Fungsi untuk fetch semua produk
async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=10');
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function ProductPage() {
  const products = await getProducts();

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Our Products</h1>

      {products.length === 0 ? (
        <p className='text-center text-gray-500'>No products found</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className='border rounded-lg overflow-hidden hover:shadow-lg transition-shadow'
            >
              <div className='bg-gray-100 h-48 flex items-center justify-center p-4'>
                <div className='w-full h-full bg-white rounded'></div>
              </div>
              <div className='p-4'>
                <h2 className='font-semibold text-lg mb-1 line-clamp-1'>
                  {product.title}
                </h2>
                <p className='text-gray-600 text-sm mb-2 line-clamp-2'>
                  {product.description}
                </p>
                <div className='flex justify-between items-center'>
                  <span className='font-bold'>${product.price}</span>
                  <span className='text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded'>
                    {product.rating} ★
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export const metadata = {
  title: 'All Products | My Store',
  description: 'Browse our wide selection of products',
};
