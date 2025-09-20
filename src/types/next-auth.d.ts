import { UserResponse } from "./../interfaces/authInterface";
import  {JWT}  from "next-auth/jwt"
import NextAuth, { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: UserResponse;
  }
  interface User {
    token: string;
    user: UserResponse;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {}
}