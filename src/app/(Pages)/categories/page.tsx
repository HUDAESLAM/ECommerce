import formatDate from "@/Helpers/formatDate";
import { Category } from "@/interfaces/category";
import Image from "next/image";
import Link from "next/link";


export default async function CategoryDetails() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/categories`);
  const json = await response.json();
  const data: Category[] = json.data; 

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {data?.map((category) => (
          <Link href={"/categories/" + category._id} key={category._id}>
            <>
              <div

                className="h-full cursor-pointer relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <Image
                  src={category.image}
                  height={600}
                  width={600}
                  alt={category.name}
                  className=" object-cover w-full h-80 "
                />
                <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded ">
                  {formatDate(category.createdAt)}
                </span>
                <h2 className="text-lg font-semibold mt-2 p-2">
                  {category.name.split(" ", 1)}
                </h2>
                <p className=" bg-white text-black text-xs px-2 py-1 ">
                  Last Updated at : {formatDate(category.updatedAt)}
                </p>
                <h3 className="text-center my-2">{category.slug}</h3>
              </div>
            </>
          </Link>
        ))}
      </div>
    </>
  );
  // <div className="container mx-auto py-10">
  //   <h2 className="text-xl font-semibold mt-10">Subcategory Details</h2>
  //   <div className="p-4 border rounded-lg shadow-sm mt-4">
  //     {/* <h3 className="font-medium">{data.createdAt}</h3> */}
  //     {/* <p className="text-sm text-gray-500">{data.slug}</p> */}
  //     {/* <p className="text-sm text-gray-400">ID: {data._id}</p> */}
  //   </div>
  // </div>
}
