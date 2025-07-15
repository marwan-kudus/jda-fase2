export interface Product {
  id: string;
  name: string;
  price: number;
}

export type ProductFormData = Omit<Product, 'id'>;