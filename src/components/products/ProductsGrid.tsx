"use client";

import { Product, ProductCard } from "./ProductCard";

type ProductGrid = {
  products: Product[];
};

export function ProductsGrid({ products }: ProductGrid) {
  return (
    <div className="flex flex-grow justify-center w-full overflow-auto">
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 max-w-[1024px] max-h-full">
        {products.map((product) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
