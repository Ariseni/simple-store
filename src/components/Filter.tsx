"use client";

import { useFilter } from "@/hooks/useFilter";
import { useState, useEffect } from "react";
import axios from "axios";

type Filter = {
  setSearchTerm: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  minPrice?: number;
  setMinPrice: (value: number | undefined) => void;
  maxPrice?: number;
  setMaxPrice: (value: number | undefined) => void;
};

export const ProductFilter = ({
  setSearchTerm,
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: Filter) => {
  const [localSearch, setLocalSearch] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  // Debounce effect for search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(localSearch);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [localSearch]);

  const toggleFilters = () => {
    setShowFilters((value) => !value);
  };

  useEffect(() => {
    // Fetch products by category or search for products
    axios.get("/api/categories").then((res) => {
      setCategories(res.data || { products: [] });
    });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-end">
        <button onClick={toggleFilters} className="text-black">
          {showFilters ? "X" : ">>"}
        </button>
        ;
      </div>
      {/* Filter Section */}
      {showFilters && (
        <div className="mb-6 p-4 bg-white shadow-lg rounded-lg">
          {/* Category Filter */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Category
            </label>
            <select
              className="mt-1 block w-full border text-gray-700 border-gray-300 rounded-md p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option value={category}>{category.toUpperCase()}</option>
              ))}
            </select>
          </div>

          {/* Search Filter */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Search</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Search for products..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>

          {/* Price Filter */}
          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold">
                Min Price (€)
              </label>
              <input
                type="number"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={minPrice}
                onChange={(e) => setMinPrice(parseFloat(e.target.value))}
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold">
                Max Price (€)
              </label>
              <input
                type="number"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
