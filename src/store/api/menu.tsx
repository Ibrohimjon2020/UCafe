import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  MenuItemInterface,
  MenuItemListInterface,
  MenuTypeListInterface,
} from "@/interface/menu";

type menuPropType = number | undefined;
type itemPropTYpe = {
  page?: number;
  type?: number;
  status?: number;
};

type imageResType = {
  path: string;
};

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("_tn")}`,
      Accept: "application/json",
    },
  }),
  tagTypes: ["Menu-Item"],
  endpoints: (builder) => ({
    getMenuTypes: builder.query<MenuTypeListInterface, menuPropType>({
      query: (page) => `/menu-type?page=${page || 1}`,
    }),
    getMenuItems: builder.query<MenuItemListInterface, itemPropTYpe>({
      query: ({ page, type, status }) =>
        `/menu-item?type_id=${type || ""}&page=${page || 1}${
          status ? `&status=${status}` : ""
        }`,
      providesTags: ["Menu-Item"],
    }),
    getMenuItem: builder.query<MenuItemInterface, number | null>({
      query: (id) => `/menu-item/${id}`,
    }),
    deleteMenuItem: builder.mutation({
      query: (id: number) => ({
        url: `/menu-item/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Menu-Item"],
    }),
    updateMenuItem: builder.mutation({
      query: ({
        id,
        title,
        price,
        quantity,
        image,
        menu_type_id,
        status,
      }: MenuItemInterface) => ({
        url: `/menu-item/${id}/`,
        method: "PUT",
        body: {
          title,
          price,
          quantity,
          image,
          menu_type_id,
          status,
        },
      }),
      invalidatesTags: ["Menu-Item"],
    }),
    addMenuItem: builder.mutation({
      query: ({ title, price, quantity, image, menu_type_id, status }) => ({
        url: `/menu-item/`,
        method: "POST",
        body: {
          title,
          price,
          quantity,
          image,
          menu_type_id,
          status,
        },
      }),
      invalidatesTags: ["Menu-Item"],
    }),
    addImage: builder.mutation<imageResType, FormData>({
      query: (data) => ({
        url: "/upload-file/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMenuTypesQuery,
  useGetMenuItemsQuery,
  useGetMenuItemQuery,
  useDeleteMenuItemMutation,
  useUpdateMenuItemMutation,
  useAddMenuItemMutation,
  useAddImageMutation,
} = menuApi;
