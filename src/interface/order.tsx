import { lang } from "./auth";

export interface OrderPaymentInterface {
  id: number;
  title: lang;
}

export interface OrderPaymentListInterface {
  data: OrderPaymentInterface[];
}

export interface OrderItemInterface {
  product_id: number;
  quantity: number;
}

export interface OrderListInterface {
  payment_type?: number;
  order_detail: string;
  order_items: OrderItemInterface[];
}

export interface OrderColumnInterface {
  id: number;
  title: lang;
}

export interface OrderColumnListInterface {
  data: OrderColumnInterface[];
}

export interface OrderCardInterface {
  id: number;
  order_status: OrderColumnInterface;
  payment_status: "unpaid" | "paid";
  payment_type: OrderPaymentInterface;
  order_detail: string;
  created_at: string;
  cashier: {
    id: number;
    name: string;
  };
  order_items?: OrderInterface[];
}

export interface OrderCardListInterface {
  data: OrderCardInterface[];
}

export interface OrderSlice {
  orders: {
    [title: string]: OrderCardInterface[];
  };
}

export type OrderTypeInterface = {
  name: string;
  delivery?: {
    block: string;
    cabinet: string;
    cabinet_location: string;
    number: string;
  };
};

export interface OrderInterface {
  id: number;
  product_id: number;
  price: number;
  quantity: number;
  order_id: number;
  created_at: string;
  product: {
    id: number;
    title: lang;
    image: string;
  };
}
