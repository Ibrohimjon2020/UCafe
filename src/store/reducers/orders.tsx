import { groupBy } from "lodash";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { orderIntial as initialState } from "@/constant/data/oders";
import { OrderCardInterface, OrderCardListInterface } from "@/interface/order";

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrdersByColumn: (
      state,
      action: PayloadAction<OrderCardListInterface>
    ) => {
      const list = action.payload.data;

      return {
        ...state,
        orders: groupBy(list, (card) =>
          card.order_status.title.en.toLowerCase()
        ),
      };
    },
    setOrders: (
      state,
      action: PayloadAction<{ [name: string]: OrderCardInterface[] }>
    ) => {
      return {
        ...state,
        orders: action.payload,
      };
    },
  },
});

export const { setOrdersByColumn, setOrders } = orderSlice.actions;
export default orderSlice.reducer;
