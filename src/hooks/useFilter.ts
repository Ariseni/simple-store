import { useEffect, useState } from "react";

import { Product } from "@/components/products/ProductCard";

export const useFilter = () => {
  // States for filters
  const [category, setCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("/api/products");
  const [data, setData] = useState<{ products: Product[]; total: number }>({
    products: [],
    total: 0,
  });

  const handleChange = async () => {
    const queryParameters = [];
    console.log(page, pageSize);
    if (category) queryParameters.push(`category=${category}`);
    if (searchTerm && searchTerm.length > 0)
      queryParameters.push(`q=${searchTerm}`);
    if (minPrice) queryParameters.push(`price_min=${minPrice}`);
    if (maxPrice) queryParameters.push(`price_max=${maxPrice}`);
    queryParameters.push(`limit=${pageSize}`);
    queryParameters.push(`skip=${page}`);

    const queryString =
      queryParameters.length > 0 ? `?${queryParameters.join("&")}` : "";
    const queryUrl = `/api/products${queryString}`;
    setQuery(queryUrl);
  };

  useEffect(() => {
    handleChange();
  }, [category, searchTerm, minPrice, maxPrice, pageSize, page]);

  return {
    category,
    setCategory,
    searchTerm,
    setSearchTerm,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    data,
    setData,
    query,
    pageSize,
    setPageSize,
    page,
    setPage,
  };
};
