import Link from 'next/link';
import { Product } from '@/app/product/types';

async function getProducts(): Promise<Product[]> {
  const res = await fetch('http://localhost:3000/api/products');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Daftar Produk Elektronik</h1>
      <Link
        href='/products/add'
        className='bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block'
      >
        Tambah Produk
      </Link>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {products.map((product) => (
          <div key={product.id} className='border p-4 rounded shadow'>
            <h2 className='text-xl font-semibold'>{product.name}</h2>
            <p className='text-gray-600'>{product.brand}</p>
            <p className='text-green-600 font-bold'>
              Rp {product.price.toLocaleString()}
            </p>
            <p className='text-sm text-gray-500'>Stok: {product.stock}</p>
            <div className='mt-2 flex space-x-2'>
              <Link
                href={`/products/edit/${product.id}`}
                className='text-blue-500 hover:underline'
              >
                Edit
              </Link>
              <Link
                href={`/products/${product.id}`}
                className='text-green-500 hover:underline'
              >
                Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
