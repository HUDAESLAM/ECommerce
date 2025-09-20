"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-6">
      
      
      <h1 className="text-2xl font-semibold text-red-500">Page not found !</h1>
      <h3 className="text-gray-600 mt-2 max-w-md mx-auto text-center">
        The page you are looking for might be removed, or is temporarily
        unavailable.
      </h3>
      <Link
        href="/"
        className="mt-8 inline-block  px-6 py-3 rounded-2xl shadow-lg transition-all duration-300 text-green-500 font-bold"
      >
        Back to Home
      </Link>
    </div>
  );
}
