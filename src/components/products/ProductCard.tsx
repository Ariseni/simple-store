"use client";

import { useCart } from "@/hooks/useCart";
import { trimText } from "@/utils/text";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Toast } from "../Toast";
import { Button } from "../Button";

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

export function ProductCard({
  title,
  thumbnail,
  price,
  rating,
  availabilityStatus,
  description,
  id,
}: Product) {
  const { addProduct } = useCart();
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleAddProduct() {
    setLoading(true);

    //fake loading
    setTimeout(() => {
      addProduct(id, title);
      setToastVisible(true);
      setLoading(false);
    }, 200);
  }
  return (
    <div className="flex justify-between flex-col p-5 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 sm:max-h-[500px] sm:max-w-full lg:max-w-[300px] min-w-[300px] max-w-full">
      {toastVisible && (
        <Toast
          message={"Product added"}
          onClose={() => setToastVisible(false)}
        />
      )}
      <div>
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-40 object-contain rounded-md mb-4"
        />

        <h3 className="text-lg font-semibold mb-2">{title}</h3>

        <span className="text-md mb-2 whitespace-normal ">
          {trimText(description)}
        </span>
      </div>
      <div className="flex justify-between items-center my-4">
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
      <Button
        className="bg-blue-500 rounded-lg p-[8px_8px] text-white font-semibold"
        onClick={handleAddProduct}
        disabled={loading}
        text={loading ? "Adding to cart..." : "Add to cart"}
      />
    </div>
  );
}
