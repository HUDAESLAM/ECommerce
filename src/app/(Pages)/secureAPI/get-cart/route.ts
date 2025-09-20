import { getUserToken } from "@/Helpers/getUserToken/getUserToken";
import { CartResponse } from "@/interfaces";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getUserToken()
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "GET",
      headers: {
        token:token + '',
      },
    });
    const data: CartResponse = await res.json();

    return NextResponse.json(data);
}