"use client";
import { useFilterContext } from "@/context/FilterContext";
import { Fragment } from "react";
import { Button } from "../Button";

export function PaginationFilter() {
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
      page === 0 ||
      page === pages.length - 1 ||
      (page >= currentPage - 2 && page <= currentPage + 2)
    );
  });

  return (
    <div className="flex w-full px-6 md:px-20 bg-white h-20 fixed md:relative bottom-0 justify-between items-center">
      <div className="flex md:flex-grow items-center justify-center space-x-2">
        {visiblePages.map((page, index) => {
          return (
            <Fragment key={page}>
              {index > 0 && visiblePages[index - 1] + 1 !== page && (
                <span className="text-gray-500">...</span>
              )}
              <Button
                className={`px-4 py-2 rounded ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setPage(page)}
                text={page + "1"}
              />
            </Fragment>
          );
        })}
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
}
