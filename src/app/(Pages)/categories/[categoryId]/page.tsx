import { SubCategory } from "@/interfaces";
import React from "react";

export default async function CategoryDetails({
  params,
}: {
  params: { categoryId: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}/categories/${params.categoryId}/subcategories`
  );
  const { data }: { data: SubCategory[] } = await res.json();

  console.log(data);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center justify-center mx-auto ">
      {data.map((sub) => (
        <div key={sub._id} className="p-4 border relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
          
          <h1 className="text-lg font-bold text-center mt-5">{sub.name}</h1>

          <p className="text-sm text-gray-700 text-center">{sub.slug}</p>
          <div className="text-center">
            <p className="text-sm text-gray-400">
            Created: {new Date(sub.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-400">
            Updated: {new Date(sub.updatedAt).toLocaleDateString()}
          </p>
          </div>
        </div>
      ))}
    </div>
  );
}
