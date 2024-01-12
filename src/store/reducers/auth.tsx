import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { authState as initialState } from "@/constant/data/auth";

import { authInterface } from "@/interface/auth";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthDetails: (_, actions: PayloadAction<authInterface>) => {
      const { token, user } = actions.payload;
      if (user && token) {
        localStorage.setItem("_tn", token);
        localStorage.setItem("_ur", JSON.stringify(user));
      }
      return {
        token,
        user,
      };
    },
    removeAuthDetails: () => {
      localStorage.removeItem("_tn");
      localStorage.removeItem("_ur");
      return { token: null, user: null };
    },
  },
});

export const { setAuthDetails, removeAuthDetails } = authSlice.actions;
export default authSlice.reducer;
