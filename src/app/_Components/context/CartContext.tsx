"use client";
import { getUserToken } from "@/Helpers/getUserToken/getUserToken";
import { CartResponse } from "@/interfaces";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";


export const CartContext = createContext<{
  cartData: CartResponse | null;
  setCartData: (value: CartResponse | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  getCart: () => void;
}>({
  cartData: null,
  setCartData: () => { },
  isLoading: false,
  setIsLoading: () => { },
  getCart() { },
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const session = useSession()
  // const [userId, setUserId] = useState<string>('');
  async function getCart() {
    setIsLoading(true);
    const token = await getUserToken();
    if (session.status == 'authenticated') {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/cart/`,
          {
            headers: {
              token: token + "",
            },
          }
        );
      const data: CartResponse = await res.json();

      setCartData(data);
      if (data?.data.cartOwner) {
        localStorage.setItem("userId", data.data.cartOwner);
      }
      console.log(data);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [session.status]);
  return (
    <>
      <CartContext.Provider
        value={{ cartData, setCartData, isLoading, setIsLoading, getCart }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
