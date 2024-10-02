"use client";

import { useLocalStorage } from "usehooks-ts";

export type CartItem = {
  quantity: number;
  id: number;
  title: string;
};

export const useCart = () => {
  const [cart, saveCart] = useLocalStorage<CartItem[]>("cart", []);
  console.log(cart);
  const addProduct = (id: number, title: string) => {
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
  };

  const removeProduct = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);

    // Update the cart quantity if the item exists
    const existingProductIndex = cart.findIndex((item) => item.id === id);
    if (existingProductIndex !== -1) {
      if (cart[existingProductIndex].quantity > 1) {
        // Decrease the quantity
        const newQuantity = cart[existingProductIndex].quantity - 1;
        updatedCart.splice(existingProductIndex, 1, {
          ...cart[existingProductIndex],
          quantity: newQuantity,
        });
      }
    }

    // Save the updated cart back to local storage
    saveCart(updatedCart);
  };

  return { cart, addProduct, removeProduct };
};
