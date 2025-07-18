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

// Get all products
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return handleServerError(error, 'fetch products');
  }
}

// Create new product
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({
      data: body,
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return handleServerError(error, 'create product');
  }
}
