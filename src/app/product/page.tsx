'use client';

import { useState, useEffect, useCallback } from 'react';
import ProductList from '@/app/product/product-list';
import ProductForm from '@/app/product/product-form';
import { Product, ProductFormData } from './types';

// Constants for API endpoints and headers
const API_URL = '/api/products';
const JSON_HEADERS = {
  'Content-Type': 'application/json',
};

//ProductsPage component manages the product management UI and API interactions.

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Fetches products from the API and updates state.

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  //Creates a new product via API.

  const handleCreate = useCallback(
    async (product: ProductFormData): Promise<boolean> => {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: JSON_HEADERS,
          body: JSON.stringify(product),
        });

        if (response.ok) {
          await fetchProducts();
          return true;
        }
        throw new Error('Failed to create product');
      } catch (error) {
        console.error('Error creating product:', error);
        return false;
      }
    },
    [fetchProducts]
  );

  //Updates an existing product via API.

  const handleUpdate = useCallback(
    async (id: string, product: ProductFormData): Promise<boolean> => {
      try {
        const response = await fetch(API_URL, {
          method: 'PUT',
          headers: JSON_HEADERS,
          body: JSON.stringify({ id, ...product }),
        });

        if (response.ok) {
          await fetchProducts();
          setEditingProduct(null); // Clear editing state after successful update
          return true;
        }
        throw new Error('Failed to update product');
      } catch (error) {
        console.error('Error updating product:', error);
        return false;
      }
    },
    [fetchProducts]
  );

  //Deletes a product via API.

  const handleDelete = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        const response = await fetch(API_URL, {
          method: 'DELETE',
          headers: JSON_HEADERS,
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          await fetchProducts();
          return true;
        }
        throw new Error('Failed to delete product');
      } catch (error) {
        console.error('Error deleting product:', error);
        return false;
      }
    },
    [fetchProducts]
  );

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Product Management</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <section>
          <h2 className='text-xl font-semibold mb-4'>Add/Edit Product</h2>
          <ProductForm
            onSubmit={
              editingProduct
                ? (data) => handleUpdate(editingProduct.id, data)
                : handleCreate
            }
            initialData={editingProduct}
            onCancel={() => setEditingProduct(null)}
          />
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-4'>Product List</h2>
          <ProductList
            products={products}
            onEdit={setEditingProduct}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </div>
  );
}
