"use client";

import "./globals.css";
import Provider from "./providers/Provider";
import { FilterProvider } from "@/context/FilterContext";
import dynamic from "next/dynamic";

const NoSSRHeader = dynamic(() => import("../components/Header"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <NoSSRHeader />
          <FilterProvider>
            <main className="pt-20 flex flex-grow h-full">{children}</main>
          </FilterProvider>
        </Provider>
      </body>
    </html>
  );
}
