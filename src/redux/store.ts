import { configureStore } from "@reduxjs/toolkit";
import { couponApi } from "./api/couponAPI";
import { orderApi } from "./api/orderAPI";
import { productAPI } from "./api/productAPI";
import { userAPI } from "./api/userAPI";
import { cartReducer } from "./reducer/cartReducer";
import { userReducer } from "./reducer/userReducer";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  // middleware: (getDefaultMiddleware) => [
  //   ...getDefaultMiddleware(),
  //   userAPI.middleware,
  // ],

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userAPI.middleware,
      productAPI.middleware,
      orderApi.middleware,
      couponApi.middleware
    ),
});

export type Rootstate = ReturnType<typeof store.getState>;
