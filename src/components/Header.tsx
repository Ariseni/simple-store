"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Login from "./Login";
import { CartItem, useCart } from "@/hooks/useCart";

const Header = () => {
  const { data: sessionData } = useSession();
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  //cannot use useLocalStorage or useCart here due to it being prerendered on server
  //also wouldn't want to prevent SSR with dynamic import to avoid render delay
  useEffect(() => {
    const cartLocalStorage = localStorage.getItem("cart");
    if (cartLocalStorage) {
      setCart(JSON.parse(cartLocalStorage));
    }
  }, []);

  const toggleShowLoginDropdown = () => {
    setShowLoginDropdown((prev) => !prev);
  };

  // Calculate total quantity of items in the cart
  const totalQuantity =
    cart.reduce((acc: number, item: CartItem) => acc + item.quantity, 0) || 0;

  return (
    <header
      suppressHydrationWarning
      className="fixed p-3 h-20 bg-blue-500 w-full top-0 z-10"
    >
      <nav className="flex justify-between items-center">
        <Link
          href="/"
          passHref
          className="flex items-center text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 h-14 rounded"
        >
          <Image priority src={"/home.svg"} alt="Home" width={32} height={32} />
        </Link>
        <div className="flex gap-5">
          <Link
            href="/cart"
            passHref
            className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded flex items-center relative"
          >
            <Image
              priority
              src={"/cart.png"}
              alt="Cart"
              width={32}
              height={32}
            />
            <div className="flex justify-center items-center absolute w-4 h-4 rounded-full bg-red-500 top-[-4px] right-[-4px]">
              <label className="text-white text-sm">{totalQuantity}</label>
            </div>
          </Link>
          {sessionData ? (
            <div className="flex gap-5 items-center justify-center">
              <label className="text-white">{sessionData.user.firstName}</label>
              <button
                className="flex flex-col gap-1 justify-center items-center text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
                onClick={async () => {
                  await signOut({ redirect: true, callbackUrl: "/" });
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <button
                className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded h-full"
                onClick={toggleShowLoginDropdown}
              >
                Login
              </button>
              {showLoginDropdown && <Login />}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
