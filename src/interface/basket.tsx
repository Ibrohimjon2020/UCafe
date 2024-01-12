import { MenuItemInterface } from "./menu";

export interface BasketInterface {
  order_type: null | string;
  payment_type: null | string;
  basket: BasketItemInterface[];
  menu: BasketItemInterface[];
}

export interface BasketItemInterface extends MenuItemInterface {
  amount: number;
}

export interface AddBasketAction {
  id: number;
  basket_id: string;
}

export interface AddMenuAction {
  data: MenuItemInterface[];
  basket_id: string;
}
