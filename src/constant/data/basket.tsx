import { BasketInterface } from "@/interface/basket";
import { v4 as useid } from "uuid";

export const basketState: BasketInterface = {
  order_type: null,
  payment_type: null,
  basket: [],
  menu: [],
};

const basketList = { [useid()]: basketState };

export default basketList;
