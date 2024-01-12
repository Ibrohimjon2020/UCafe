import { BasketItemInterface } from "@/interface/basket";

export const addAmount = (item: BasketItemInterface, id: number) =>
  item.id === id ? { ...item, amount: item.amount + 1 } : item;

export const removeAmount = (item: BasketItemInterface, id: number) =>
  item.id === id
    ? { ...item, amount: item.amount > 0 ? item.amount - 1 : 0 }
    : item;

export const deleteAmount = (item: BasketItemInterface, id: number) =>
  item.id === id ? { ...item, amount: 0 } : item;
