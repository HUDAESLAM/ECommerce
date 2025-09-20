import { Product } from "./product";

export interface Order {
  product: {
    imageCover: string;
    title: string;
    price: number;
  };
  _id: string;
  user: string;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card"; 
  isPaid: boolean;
  isDelivered: boolean;
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  createdAt: string; 
  updatedAt: string; 
  id: number;
  __v: number;
}

export interface CartItem {
  _id: string;
  product: Product; 
  count: number;
  price: number;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}