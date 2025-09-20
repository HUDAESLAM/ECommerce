import { Product } from "@/interfaces";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "@/app/_Components/AddToCart/AddToCart";

export default async function Products() {
  const response = await fetch(
    `${process.env.URL_API}/products`,
    {
      method: "GET",
    }
  );
  const json = await response.json();
  const data: Product[] = json.data;
  console.log(data);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((product) => (
          <div key={product.id} className="h-full">
            <Card>
              <Link href={"/products/" + product.id}>
                <Image
                  className="w-full object-cover"
                  src={product.imageCover}
                  alt="imagecover"
                  width={300}
                  height={300}
                />
                <CardHeader className="py-2">
                  <CardTitle>{product.title.split("", 5)}</CardTitle>
                  <CardDescription>{product.category.name}</CardDescription>
                  <CardAction>{product.brand.name}</CardAction>
                </CardHeader>
                <CardContent>
                  <div className="flex ">
                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5 text-yellow-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="ml-2">{product.ratingsAverage}</p>
                  </div>
                  <p className="pt-2 ps-1">
                    Price:{" "}
                    <span className="font-bold">{product.price} EGP</span>
                  </p>
                </CardContent>
              </Link>
              <AddToCart productId={product.id} />
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
