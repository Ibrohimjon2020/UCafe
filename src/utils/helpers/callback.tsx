import { OrderColumnInterface } from "@/interface/order";

export const sortById = (a: OrderColumnInterface, b: OrderColumnInterface) =>
  a.id > b.id ? 1 : -1;

export function groupBy<T>(arr: T[], fn: (item: T) => string) {
  return arr.reduce<Record<string, T[]>>((prev, curr) => {
    const groupKey = fn(curr);
    const group = prev[groupKey] || [];
    group.push(curr);
    return { ...prev, [groupKey]: group };
  }, {});
}
