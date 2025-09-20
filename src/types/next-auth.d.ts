import { UserResponse } from "./../interfaces/authInterface";

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
  interface JWT extends User {iat?: number;}
}