import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type infoType = {
  login: string;
  password: string;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (info: infoType) => ({
        url: "/login-staff/",
        method: "POST",
        body: info,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
