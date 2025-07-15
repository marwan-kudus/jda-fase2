import { notFound } from 'next/navigation';

// Constants for API endpoints
const API_BASE_URL = 'https://dummyjson.com/products';

// Interface for product data
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

// Interface for component props
interface Props {
  params: { id: string };
}

//Fetches product data from the API.

async function getProduct(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn(`Failed to fetch product ${id}: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

//ProductPage server component displays details of a single product.

export default async function ProductPage({ params }: Props) {
  const productId = Number(params.id);
  const product = await getProduct(productId);

  // Handle product not found
  if (!product) {
    notFound();
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-4'>{product.title}</h1>
      <div className='grid md:grid-cols-2 gap-8'>
        <section className='bg-gray-100 rounded-lg p-4'>
          {/* Placeholder for product image */}
          <div className='aspect-square bg-white rounded' />
        </section>
        <section>
          <p className='text-gray-700 mb-4'>{product.description}</p>
          <div className='flex items-center mb-4'>
            <span className='text-2xl font-bold'>
              ${product.price.toFixed(2)}
            </span>
            <span className='ml-4 px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded'>
              {product.rating.toFixed(1)} ★
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
          <button
            type='button'
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors'
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </button>
        </section>
      </div>
    </div>
  );
}

//Generates metadata for the product page.

export async function generateMetadata({ params }: Props) {
  const productId = Number(params.id);
  const product = await getProduct(productId);

  return {
    title: product ? `${product.title} | My Store` : 'Product Not Found',
    description: product?.description ?? 'Product not found',
  };
}
