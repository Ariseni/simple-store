"use client";

import Login from "@/components/Login";
import { Toast } from "@/components/Toast";
import { CartItem, useCart } from "@/hooks/useCart";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useState } from "react";

export default function Cart() {
  const { cart, emptyCart } = useCart();
  const { data: session } = useSession();
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>();
  const [showLogin, setShowLogin] = useState(false);

  function handleCheckout() {
    setLoading(true);
    setToastMessage("Checkout successful!");

    //fake loading
    setTimeout(() => {
      setToastVisible(true);
      setLoading(false);
      emptyCart();
    }, 200);
  }

  function handleToggleLogin() {
    setShowLogin((login) => !login);
  }

  return (
    <div className="flex flex-col gap-10">
      {toastVisible && (
        <Toast
          message={"Items bought!"}
          onClose={() => setToastVisible(false)}
        />
      )}
      <div className="flex flex-col gap-5">
        {cart.map((item) => (
          <Item {...item} />
        ))}
      </div>
      {session ? (
        <Button
          text="Go to checkout"
          action={handleCheckout}
          variant="checkout"
        />
      ) : (
        <div className="flex flex-col">
          <Button
            text="Login to checkout"
            action={handleToggleLogin}
            variant="checkout"
          />
          {showLogin && <Login isDropdown={false} />}
        </div>
      )}
    </div>
  );
}

const Item = ({ id, title, quantity }: CartItem) => {
  const { addProduct, removeProduct } = useCart();
  return (
    <div className="flex flex-row gap-5 items-center">
      <div className="p-5 border-[1px] border-gray-500 rounded-lg">
        <label>
          Id: {id} Title: {title}
        </label>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <Button text={"-"} action={() => removeProduct(id)} variant={"cart"} />
        <label className="font-bold">{quantity}</label>
        <Button
          text={"+"}
          action={() => addProduct(id, title)}
          variant={"cart"}
        />
      </div>
    </div>
  );
};

const buttonVariants = {
  cart: "bg-gray-400 text-white h-8 w-8 ",
  checkout: "bg-gray-400 text-white py-2",
};

type ButtonProps = {
  text: string;
  action: () => void;
  variant?: keyof typeof buttonVariants;
};
export function Button({ text, action, variant }: ButtonProps) {
  return (
    <button
      className={`rounded-lg ${variant ? buttonVariants[variant] : ""}`}
      onClick={action}
    >
      {text}
    </button>
  );
}
