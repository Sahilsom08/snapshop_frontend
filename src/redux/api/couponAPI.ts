import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponse, NewCouponRequest } from "../../types/apiTypes";

export const couponApi = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/payment/coupon/`,
  }),
  endpoints: (builder) => ({
    NewCoupon: builder.mutation<MessageResponse, NewCouponRequest>({
      query: ({ amount,code, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: {amount,code}
      }),
    }),
  }),
});

export const {useNewCouponMutation} = couponApi;
