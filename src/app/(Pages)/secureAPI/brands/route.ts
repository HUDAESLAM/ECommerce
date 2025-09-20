import { Brand} from "@/interfaces";
import { NextResponse } from "next/server";

export async function GET() {
  const res =await fetch('https://ecommerce.routemisr.com/api/v1/brands')

  const data : Brand[] = await res.json();

    return NextResponse.json(data);
}

