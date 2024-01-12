import { OrderSlice } from "@/interface/order";

export const orderIntial: OrderSlice = {
  orders: {},
};

export const typesOfOrder: { [t: string]: string } = {
  "with myself": "с собой",
  "in place": "на месте",
  delivery: "доставка",
};
