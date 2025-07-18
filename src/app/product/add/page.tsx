'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: 0,
    description: '',
    stock: 0,
  });

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

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Tambah Produk Baru</h1>
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
          />
        </div>

        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Simpan Produk
        </button>
      </form>
    </div>
  );
}
