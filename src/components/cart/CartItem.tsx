"use client";

import { CartItem as CartItemProps, useCart } from "@/hooks/useCart";
import { Button } from "../Button";

export function CartItem({ id, title, quantity }: CartItemProps) {
  const { addProduct, removeProduct } = useCart();
  return (
    <div className="flex flex-row gap-5 items-center w-full justify-between">
      <div className="w-full p-[4px_20px] border-[1px] border-gray-500 rounded-lg">
        <label>Title: {title}</label>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <Button text={"-"} onClick={() => removeProduct(id)} variant={"cart"} />
        <label className="font-bold">{quantity}</label>
        <Button
          text={"+"}
          onClick={() => addProduct(id, title)}
          variant={"cart"}
        />
      </div>
    </div>
  );
}
