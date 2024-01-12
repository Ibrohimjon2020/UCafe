import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//
import { RolesListInterface, StaffListInterface } from "@/interface/staff";

type StaffPropType = { page?: number };

export const staffApi = createApi({
  reducerPath: "staffApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("_tn")}`,
      Accept: "application/json",
    },
  }),
  tagTypes: ["Staff"],
  endpoints: (builder) => ({
    getAllStaffs: builder.query<StaffListInterface, StaffPropType>({
      query: ({ page }) => `/staff?page=${page || 1} `,
      providesTags: ["Staff"],
    }),
    getStaffRoles: builder.query<RolesListInterface, void>({
      query: () => `/roles`,
    }),
    updateStaff: builder.mutation({
      query: ({ id, name, login, role, staff_status, password }) => ({
        url: `/staff/${id}`,
        method: "PUT",
        body: {
          name,
          login,
          role,
          staff_status,
          password,
        },
      }),
      invalidatesTags: ["Staff"],
    }),
    addStaff: builder.mutation({
      query: (data) => ({
        url: "/staff/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),
  }),
});

export const {
  useGetAllStaffsQuery,
  useGetStaffRolesQuery,
  useUpdateStaffMutation,
  useAddStaffMutation,
} = staffApi;
