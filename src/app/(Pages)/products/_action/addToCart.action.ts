"use server";

import { getUserToken } from "@/Helpers/getUserToken/getUserToken";

export async function AddToCartAction(productId: string) {
  const token = await getUserToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/cart`, {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: {
      token: token + "",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
