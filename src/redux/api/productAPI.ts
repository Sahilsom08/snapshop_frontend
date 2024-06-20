import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllProductResponse,
  CategoriesResponse,
  DeleteProductRequest,
  MessageResponse,
  NewProductRequest,
  ProductResponse,
  SearchProductArgument,
  SearchProductResponse,
  UpdateProductRequest,
} from "../../types/apiTypes";

export const productAPI = createApi({
  reducerPath: "productApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes: ["product"], //caching
  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductResponse, string>({
      query: () => "latest-products",
      providesTags: ['product'],
    }),

    AllProducts: builder.query<AllProductResponse, string>({
      query: (id) => `admin-products?id=${id}`,
      providesTags: ["product"],
    }),

    Categories: builder.query<CategoriesResponse, string>({
      query: () => `categories`,
      providesTags: ["product"],
    }),

    SearchProducts: builder.query<SearchProductResponse, SearchProductArgument>(
      {
        query: ({ price, search, sort, category, page }) => {
          let base = `all?search=${search}&page=${page}`;

          if (price) base += `&price=${price}`;
          if (sort) base += `&sort=${sort}`;
          if (category) base += `&category=${category}`;

          return base;
        },
        providesTags: ["product"],
      }
    ),

    ProductDetails: builder.query<ProductResponse, string>({
      query: (id) => id,
      providesTags: ["product"],
    }),

    AddNewProduct: builder.mutation<MessageResponse, NewProductRequest>({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    UpdateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
      query: ({ formData, userId, productId ,stock}) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: formData ? formData : stock ,
      }),
      invalidatesTags: ["product"],
    }),

    DeleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
      query: ({ userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useProductDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddNewProductMutation,
} = productAPI;
