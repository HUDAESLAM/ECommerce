import  { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {  FaildUserResponse, SuccessLoginResponse, UserResponse } from "./interfaces";

export const authOptions : AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            "https://ecommerce.routemisr.com/api/v1/auth/signin",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          const payload : SuccessLoginResponse | FaildUserResponse = await res.json();

          if ("token" in payload) {
            return {
              id: payload.user.email,
              user: payload.user,
              token: payload.token,
            };
          } else {
            throw new Error(payload.message);
          }
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user as UserResponse;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error:'/login'
  },
  secret : process.env.NEXTAUTH_SECRET
};
