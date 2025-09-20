import { Brand } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function Brands() {

  const res = await fetch('http://localhost:3000/secureAPI/brands')
  const json = await res.json();
  const data: Brand[] = json.data;

  console.log(data);

  return <>
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Our Brands</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {data.map((brand) => (
          <Link href={'/brands/' + brand._id} key={brand._id}>
            <div
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center justify-center text-center"
            >
              <Image
                width={600}
                height={600}
                src={brand.image}
                alt={brand.name}
                className="w-20 h-20 object-contain mb-4"
              />
              <h2 className="text-lg font-semibold">{brand.name}</h2>
              <p className="text-gray-500 text-sm">{brand.slug}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>

  </>
}
