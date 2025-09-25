import { BrandResponse } from "@/interfaces";
import Image from "next/image";
import React from "react";

export default async function page({
  params,
}: {
  params: { brandId: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}/brands/${params.brandId}`
  );

  const  {data} : BrandResponse  = await res.json();

  console.log(data);

  return <>
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md text-center">
          <Image
          height={600}
          width={600}
            src={data.image}
            alt={data.name}
            className="w-32 h-32 object-contain mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
          <p className="text-gray-500 mb-4">Slug: {data.slug}</p>
          <p className="text-sm text-gray-400">
            Created: {new Date(data.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-400 mb-5">
            Updated: {new Date(data.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </>
}
