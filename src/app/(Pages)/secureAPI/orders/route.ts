import { getUserToken } from "@/Helpers/getUserToken/getUserToken";
import { Order } from "@/interfaces/order";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "UserId is required" }, { status: 400 });
  }
  const token = await getUserToken()


  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      method: "GET",
      headers: {
        token:token+'',
      },
    }
  );
  const data: Order[] = await res.json();


  return NextResponse.json(data);
}
