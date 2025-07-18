export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  description: string | null;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}
