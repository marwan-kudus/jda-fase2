'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: 0,
    description: '',
    stock: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/products/${params.id}`);

        if (!response.ok) {
          throw new Error('Produk tidak ditemukan');
        }

        const product = await response.json();
        setFormData({
          name: product.name,
          brand: product.brand,
          price: product.price,
          description: product.description || '',
          stock: product.stock,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal memuat produk');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/products/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Gagal memperbarui produk');
      }

      router.push('/product');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/products/${params.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Gagal menghapus produk');
        }

        router.push('/product');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className='container mx-auto p-4'>
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto p-4'>
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
          {error}
          <button
            onClick={() => router.push('/products')}
            className='ml-4 text-blue-500 hover:text-blue-700'
          >
            Kembali ke Daftar Produk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Edit Produk</h1>
      <form onSubmit={handleSubmit} className='max-w-md space-y-4'>
        <div>
          <label className='block mb-1'>Nama Produk</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
          />
        </div>

        <div>
          <label className='block mb-1'>Merek</label>
          <input
            type='text'
            name='brand'
            value={formData.brand}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
          />
        </div>

        <div>
          <label className='block mb-1'>Harga</label>
          <input
            type='number'
            name='price'
            value={formData.price}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
            min='0'
            step='1000'
          />
        </div>

        <div>
          <label className='block mb-1'>Deskripsi</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            rows={3}
          />
        </div>

        <div>
          <label className='block mb-1'>Stok</label>
          <input
            type='number'
            name='stock'
            value={formData.stock}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
            min='0'
          />
        </div>

        <div className='flex justify-between'>
          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50'
            disabled={isLoading}
          >
            {isLoading ? 'Menyimpan...' : 'Update Produk'}
          </button>
          <button
            type='button'
            onClick={handleDelete}
            className='bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50'
            disabled={isLoading}
          >
            {isLoading ? 'Menghapus...' : 'Hapus Produk'}
          </button>
        </div>
      </form>
    </div>
  );
}
