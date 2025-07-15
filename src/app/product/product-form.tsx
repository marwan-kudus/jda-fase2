'use client';

import { useState, useEffect } from 'react';
import { Product, ProductFormData } from './types';

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => Promise<boolean>;
  initialData?: Product | null;
  onCancel: () => void;
}

export default function ProductForm({
  onSubmit,
  initialData,
  onCancel,
}: ProductFormProps) {
  // State management
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with initialData when it changes
  useEffect(() => {
    setFormData(
      initialData
        ? { name: initialData.name, price: initialData.price }
        : { name: '', price: 0 }
    );
  }, [initialData]);

  // Handles input changes and updates form state

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  //Handles form submission

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    const isSuccessful = await onSubmit(formData);
    setIsSubmitting(false);

    // Reset form if it was a create operation and successful
    if (isSuccessful && !initialData) {
      setFormData({ name: '', price: 0 });
    }
  };

  // Button text based on form state
  const submitButtonText = isSubmitting
    ? 'Saving...'
    : initialData
    ? 'Update'
    : 'Add';

  return (
    <form onSubmit={handleFormSubmit} className='bg-white p-4 rounded shadow'>
      {/* Product Name Field */}
      <FormField
        label='Product Name'
        id='name'
        type='text'
        name='name'
        value={formData.name}
        onChange={handleInputChange}
        required
      />

      {/* Price Field */}
      <FormField
        label='Price'
        id='price'
        type='number'
        name='price'
        value={formData.price}
        onChange={handleInputChange}
        min='0'
        step='0.01'
        required
      />

      {/* Form Actions */}
      <div className='flex justify-end space-x-2'>
        {initialData && <CancelButton onClick={onCancel} />}
        <SubmitButton
          disabled={isSubmitting}
          text={`${submitButtonText} Product`}
        />
      </div>
    </form>
  );
}

// Helper component for form fields
interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: string;
  step?: string;
}

const FormField = ({
  label,
  id,
  type,
  name,
  value,
  onChange,
  required = false,
  min,
  step,
}: FormFieldProps) => (
  <div className='mb-4'>
    <label className='block text-gray-700 mb-2' htmlFor={id}>
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className='w-full px-3 py-2 border rounded'
      required={required}
      min={min}
      step={step}
    />
  </div>
);

// Helper component for cancel button
const CancelButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type='button'
    onClick={onClick}
    className='px-4 py-2 bg-gray-500 text-white rounded'
  >
    Cancel
  </button>
);

// Helper component for submit button
const SubmitButton = ({
  disabled,
  text,
}: {
  disabled: boolean;
  text: string;
}) => (
  <button
    type='submit'
    disabled={disabled}
    className='px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-400'
  >
    {text}
  </button>
);
