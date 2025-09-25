'use client'
import React, { useRef, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation";
import { getUserToken } from '@/Helpers/getUserToken/getUserToken'

export default function DialogDetail({ cartId }: { cartId: string  }) {
  console.log("Dialog cartId:", cartId);

  const [loading, setLoadig] = useState<boolean>(false);
  const [Load, setLoad] = useState<boolean>(false);
  const detailsInput = useRef<HTMLInputElement | null>(null);
  const cityInput = useRef<HTMLInputElement | null>(null);
  const phoneInput = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  
  // CheckOut
  async function checkOutSession(cartId: string) {
    setLoadig(true)
    const token = await getUserToken()
    const shippingAddress = {
      details: detailsInput.current?.value,
      city: cityInput.current?.value,
      phone: phoneInput.current?.value
    }
    console.log(shippingAddress);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/orders/checkout-session/${cartId}?url=${process.env.NEXT_PUBLIC_URL_API}`,
      {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
          token:token+'',
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
console.log(data);

    if (data.status == "success") {
      location.href = data.session.url
    }
    setLoadig(false)
  }

  // Cash
  async function CashPayment() {
    if (!cartId) {
    toast.error("Cart ID is missing!");
    return;
  }
    setLoad(true);
    const shippingAddress = {
      details: detailsInput.current?.value,
      city: cityInput.current?.value,
      phone: phoneInput.current?.value,
    };

    try {
        const token = await getUserToken()

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/orders/${cartId}`,
        {
          method: "POST",
          body: JSON.stringify({ shippingAddress }),
          headers: {
            token:token+'',
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log("Cash order response:", data);

      if (data.status === "success") {
        toast("✅ Cash order created successfully!");
        localStorage.setItem("lastOrder", JSON.stringify(data.data));
        router.push("/cash");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error creating cash order:", error);
    } finally {
      setLoad(false);
    }

  }


  return <>
    <Dialog >
      <form>
        <DialogTrigger asChild>
          <Button className="w-full mt-5 cursor-pointer">Proceed to Checkout</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Shipping Adress</DialogTitle>
            <DialogDescription>
              Please add Shipping Adress
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="city">City</Label>
              <Input id="city" ref={cityInput} required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="details">Details</Label>
              <Input id="details" ref={detailsInput} required/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone">phone</Label>
              <Input id="phone" ref={phoneInput} required/>
            </div>


          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className='cursor-pointer'>Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer"
              onClick={CashPayment}
            >
              {Load && <Loader className="animate-spin" />} Cash
            </Button>
            <Button type="submit" className='cursor-pointer' onClick={() => checkOutSession(cartId!)}>{loading && <Loader className='animate-spin' />}Visa</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  </>


}