/**
 * TODO: Prepare an endpoint to return a list of products
 * The endpoint should return a pagination of 10 products per page
 * The endpoint should accept a query parameter "page" to return the corresponding page
 */
import { NextRequest, NextResponse } from 'next/server';
import { fetchProducts } from '@/lib/products';

export async function GET(req: NextRequest) {
  try {
    const page = parseInt(req.nextUrl.searchParams.get("page") || '1', 10);

    if (isNaN(page) || page < 1) {
      return NextResponse.json({ error: "Invalid page number" }, { status: 400 });
    }

    const products = fetchProducts(page);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}