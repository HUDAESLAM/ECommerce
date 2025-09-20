import type { Metadata } from "next";
import "./globals.css";
import Provider from "./_Components/Provider/Provider";

export const metadata: Metadata = {
  title: "ShopMart",
  description: "Welcome to Shop Mart! We aim to provide a unique shopping experience combining quality, variety, and competitive prices. Whether you're looking for electronics, fashion, or home essentials, you'll find everything you need easily and quickly. Enjoy a seamless and secure shopping journey with dedicated customer support to ensure your complete satisfaction.",
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
