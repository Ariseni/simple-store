"use client";

import { trimText } from "@/utils/text";
import { useSession } from "next-auth/react";

enum Stock {
  IN_STOCK = "In Stock",
  LOW_STOCK = "Low Stock",
}

export type Product = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  rating: number;
  availabilityStatus: Stock;
};

export const ProductCard = ({
  title,
  thumbnail,
  price,
  rating,
  availabilityStatus,
  description,
  id,
}: Product) => {
  return (
    <div className="flex justify-between flex-col p-5 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 sm:max-h-[420px] sm:max-w-full lg:max-w-[300px] min-w-[300px] max-w-full">
      {/* Thumbnail */}
      <div>
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-40 object-contain rounded-md mb-4"
        />

        {/* Title */}
        <h3 className="text-lg font-semibold mb-2">{title}</h3>

        <span className="text-md mb-2 whitespace-normal ">
          {trimText(description)}
        </span>
      </div>
      {/* Price, rating, and Stock Availability in a row */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-700 font-bold">{price}€</span>
        <span className="text-sm text-yellow-500">⭐ {rating}</span>
        <span
          className={`text-sm ${
            availabilityStatus === Stock.IN_STOCK
              ? "text-green-500"
              : availabilityStatus === Stock.LOW_STOCK
              ? "text-orange-500"
              : "text-red-500"
          }`}
        >
          {availabilityStatus}
        </span>
      </div>
    </div>
  );
};
