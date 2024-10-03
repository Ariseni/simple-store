"use client";

import Header from "@/components/Header";
import "./globals.css";
import Provider from "./providers/Provider";
import { FilterProvider } from "@/context/FilterContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Header />
          <FilterProvider>
            <main className="flex flex-grow">{children}</main>
          </FilterProvider>
        </Provider>
      </body>
    </html>
  );
}
