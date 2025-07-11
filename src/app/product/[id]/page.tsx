// app/product/[id]/page.tsx
import { notFound } from 'next/navigation';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
}

// Fungsi untuk fetch data produk (simulasi)
async function getProduct(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

interface Props {
  params: { id: string };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(Number(params.id));

  if (!product) {
    notFound();
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-4'>{product.title}</h1>
      <div className='grid md:grid-cols-2 gap-8'>
        <div className='bg-gray-100 rounded-lg p-4'>
          <div className='aspect-square bg-white rounded'></div>
        </div>
        <div>
          <p className='text-gray-700 mb-4'>{product.description}</p>
          <div className='flex items-center mb-4'>
            <span className='text-2xl font-bold'>${product.price}</span>
            <span className='ml-4 px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded'>
              {product.rating} ★
            </span>
          </div>
          <div className='mb-4'>
            <span className='font-semibold'>Brand:</span> {product.brand}
          </div>
          <div className='mb-4'>
            <span className='font-semibold'>Category:</span> {product.category}
          </div>
          <div className='mb-4'>
            <span className='font-semibold'>Stock:</span> {product.stock} units
            available
          </div>
          <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md'>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const product = await getProduct(Number(params.id));

  return {
    title: product ? `${product.title} | My Store` : 'Product Not Found',
    description: product?.description,
  };
}
