import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  OrderCardInterface,
  OrderCardListInterface,
  OrderColumnListInterface,
  OrderListInterface,
  OrderPaymentListInterface,
} from "@/interface/order";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("_tn")}`,
      Accept: "application/json",
    },
  }),
  tagTypes: ["Order", "Order-Id"],
  endpoints: (builder) => ({
    getPayment: builder.query<OrderPaymentListInterface, void>({
      query: () => `/payment_types`,
    }),
    createOrder: builder.mutation({
      query: (data: OrderListInterface) => ({
        url: "/orders",
        method: "Post",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
    getOrderColumns: builder.query<OrderColumnListInterface, void>({
      query: () => `/order_columns`,
    }),
    getOrderList: builder.query<OrderCardInterface[], void>({
      query: () => `/orders?all=1`,
      providesTags: ["Order"],
    }),
    getOrderById: builder.query<OrderCardInterface, number>({
      query: (id) => `/orders/${id}`,
      providesTags: ["Order-Id"],
    }),
    getOrderHistoryList: builder.query<OrderCardListInterface, void>({
      query: () => `/orders`,
    }),
    updateStatus: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Order", "Order-Id"],
    }),
  }),
});

export const {
  useGetPaymentQuery,
  useGetOrderColumnsQuery,
  useGetOrderByIdQuery,
  useGetOrderListQuery,
  useCreateOrderMutation,
  useUpdateStatusMutation,
  useUpdateOrderMutation,
} = orderApi;
