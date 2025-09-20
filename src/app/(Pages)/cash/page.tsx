'use client'
import { Order } from '@/interfaces/order';
import React, { useEffect, useState } from 'react'
import { CheckCircle, Package } from "lucide-react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CashPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("lastOrder");
    if (saved) {
      setOrder(JSON.parse(saved));
    }
  }, []);

  if (!order) {
    return <p className="text-center mt-10">There is No Orders</p>;
  }

  return (
    <div className="container mx-auto p-8 relative">
      {/* Header */}
      <div className="text-center mb-8">
        <CheckCircle className="mx-auto text-green-500 w-16 h-16" />
        <h1 className="text-3xl font-bold mt-4">
          Order Created Successfully 
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase! Your order has been placed.
        </p>
      </div>

      {/* Order Info */}
      <div className="bg-gray-50 rounded-xl shadow-md p-6 mb-8 ">
        <p className="mb-2 font-semibold ">
          Order ID: <span className="text-gray-700 ">{order.id}</span>
        </p>
        <p className="mb-2 flex items-center gap-2">

          Payment Method:{" "}
          <span className="font-medium capitalize">
            {order.paymentMethodType}
          </span>
        </p>

        <p className="mb-2 flex items-center gap-2">
          Shipping to:{" "}
          <span>
            {order.shippingAddress.city}, {order.shippingAddress.details}
          </span>
        </p>
        <p className="mb-2 flex items-center gap-2">
          Phone : {" "}{order.shippingAddress.phone}
        </p>
        <p className="mb-2 flex items-center gap-2">
          Shipping Price : {order.shippingPrice}
        </p>
        <p className="mb-2 flex items-center gap-2">
          Tax Price : {order.taxPrice}
        </p>
        <p className="mb-2 font-semibold text-lg">
          Total:{" "}
          <span className="text-green-600">{order.totalOrderPrice} EGP</span>
        </p>

        {/* Status */}
        <div className="flex gap-4 mt-4 ">
          <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 me-auto">
            {order.isPaid ? "Paid ✅" : "Not Paid ❌"}
          </span>
          <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 ">
            {order.isDelivered ? "Delivered 📦" : "Processing ⏳"}
          </span>
        </div>
      </div>

      {/* Items */}
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        Items in Your Order<Package className="w-6 h-6 " />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {order.cartItems.map((item) => (
          <div
            key={item._id}
            className="border rounded-xl shadow-lg p-5 bg-white hover:shadow-xl transition"
          >
            {/* <p className="font-semibold">🆔 Product ID: {item.product}</p> */}
            <p>📦 Count: {item.count}</p>
            <p className="text-green-600 font-semibold">
              💰 Price: {item.price} EGP
            </p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4 mt-10">
        <Button className=" text-white px-6 py-5 rounded-xl shadow">
          <Link href={'/products'}>Continue Shopping 🛍️</Link>
        </Button>

      </div>
    </div>
  );
}
