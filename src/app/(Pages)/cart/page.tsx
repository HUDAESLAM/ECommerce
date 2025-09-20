"use client";
import { CartContext } from "@/app/_Components/context/CartContext";
import Loading from "@/app/loading";
import { formatCurrency } from "@/Helpers/formatPrice";
import { CartResponse } from "@/interfaces/cart";
import { Loader2, Trash2Icon } from "lucide-react";
import Image from "next/image";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DialogDetail from "@/app/_Components/CheckOut/CheckOut";
import { getUserToken } from "@/Helpers/getUserToken/getUserToken";



export default function Cart() {
  const { cartData, isLoading, setCartData, getCart } = useContext(CartContext);
  const [removingId, IsRemovingId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState<boolean>(false);

  if (typeof cartData?.data.products[0]?.product === "string" || cartData == null) {
    getCart();
  }

  // Remove
  async function removeCartItem(productId: string) {
    IsRemovingId(productId);
    const token = await getUserToken()

    const res = await fetch(
      `${process.env.URL_API}/cart/` + productId,
      {
        method: "DELETE",
        headers: {
          token:token+'',
        },
      }
    );

    const data: CartResponse = await res.json();
    
    if (data.status === "success") {
      toast.success("Product Removed Successfully");
      setCartData(data);
    }
    IsRemovingId(null);
  }
  // Update
  async function updateCartItemCount(productId: string, count: number) {
    if (count === 0) {
      removeCartItem(productId);
    } else {
      setIsUpdating(productId);
      const token =await  getUserToken()
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
        {
          method: "PUT",
          body: JSON.stringify({ count }),
          headers: {
            token:token + '',
            "Content-Type": "application/json",
          },
        }
      );

      const data: CartResponse = await res.json();
      if (data.status === "success") {
        toast.success("Cart updated successfully");
        setCartData(data);
      }
    }
    setIsUpdating(null);
  }
  // Clear
  async function clearCartItem() {
    setIsClearing(true);
    const token = await getUserToken()
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "DELETE",
      headers: {
        token:token + '',
      },
    });
    const data: CartResponse = await res.json();
    if (data.message === "success") {
      setCartData(null);
    }
    setIsClearing(false);
  }

  

  return (
    <>
      {isLoading || typeof cartData?.data.products[0]?.product === "string" ?
        <Loading />
        : (cartData?.numOfCartItems ?? 0) > 0 ?
          <div className="container mx-auto px-4 py-5">
            <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
            <p className="text-muted-foreground mt-1">
              {cartData?.numOfCartItems} Items in your cart
            </p>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start mt-6">
              {/* Items Column */}
              <div className="lg:col-span-2 space-y-4">
                {cartData?.data.products.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card"
                  >
                    <Image
                      className="w-24 h-24 rounded-lg object-cover md:w-28 md:h-28"
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={600}
                      height={600}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                            {item.product.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.product.brand.name} ·{" "}
                            {item.product.category.name}
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="font-semibold">
                            {formatCurrency(item.price)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateCartItemCount(
                                item.product._id,
                                item.count - 1
                              )
                            }
                            aria-label="decrease"
                            className="size-8 rounded-lg border hover:bg-accent cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-medium">
                            {isUpdating === item.product._id ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              item.count
                            )}
                          </span>
                          <button
                            onClick={() =>
                              updateCartItemCount(
                                item.product._id,
                                item.count + 1
                              )
                            }
                            aria-label="increase"
                            className="size-8 rounded-lg border hover:bg-accent cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeCartItem(item.product._id)}
                          aria-label="remove"
                          className="text-destructive hover:underline text-sm cursor-pointer flex gap-2"
                        >
                          {removingId == item.product._id && (
                            <Loader2 className="animate-spin ms-2" />
                          )}
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Column */}
              <div className="lg:col-span-1 sticky top-18">
                <div className="rounded-xl border p-5 shadow-sm">
                  <h2 className="text-lg font-semibold">Order Summary</h2>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Subtotal ({cartData?.numOfCartItems} items)
                      </span>
                      <span className="font-semibold">
                        {formatCurrency(cartData!.data.totalCartPrice)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Shipping
                      </span>
                      <span className="text-emerald-600 font-medium">Free</span>
                    </div>
                  </div>

                  <div className="my-4 border-t">
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-base font-semibold">Total</span>
                      <span className="text-base font-bold">
                        {formatCurrency(cartData!.data.totalCartPrice!)}
                      </span>
                    </div>

                    <DialogDetail cartId={cartData?.cartId} />

                    <button className="w-full mt-5 h-11 rounded-xl border hover:bg-accent cursor-pointer">
                      <Link href={"/products"}>Continue Shopping</Link>
                    </button>
                  </div>
                  <Button
                    onClick={clearCartItem}
                    aria-label="clear"
                    variant={"outline"}
                    className="text-red-800 hover:bg-red-800 hover:text-white shadow transition-shadow w-full h-11 rounded-xl border flex gap-2 text-center items-center justify-center  cursor-pointer">
                    {isClearing ? <Loader2 className="animate-spin" /> : <Trash2Icon />}Clear Cart
                  </Button>
                </div>
              </div>
            </div>
          </div> : <div
            className="min-h-[60vh] flex justify-center items-center flex-col"
          >
            <h2 className="text-2xl mb-3">Your Cart Is Empty</h2>
            <Link href={'/products'}>
              <Button>
                <Link href={"/products"}>Add Ones</Link>
              </Button>

            </Link>
          </div>
      }
    </>
  );
}
