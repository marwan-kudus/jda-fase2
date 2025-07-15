import { NextResponse } from 'next/server';
import { Product, products, generateId } from '../types/product';

// GET - Get all products
export async function GET() {
  try {
    return NextResponse.json(products);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch products';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST - Add a new product
export async function POST(request: Request) {
  try {
    const { name, price } = await request.json();

    if (!name || !price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      );
    }

    const newProduct: Product = {
      id: generateId(),
      name,
      price: Number(price),
    };

    products.push(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to create product';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// PUT - Update a product
export async function PUT(request: Request) {
  try {
    const { id, name, price } = await request.json();

    if (!id || !name || !price) {
      return NextResponse.json(
        { error: 'ID, name and price are required' },
        { status: 400 }
      );
    }

    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const updatedProduct: Product = {
      id,
      name,
      price: Number(price),
    };

    products[index] = updatedProduct;
    return NextResponse.json(updatedProduct);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to update product';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE - Delete a product
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    products.splice(index, 1);
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to delete product';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
