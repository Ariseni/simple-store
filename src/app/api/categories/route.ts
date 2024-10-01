import { NextResponse } from "next/server";
import axios from "axios";
const defaultTake = 10;

// API handler for fetching a single product, searching for products, or fetching by category
export async function GET() {
  try {
    // Fetch the data from the constructed URL
    const res = await axios.get("https://dummyjson.com/products/category-list");

    // Return the data as a JSON response
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
