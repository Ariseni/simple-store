"use client";

import { ProductFilter } from "@/components/Filter";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { Fragment, useEffect } from "react";
import axios from "axios";
import { useFilterContext } from "@/context/FilterContext";

export default function ProductsPage() {
  const { query, setData } = useFilterContext();
  useEffect(() => {
    // Fetch products by category or search for products
    axios.get(query).then((res) => {
      setData(res.data || { products: [] });
    });
  }, [query]);

  return (
    <div className="flex flex-col xl:flex-row w-full mt-20">
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
const PaginationFilter = () => {
  const {
    data,
    pageSize,
    page: currentPage,
    setPage,
    setPageSize,
  } = useFilterContext();
  const pageSizes = [10, 25, 50];
  const totalPages = Math.ceil(data.total / pageSize);
  const pages = Array.from({
    length: totalPages,
  }).map((_, index) => index);

  const visiblePages = pages.filter((page: number) => {
    return (
      page === 0 || // Always show the first page
      page === pages.length - 1 || // Always show the last page
      (page >= currentPage - 2 && page <= currentPage + 2) // Show 2 pages before and 2 pages after the current page
    );
  });

  return (
    <div className="flex w-full px-6 md:px-20 bg-white h-20 fixed md:relative bottom-0 justify-between items-center">
      <div className="flex md:flex-grow items-center justify-center space-x-2">
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
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setPage(page)}
            >
              {page + 1}
            </button>
          </Fragment>
        ))}
      </div>
      <div>
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
