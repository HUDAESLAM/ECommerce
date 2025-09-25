"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const token =  (await cookies()).get("next-auth.session-token")?.value ||
    (await cookies()).get("__Secure-next-auth.session-token")?.value;
  if (!token) return null;

  const accessToken = await decode({
    token,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  

  return accessToken?.token;
}
