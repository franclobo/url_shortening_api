import StoreProvider from "./storeProvider";
import DataProvider from "@/context/DataProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "URL Shortering",
  description: "Shorten your URL with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <DataProvider>
            {children}
          </DataProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
