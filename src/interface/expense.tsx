export interface SimpleExpenseInterface {
  day: string;
  price: number;
  description: string;
}

export interface ExpenseInterface extends SimpleExpenseInterface {
  id: number;
}

export interface ExpenseListInterface {
  data: ExpenseInterface[];
  last_page: 2;
  total: 20;
}
