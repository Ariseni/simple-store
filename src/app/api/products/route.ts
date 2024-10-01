// /app/api/products/route.ts

import { NextResponse } from "next/server";

const defaultTake = 10;

// API handler for fetching a single product, searching for products, or fetching by category
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Extract query parameters
  const id = searchParams.get("id"); // For single product
  const searchQuery = searchParams.get("q"); // For searching products
  const category = searchParams.get("category"); // For products by category
  const limit = searchParams.get("limit"); // For limiting results
  const skip = searchParams.get("skip"); // For skipping results
  const sort = searchParams.get("sort"); // For sorting results
  const select = searchParams.get("select"); // For selecting specific fields

  let apiUrl = "https://dummyjson.com/products";

  const queryParameters = [];

  // If the `id` query param is present, fetch a single product
  if (id) {
    apiUrl = `https://dummyjson.com/products/${id}`;
  } else {
    // If `category` query param is present, fetch products by category
    if (category) {
      apiUrl = `https://dummyjson.com/products/category/${category}`;
    } else if (searchQuery) {
      // If the `q` query param is present, search products
      apiUrl = `https://dummyjson.com/products/search?q=${searchQuery}`;
    } else {
      // Collect optional query parameters
      queryParameters.push(`limit=${limit || defaultTake}`);
      if (skip)
        queryParameters.push(
          `skip=${parseInt(skip) * (limit ? parseInt(limit) : defaultTake)}`
        );
      if (sort) queryParameters.push(`sort=${sort}`);

      // Add select parameters
      queryParameters.push(
        "select=id,title,description,price,rating,availabilityStatus,thumbnail"
      );
    }
  }

  // Construct the final URL with query parameters
  const queryString =
    queryParameters.length > 0 ? `?${queryParameters.join("&")}` : "";
  apiUrl += queryString;
  try {
    // Fetch the data from the constructed URL
    const res = await fetch(apiUrl);
    const data = await res.json();

    // Return the data as a JSON response
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
