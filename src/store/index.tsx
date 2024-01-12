import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import logger from "redux-logger";
//
import reducer from "./reducers";
import { authApi } from "./api/auth";
import { menuApi } from "./api/menu";
import { staffApi } from "./api/staff";
import { expenseApi } from "./api/expense";
import { orderApi } from "./api/order";

const store = configureStore({
  reducer,
  middleware: (gdm) =>
    gdm().concat(
      logger,
      authApi.middleware,
      menuApi.middleware,
      staffApi.middleware,
      expenseApi.middleware,
      orderApi.middleware
    ),
  // devTools: !import.meta.env.PROD,
});

setupListeners(store.dispatch);

export type StoreType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
export default store;
