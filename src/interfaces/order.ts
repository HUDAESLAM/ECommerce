export interface Order {
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
  product: string; 
  count: number;
  price: number;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}