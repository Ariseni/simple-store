import { NextResponse } from "next/server";

const defaultTake = 10;

// API handler for fetching a single product, searching for products, or fetching by category
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  const searchQuery = searchParams.get("q");
  const category = searchParams.get("category");
  const limit = searchParams.get("limit");
  const skip = searchParams.get("skip");
  const sortBy = searchParams.get("sortBy");
  const order = searchParams.get("order");

  let apiUrl = "https://dummyjson.com/products";

  const queryParameters = [];

  if (id) {
    apiUrl = `https://dummyjson.com/products/${id}`;
  } else {
    if (category) {
      apiUrl = `https://dummyjson.com/products/category/${category}`;
    } else if (searchQuery) {
      apiUrl = `https://dummyjson.com/products/search?q=${searchQuery}`;
    } else {
      queryParameters.push(`limit=${limit || defaultTake}`);
      if (skip)
        queryParameters.push(
          `skip=${parseInt(skip) * (limit ? parseInt(limit) : defaultTake)}`
        );
      if (sortBy) queryParameters.push(`sortBy=${sortBy}`);
      if (order) queryParameters.push(`order=${order}`);

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
