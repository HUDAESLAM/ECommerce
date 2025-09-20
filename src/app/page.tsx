import { Button } from "@/components/ui/button";
import { LucidePackage2, Package, Package2, ShoppingBag, ShoppingBasket, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="containar flex flex-col justify-center items-center min-h-[80vh] ">
        <h1 className="text-center font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl">Welcome in ShopMart!</h1>
        <p className="text-center py-3 font-semibold text-gray-600">Your ultimate destination for smart and easy shopping!<br/> Discover a wide range of products, from electronics and fashion to home essentials,<br/> all at competitive prices. Enjoy a fast, secure, and seamless shopping experience, with everything you need in one place.</p>
        <div className="flex gap-3">
          
          <Button className="bg-black text-white hover:bg-white hover:text-black "><Link href={'./products'}>ShopNow </Link><ShoppingCart/></Button>
          
          <Button className="bg-white text-black hover:bg-black hover:text-white border-black border-2"><Link href={'./categories'}>Go to Categories</Link><LucidePackage2/></Button>
        </div>
      </div>
    </>
  );
}
