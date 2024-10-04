"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Login from "./Login";
import dynamic from "next/dynamic";
import { Button } from "./Button";

const Cart = dynamic(() => import("../components/cart/HeaderCart"), {
  ssr: false,
});

export function Header() {
  const { data: sessionData } = useSession();
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  function toggleShowLoginDropdown() {
    setShowLoginDropdown((prev) => !prev);
  }

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
          <Cart />
          {sessionData ? (
            <div className="flex gap-5 items-center justify-center">
              <label className="text-white">{sessionData.user.firstName}</label>
              <Button
                className="flex flex-col gap-1 justify-center items-center text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
                onClick={async () => {
                  await signOut({ redirect: true, callbackUrl: "/" });
                }}
                text="Logout"
              />
            </div>
          ) : (
            <div>
              <Button
                className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded h-full"
                onClick={toggleShowLoginDropdown}
                text="Login"
              />
              {showLoginDropdown && <Login isDropdown />}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
