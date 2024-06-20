import { CartItemType, Order, Product, ShippingInfo, User } from "./types";

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type AllUsersResponse = {
  success: boolean;
  users: User[];
};

//get user as response
export type UserResponse = {
  success: boolean;
  user: User;
};

export type DeleteUserRequest = {
  userId: string;
  adminUserId: string;
};

export type AllProductResponse = {
  success: boolean;
  products: Product[];
};

export type CategoriesResponse = {
  success: boolean;
  categories: string[];
};

export type SearchProductResponse = {
  success: boolean;
  products: Product[];
  totalPage: number;
};
export type SearchProductArgument = {
  price: number;
  page: number;
  category: string;
  sort: string;
  search: string;
};

export type ProductResponse = {
  success: boolean;
  singleProduct: Product;
};

export type NewProductRequest = {
  id: string;
  formData: FormData;
};

export type UpdateProductRequest = {
  userId: string;
  productId: string;
  formData?: FormData;
  stock?: number; 
};

export type DeleteProductRequest = {
  userId: string;
  productId: string;
};

export type NewOrderRequest = {
  shippingInfo: ShippingInfo;
  orderItems: CartItemType[];
  subtotal: number;
  shippingCharges: number;
  // tax: number;
  discount: number;
  total: number;
  user: string;
};

export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};

export type AllOrdersResponse = {
  success: boolean;
  orders: Order[];
};

export type OrderDetailsResponse = {
  success: boolean;
  order: Order;
};


export type NewCouponRequest = {
  id:string;
  code: string;
  amount: number;
};