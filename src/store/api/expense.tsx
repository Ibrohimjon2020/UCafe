import { ExpenseListInterface } from "@/interface/expense";
import { queryStringify } from "@/utils/helpers/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type AllPropType = {
  page?: number;
  from_date?: string | null;
  to_date?: string | null;
};

export const expenseApi = createApi({
  reducerPath: "expenseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("_tn")}`,
      Accept: "application/json",
    },
  }),
  tagTypes: ["Expense"],
  endpoints: (builder) => ({
    getAllExpenses: builder.query<ExpenseListInterface, AllPropType>({
      query: (data) => `/expenses?${queryStringify(data)}`,
      providesTags: ["Expense"],
    }),
    deleteExpense: builder.mutation({
      query: (id: number) => ({
        url: `/expenses/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expense"],
    }),
    updateExpense: builder.mutation({
      query: ({ id, day, description, price }) => ({
        url: `/expenses/${id}/`,
        method: "PUT",
        body: {
          day,
          description,
          price,
        },
      }),
      invalidatesTags: ["Expense"],
    }),
    addExpense: builder.mutation({
      query: (data) => ({
        url: `/expenses/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Expense"],
    }),
  }),
});

export const {
  useGetAllExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApi;
