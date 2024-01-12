import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import ordersReducer from "./orders";
import basketReducer from "./basket";
import { authApi } from "../api/auth";
import { menuApi } from "../api/menu";
import { staffApi } from "../api/staff";
import { expenseApi } from "../api/expense";
import { orderApi } from "../api/order";

const root = combineReducers({
  auth: authReducer,
  orders: ordersReducer,
  [authApi.reducerPath]: authApi.reducer,
  [menuApi.reducerPath]: menuApi.reducer,
  [staffApi.reducerPath]: staffApi.reducer,
  [expenseApi.reducerPath]: expenseApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  basket: basketReducer,
});

export default root;
