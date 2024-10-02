"use client";

import { CartItem, useCart } from "@/hooks/useCart";
import dynamic from "next/dynamic";

export default function Cart() {
  const { cart } = useCart();

  return (
    <div className=" bg-red-500">
      {cart.map((item) => (
        <Item {...item} />
      ))}
    </div>
  );
}

const Item = ({ id, title, quantity }: CartItem) => {
  return (
    <div>
      Id: {id} Title: {title} Quantity: {quantity}
    </div>
  );
};
