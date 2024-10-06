"use client";

import { useLocalStorage } from "usehooks-ts";

export type CartItem = {
  quantity: number;
  id: number;
  title: string;
};

export function useCart() {
  const [cart, saveCart] = useLocalStorage<CartItem[]>("cart", []);

  function addProduct(id: number, title: string) {
    // Create a copy of the cart to avoid direct mutation
    const updatedCart = [...cart];

    const existingProductIndex = updatedCart.findIndex(
      (item) => item.id === id
    );
    if (existingProductIndex !== -1) {
      // If the product exists, increment its quantity
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      // If it doesn't exist, add the product with a quantity of 1
      updatedCart.push({ id, quantity: 1, title });
    }

    // Save the updated cart back to local storage
    saveCart(updatedCart);
  }

  function removeProduct(id: number) {
    const updatedCart = [...cart];

    const existingProductIndex = cart.findIndex((item) => item.id === id);

    if (existingProductIndex !== -1) {
      const product = cart[existingProductIndex];

      if (product.quantity > 1) {
        updatedCart[existingProductIndex] = {
          ...product,
          quantity: product.quantity - 1,
        };
      } else {
        updatedCart.splice(existingProductIndex, 1);
      }
    }

    saveCart(updatedCart);
  }

  function emptyCart() {
    saveCart([]);
  }

  return { cart, addProduct, removeProduct, emptyCart };
}
