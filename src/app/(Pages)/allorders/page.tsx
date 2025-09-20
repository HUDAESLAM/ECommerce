'use client'
import { Order } from '@/interfaces/order';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'


export default function AllOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function getOrder() {
  try {
    const userId = localStorage.getItem("userId");
    const res = await fetch(`${process.env.URL_API}/orders/${userId}/`);
    const data: Order[] = await res.json();
    setOrders(data);
    console.log(data);
  } catch (error) {
    console.error("Error fetching orders", error);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    getOrder()
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader className="animate-spin rounded-full h-12 w-12 border-b-2 text-blue-600"></Loader>
      </div>
    );
  }


  return <>
    <div className="container mx-auto px-4 my-4">
      <h2 className="text-2xl font-bold mb-6">📦 My Orders</h2>
      {
        orders.length === 0 ? (<p>No Orders Found!</p>) : (

          orders.map((order) => (
            // Details
            <div key={order._id} className='bg-white shadow-md rounded-lg mb-6 border relative'>
              <div className="p-5">
                <h5 className="text-lg font-semibold mb-2">
                  Order -{" "}
                  <span className="uppercase">{order.paymentMethodType}</span>
                  <span className='absolute top-2 end-2 bg-black/50 rounded text-sm p-1'>ID : {order.id}</span>
                </h5>
                <p className="text-gray-600 mb-2">
                  Status:{" "}
                  {order.isPaid ? (
                    <span className="text-green-600 font-medium">Paid</span>
                  ) : (
                    <span className="text-red-600 font-medium">Unpaid</span>
                  )}
                  {" | "}
                  {order.isDelivered ? (
                    <span className="text-green-600 font-medium">Delivered</span>
                  ) : (
                    <span className="text-yellow-600 font-medium">Delivery is in progress</span>
                  )}
                </p>
                <p className="mb-2">
                  Total:{" "}
                  <span className="font-semibold text-blue-600">
                    {order.totalOrderPrice} EGP
                  </span>
                </p>
                <p className="mb-2 text-gray-700">
                  Shipping to:{" "}
                  <span className="font-medium">{order.shippingAddress?.city}</span>{" "}
                  - {order.shippingAddress?.phone}
                </p>

                {/* Products */}
                <div className="mt-4">

                  <h6 className="font-semibold mb-2">🛒 Products:</h6>
                  <ul className="space-y-2">
                    {order.cartItems.map((item) => (
                      <li key={item._id} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg border">
                        <div className="flex items-center">
                          <Image
                            src={item.product.imageCover}
                            alt={item.product.title}
                            className="w-12 h-12 object-cover rounded mr-3"
                            width={500}
                            height={500}
                          />
                          <span className="text-sm">{item.product.title.slice(0, 30)}</span>
                        </div>
                        <span className="text-sm font-medium">
                          {item.count} x {item.price} EGP
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-gray-100 text-gray-600 text-sm px-5 py-2 rounded-b-lg">
                Created at: {new Date(order.createdAt).toLocaleDateString()}
              </div>
            </div>

          ))
        )
      }
    </div>
  </>

}

