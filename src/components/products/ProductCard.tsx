"use client";

import { useCart } from "@/hooks/useCart";
import { trimText } from "@/utils/text";
import { MouseEventHandler, useRef, useState } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div
      onClick={() => setIsModalOpen(true)}
      className="flex justify-between flex-col p-5 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 sm:max-h-[500px] sm:max-w-full lg:max-w-[300px] min-w-[300px] max-w-full"
    >
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
        onClick={(e) => {
          e.stopPropagation();
          handleAddProduct();
        }}
        disabled={loading}
        text={loading ? "Adding to cart..." : "Add to cart"}
      />
      {isModalOpen && (
        <ProductModal
          id={id}
          title={title}
          price={price}
          rating={rating}
          availability={availabilityStatus}
          description={description}
          thumbnail={thumbnail}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

import React from "react";

interface ProductModalProps {
  id: number;
  title: string;
  price: number;
  rating: number;
  availability: Stock;
  description: string;
  thumbnail: string;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  title,
  price,
  rating,
  availability,
  description,
  thumbnail,
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(
      "click",
      modalRef.current,
      !modalRef.current?.contains(e.target as Node)
    );
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      console.log("onclose");
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col space-y-4">
          <img
            src={thumbnail}
            alt={title}
            className="object-contain w-full h-40 rounded-md"
          />
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          <p className="text-md text-gray-600">{description}</p>
          <div className="flex justify-between">
            <p className="text-lg font-bold text-gray-700">{price}€</p>
            <p className="text-sm text-yellow-500">⭐ {rating}/5</p>
            <p
              className={`text-sm ${
                availability ? "text-green-600" : "text-red-600"
              }`}
            >
              {availability ? "In Stock" : "Out of Stock"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
