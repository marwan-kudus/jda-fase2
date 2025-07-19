import { Product } from '@/app/product/types';
import { notFound } from 'next/navigation';

async function getProduct(id: string): Promise<Product> {
  // Validate the id
  if (!id || isNaN(parseInt(id))) {
    console.error('Invalid product ID:', id);
    notFound(); // Trigger 404 for invalid IDs
  }

  try {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      cache: 'no-store', // Disable caching for fresh data
    });

    // Log response for debugging
    console.log('API Response Status:', res.status, res.statusText);

    if (!res.ok) {
      if (res.status === 404) {
        console.log(`Product with ID ${id} not found`);
        notFound(); // Trigger Next.js 404 page
      }
      const errorText = await res.text(); // Get response body for debugging
      throw new Error(
        `Failed to fetch product: ${res.status} ${res.statusText} - ${errorText}`
      );
    }

    const data = await res.json();

    // Validate response data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid product data received');
    }

    return data as Product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error; // Re-throw to handle in the component
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const product = await getProduct(params.id);

    return (
      <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-bold mb-4'>Detail Produk</h1>
        <div className='bg-white p-6 rounded shadow max-w-2xl'>
          <h2 className='text-xl font-semibold'>{product.name}</h2>
          <p className='text-gray-600 mt-1'>{product.brand}</p>
          <p className='text-green-600 font-bold mt-2'>
            Rp {product.price.toLocaleString('id-ID')}
          </p>
          <p className='text-sm text-gray-500 mt-1'>Stok: {product.stock}</p>

          {product.description && (
            <div className='mt-4'>
              <h3 className='font-medium'>Deskripsi:</h3>
              <p className='text-gray-700 mt-1'>{product.description}</p>
            </div>
          )}

          <div className='mt-6'>
            <a href='/products' className='text-blue-500 hover:underline'>
              Kembali ke Daftar Produk
            </a>
          </div>
        </div>
      </div>
    );
  } catch {
    // Fallback UI for errors, including 404
    return (
      <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-bold mb-4'>Error</h1>
        <div className='bg-red-100 p-6 rounded shadow max-w-2xl text-red-700'>
          <p>
            Maaf, produk tidak ditemukan atau tidak dapat dimuat. Silakan coba
            lagi nanti.
          </p>
          <div className='mt-4'>
            <a href='/products' className='text-blue-500 hover:underline'>
              Kembali ke Daftar Produk
            </a>
          </div>
        </div>
      </div>
    );
  }
}
