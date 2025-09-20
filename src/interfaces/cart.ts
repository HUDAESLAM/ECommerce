import { Product } from "./product";

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
  cartId: string;
}

export interface CartProduct {
  count: number;
  _id: string;
  product: Product;
  price: number;
  
}

export interface CartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string | undefined;
  data: CartData;
}
