"use client";

import { Button } from "@/components/Button";
import { CartItem } from "@/components/cart/CartItem";
import Login from "@/components/Login";
import { Toast } from "@/components/Toast";
import { useCart } from "@/hooks/useCart";
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
    <div className="flex flex-col gap-10 mt-28 px-5 w-full items-center">
      {toastVisible && (
        <Toast message={toastMessage} onClose={() => setToastVisible(false)} />
      )}
      <div className="flex flex-col items-center w-full max-w-[600px] gap-5">
        <div className="flex flex-col gap-5 w-full">
          {cart.map((item) => (
            <CartItem {...item} />
          ))}
        </div>
        {session ? (
          <Button
            text="Go to checkout"
            onClick={handleCheckout}
            variant="checkout"
            disabled={loading}
            className="w-full"
          />
        ) : (
          <div className="flex flex-col w-full">
            <Button
              text="Login to checkout"
              onClick={handleToggleLogin}
              variant="checkout"
              disabled={loading}
              className="w-full"
            />
            {showLogin && <Login isDropdown={false} />}
          </div>
        )}
      </div>
    </div>
  );
}
