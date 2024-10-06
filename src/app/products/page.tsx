"use client";

import { ProductFilter } from "@/components/filters/Filter";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { Fragment, useEffect } from "react";
import axios from "axios";
import { useFilterContext } from "@/context/FilterContext";
import { Button } from "@/components/Button";
import { PaginationFilter } from "@/components/filters/PaginationFilter";

export default function ProductsPage() {
  const { query, setData } = useFilterContext();
  useEffect(() => {
    axios.get(query).then((res) => {
      setData(res.data || { products: [] });
    });
  }, [query]);

  return (
    <div className="flex flex-col xl:flex-row w-full">
      <div className="flex justify-center bg-white min-w-10 h-full">
        <ProductFilter />
      </div>
      <div className="flex flex-col w-full">
        <ProductsGrid />
        <PaginationFilter />
      </div>
    </div>
  );
}
