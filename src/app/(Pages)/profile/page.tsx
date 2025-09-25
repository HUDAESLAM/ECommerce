"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function ProfilePage() {
  const session = useSession()
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center  dark:bg-gray-900 p-6">

      {/* Card */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-10 max-w-md w-full text-center">
        <div className="flex justify-center gap-1 items-center mb-4">
          <h1 className=" font-bold text-gray-800 dark:text-gray-100">
          Welcome Back
        </h1>
        {session.status === "authenticated" && (
          <h1 className=" font-bold text-gray-800">{session.data?.user.name}!</h1>
        )}
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We are glad to see you here. Explore your account and see our Products.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="px-6 py-2 text-white rounded- transition">
            <Link href={'/products'}>
              Shopping
            </Link>
          </Button>
          <Button
            className="px-6 py-2 text-white rounded-md bg-red-600 hover:bg-red-700 transition cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm max-w-md">
        Tip: Check out new arrivals and special offers in the Products section.
      </div>
    </div>
  );
}
