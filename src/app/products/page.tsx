"use client";

import { ProductFilter } from "@/components/Filter";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { useFilter } from "@/hooks/useFilter";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { pages } from "next/dist/build/templates/app-page";

export default function ProductsPage() {
  const { query, data, setData, ...rest } = useFilter();
  useEffect(() => {
    // Fetch products by category or search for products
    axios.get(query).then((res) => {
      setData(res.data || { products: [] });
    });
  }, [query]);

  return (
    <div className="flex w-full h-[calc(100vh-160px)]">
      <div className="flex justify-center bg-white min-w-20">
        <ProductFilter {...rest} />
      </div>
      <div className="flex flex-col w-full">
        <ProductsGrid products={data.products} />
        <PaginationFilter totalItems={data.total} {...rest} />
      </div>
    </div>
  );
}
type Pagination = {
  totalItems: number;
  pageSize: number;
  setPageSize: (value: number) => void;
  page: number;
  setPage: (value: number) => void;
};
const PaginationFilter = ({
  pageSize,
  setPageSize,
  setPage,
  page: currentPage,
  totalItems,
}: Pagination) => {
  const pageSizes = [10, 25, 50];
  const totalPages = Math.ceil(totalItems / pageSize);
  const pages = Array.from({
    length: totalPages,
  }).map((_, index) => index);

  const visiblePages = pages.filter((page: number) => {
    return (
      page === 1 || // Always show the first page
      page === pages.length || // Always show the last page
      (page >= currentPage - 2 && page <= currentPage + 2) // Show 2 pages before and 2 pages after the current page
    );
  });

  return (
    <div className="flex space-x-4 px-20 bg-white">
      <div className="flex flex-grow items-center justify-center space-x-2 mt-4">
        {/* Render Pagination */}
        {visiblePages.map((page, index) => (
          <Fragment key={page}>
            {/* Add ellipsis if there's a gap between pages */}
            {index > 0 && visiblePages[index - 1] + 1 !== page && (
              <span className="text-gray-500">...</span>
            )}

            {/* Render Page Numbers */}
            <button
              className={`px-4 py-2 rounded ${
                page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setPage(page)}
            >
              {page}
            </button>
          </Fragment>
        ))}
      </div>
      <div className="">
        <label className="block text-gray-700 font-semibold">
          Items per page
        </label>
        <select
          className="mt-1 block w-full border border-gray-300 rounded-md p-2  text-gray-700"
          value={pageSize}
          onChange={(e) => setPageSize(parseInt(e.target.value))}
        >
          {pageSizes.map((pageSize) => (
            <option value={pageSize} key={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
