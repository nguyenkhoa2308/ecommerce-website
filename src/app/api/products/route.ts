// app/api/products/route.ts
import { NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/lib/products.mock";

export async function GET() {
  return NextResponse.json(MOCK_PRODUCTS);
}
