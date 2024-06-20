import { CartItemType, ShippingInfo, User } from "./types";

export interface userReducerInitialState {
  user: User | null;
  loading: boolean;
}

export interface cartReducerInitialState {
  loading: boolean;
  cartItems: CartItemType[];
  subtotal: number;
  shippingCharges: number;
  // tax: number;
  discount: number;
  total: number;
  shippingInfo: ShippingInfo;
}
