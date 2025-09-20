"use client";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { HeartIcon, Loader2, ShoppingCartIcon } from "lucide-react";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";
import { AddToCartAction } from "@/app/(Pages)/products/_action/addToCart.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { useRouter } from "nex";

export default function AddToCart({ productId }: { productId: string }) {
  const [loading, setIsLoading] = useState(false);
  const { setCartData } = useContext(CartContext);
  const session = useSession();
  const router = useRouter();

  async function AddProductToCart() {
    if(session.status == 'authenticated'){
      setIsLoading(true);
    const data = await AddToCartAction(productId)

    if (data.status === "success") {
      setCartData(data);
      toast.success(data.message);
    }

    setIsLoading(false);
    console.log(data);
    }else{
      router.push('/login')
    }
  }

  return (
    <>
      <CardFooter className="flex justify-between items-center gap-1">
        <Button
          onClick={AddProductToCart}
          className="grow md:grow-0 px-8 cursor-pointer"
          disabled={loading}
        >
          {" "}
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <ShoppingCartIcon />
          )}{" "}
          Add to Cart
        </Button>
        <HeartIcon className="cursor-pointer" />
      </CardFooter>
    </>
  );
}
