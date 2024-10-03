"use client";

import { useFilterContext } from "@/context/FilterContext";
import { Product, ProductCard } from "./ProductCard";

export function ProductsGrid() {
  const { data } = useFilterContext();
  return (
    <div className="flex flex-grow justify-center w-full   overflow-auto h-full pb-20 md:-0">
      <div className="grid grid-cols-1 justify-center gap-4 p-4 sm:grid-cols-2 lg:grid-cols-[300px_300px_300px] w-full lg:min-w-[960px] auto-rows-min">
        {data.products.map((product) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
