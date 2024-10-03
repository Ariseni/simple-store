"use client";

import Link from "next/link";
import Image from "next/image";
import { CartItem, useCart } from "@/hooks/useCart";

export default function Cart() {
  const { cart } = useCart();

  // Calculate total quantity of items in the cart
  const totalQuantity =
    cart.reduce((acc: number, item: CartItem) => acc + item.quantity, 0) || 0;

  return (
    <Link
      href="/cart"
      passHref
      className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded flex items-center relative"
    >
      <Image priority src={"/cart.png"} alt="Cart" width={32} height={32} />
      <div className="flex justify-center items-center absolute w-6 h-6 rounded-full bg-red-500 -top-2 -right-2">
        <label className="text-white text-sm">{totalQuantity}</label>
      </div>
    </Link>
  );
}
