import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function handleServerError(error: unknown, context: string) {
  console.error(`Error ${context}:`, error);
  const errorMessage =
    error instanceof Error ? error.message : 'An unknown error occurred';
  return NextResponse.json(
    { error: `Failed to ${context}`, details: errorMessage },
    { status: 500 }
  );
}

// Get single product
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return handleServerError(error, 'fetch product');
  }
}

// Update product
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const product = await prisma.product.update({
      where: { id: parseInt(params.id) },
      data: body,
    });
    return NextResponse.json(product);
  } catch (error) {
    return handleServerError(error, 'update product');
  }
}

// Delete product
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return handleServerError(error, 'delete product');
  }
}
