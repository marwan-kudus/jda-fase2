export interface Product {
  id: string;
  name: string;
  price: number;
}

// In-memory database
export const products: Product[] = [
  { id: '1', name: 'Laptop', price: 999.99 },
  { id: '2', name: 'Smartphone', price: 599.99 },
  { id: '3', name: 'Headphones', price: 149.99 },
];

export const generateId = (): string =>
  Math.random().toString(36).substring(2, 9);
