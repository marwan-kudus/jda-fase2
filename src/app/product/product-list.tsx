'use client';

import { useState } from 'react';
import { Product } from './types';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => Promise<boolean>;
}

export default function ProductList({
  products,
  onEdit,
  onDelete,
}: ProductListProps) {
  // Track which product is currently being deleted
  const [deletingId, setDeletingId] = useState<string | null>(null);

  //Handles product deletion

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
  };

  // Render empty state if no products
  if (products.length === 0) {
    return (
      <div className='bg-white p-4 rounded shadow'>
        <p className='text-gray-500'>No products found</p>
      </div>
    );
  }

  return (
    <div className='bg-white p-4 rounded shadow'>
      <ul className='divide-y'>
        {products.map((product) => (
          <ProductListItem
            key={product.id}
            product={product}
            isDeleting={deletingId === product.id}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

// Product List Item Component
interface ProductListItemProps {
  product: Product;
  isDeleting: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => Promise<void>;
}

const ProductListItem = ({
  product,
  isDeleting,
  onEdit,
  onDelete,
}: ProductListItemProps) => (
  <li className='py-3 flex justify-between items-center'>
    <ProductInfo name={product.name} price={product.price} />
    <ProductActions
      isDeleting={isDeleting}
      onEdit={() => onEdit(product)}
      onDelete={() => onDelete(product.id)}
    />
  </li>
);

// Product Information Component
const ProductInfo = ({ name, price }: { name: string; price: number }) => (
  <div>
    <h3 className='font-medium'>{name}</h3>
    <p className='text-gray-600'>${price.toFixed(2)}</p>
  </div>
);

// Product Actions Component
interface ProductActionsProps {
  isDeleting: boolean;
  onEdit: () => void;
  onDelete: () => Promise<void>;
}

const ProductActions = ({
  isDeleting,
  onEdit,
  onDelete,
}: ProductActionsProps) => (
  <div className='flex space-x-2'>
    <EditButton onClick={onEdit} />
    <DeleteButton
      onClick={onDelete}
      disabled={isDeleting}
      isDeleting={isDeleting}
    />
  </div>
);

// Edit Button Component
const EditButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className='px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors'
    aria-label='Edit product'
  >
    Edit
  </button>
);

// Delete Button Component
const DeleteButton = ({
  onClick,
  disabled,
  isDeleting,
}: {
  onClick: () => Promise<void>;
  disabled: boolean;
  isDeleting: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className='px-3 py-1 bg-red-600 text-white rounded text-sm disabled:bg-red-400 hover:bg-red-700 transition-colors'
    aria-label={isDeleting ? 'Deleting product' : 'Delete product'}
  >
    {isDeleting ? 'Deleting...' : 'Delete'}
  </button>
);
