"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { SortOptions, useFilterContext } from "@/context/FilterContext";
import { LabelInput } from "../LabelInput";
import { Button } from "../Button";

export function ProductFilter() {
  const {
    setSearchTerm,
    category,
    setCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sortBy,
    setSortBy,
  } = useFilterContext();
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

  function toggleFilters() {
    setShowFilters((value) => !value);
  }

  useEffect(() => {
    // Fetch products by category or search for products
    axios.get("/api/categories").then((res) => {
      setCategories(res.data || { products: [] });
    });
  }, []);

  return (
    <div className="p-4 w-full h-full pt-20">
      <div className="flex justify-end">
        <Button
          onClick={toggleFilters}
          className="text-black p-4"
          text={showFilters ? "X" : ">>"}
        />
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
              <option value="" key={"allCategories"}>
                All Categories
              </option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {/* SortBy Filter */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Sort by</label>
            <select
              className="mt-1 block w-full border text-gray-700 border-gray-300 rounded-md p-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOptions)}
            >
              {Object.values(SortOptions).map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
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
            <LabelInput
              label={"Min Price (€)"}
              value={0}
              setValue={setMinPrice}
            />
            <LabelInput label={"Max Price (€)"} setValue={setMaxPrice} />
          </div>
        </div>
      )}
    </div>
  );
}
