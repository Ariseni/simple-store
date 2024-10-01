"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return router.replace("/login");
  }

  return (
    <div className="pt-20 bg-red-500">Welcome, {session.user.username}!</div>
  );
}
