import basketList, { basketState } from "@/constant/data/basket";
import { AddBasketAction, AddMenuAction } from "@/interface/basket";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addAmount, deleteAmount, removeAmount } from "../actions/basket";
import { v4 as uniqueId } from "uuid";

const basketSlice = createSlice({
  name: "basket",
  initialState: basketList,
  reducers: {
    addItem: (state, action: PayloadAction<AddBasketAction>) => {
      const { id, basket_id } = action.payload;
      const { basket, menu } = state[basket_id];
      const menuItem = basket.find((item) => item.id === id);
      const menuList = menu.map((item) => addAmount(item, id));
      if (menuItem) {
        const basketList = basket.map((item) => addAmount(item, id));
        return {
          ...state,
          [basket_id]: {
            ...state[basket_id],
            menu: menuList,
            basket: basketList,
          },
        };
      }
      const item = menuList.find((item) => item.id === id);
      return {
        ...state,
        [basket_id]: {
          ...state[basket_id],
          menu: menuList,
          basket: item ? [...basket, item] : basket,
        },
      };
    },
    removeItem: (state, action: PayloadAction<AddBasketAction>) => {
      const { id, basket_id } = action.payload;
      const { basket, menu } = state[basket_id];
      const menuItem = basket.find((item) => item.id === id);
      const menuList = menu.map((item) => removeAmount(item, id));
      if (menuItem) {
        const basketList = basket
          .map((item) => removeAmount(item, id))
          .filter((item) => item.amount > 0);
        return {
          ...state,
          [basket_id]: {
            ...state[basket_id],
            menu: menuList,
            basket: basketList,
          },
        };
      }
      return {
        ...state,
        [basket_id]: {
          ...state[basket_id],
          menu: menuList,
        },
      };
    },
    deleteItem: (state, action: PayloadAction<AddBasketAction>) => {
      const { id, basket_id } = action.payload;
      const { basket, menu } = state[basket_id];
      const menuList = menu.map((item) => deleteAmount(item, id));
      const basketList = basket
        .map((item) => deleteAmount(item, id))
        .filter((item) => item.amount > 0);
      return {
        ...state,
        [basket_id]: {
          ...state[basket_id],
          menu: menuList,
          basket: basketList,
        },
      };
    },
    addMenu: (state, action: PayloadAction<AddMenuAction>) => {
      const { data, basket_id } = action.payload;
      if (state[basket_id]) {
        state[basket_id].menu = data.map((item) => ({
          ...item,
          amount: 0,
        }));
      }
    },
    addBasket: (state) => {
      state[uniqueId()] = basketState;
    },
    removeBasket: (state, action: PayloadAction<string>) => {
      if (Object.keys(state).length > 1) {
        delete state[action.payload];
      }
    },
    clearBasket: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      if (state[id]) {
        const { menu } = state[id];
        const menuList = menu.map((item) => ({ ...item, amount: 0 }));
        return {
          ...state,
          [id]: {
            ...state[id],
            menu: menuList,
            basket: [],
          },
        };
      }
    },
  },
});

export const {
  addItem,
  addMenu,
  addBasket,
  removeBasket,
  removeItem,
  deleteItem,
  clearBasket,
} = basketSlice.actions;
export default basketSlice.reducer;
