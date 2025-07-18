import { Product } from '@/app/product/types';

async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  return res.json();
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const product = await getProduct(params.id);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Detail Produk</h1>
      <div className='bg-white p-6 rounded shadow max-w-2xl'>
        <h2 className='text-xl font-semibold'>{product.name}</h2>
        <p className='text-gray-600 mt-1'>{product.brand}</p>
        <p className='text-green-600 font-bold mt-2'>
          Rp {product.price.toLocaleString()}
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
}
