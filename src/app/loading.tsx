import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">

<div className="flex items-center justify-center gap-2">
      <span className="border text-white font-bold bg-black py-3 px-5 text-2xl">S</span>
      <h1 className="text-4xl font-bold text-black">ShopMart</h1>
</div>
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-300 border-t-black animate-spin"></div>

        <div className="absolute inset-2 rounded-full border-4 border-gray-300 border-b-black animate-[spin_1.5s_linear_reverse_infinite]"></div>
      </div>
    </div>
  );
}
