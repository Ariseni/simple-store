"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <header className="fixed p-4 h-20 bg-blue-500 w-full top-0 z-10">
      <nav className="flex justify-between items-center">
        <Link href="/" passHref>
          <button className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded">
            Home
          </button>
        </Link>

        <Link href="/products" passHref>
          <button className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded">
            Products
          </button>
        </Link>
        {!!sessionData && (
          <Link href="/cart" passHref>
            <button className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded">
              Cart
            </button>
          </Link>
        )}
        {sessionData ? (
          <button
            className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
            onClick={async () => {
              await signOut({ redirect: true, callbackUrl: "/" });
            }}
          >
            Logout
          </button>
        ) : (
          <Link href="/login" passHref>
            <button className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded">
              Login
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
