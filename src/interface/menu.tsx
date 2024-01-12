import { lang } from "./auth";

export interface MenuTypeInterface {
  id: number;
  title: lang;
  logo: string;
  created_at: string;
  updated_at: string;
}

export interface MenuTypeListInterface {
  current_page: number;
  data: MenuTypeInterface[];
  per_page: number;
  total: number;
}

export interface MenuItemInterface {
  id: number;
  title: lang;
  image: string | null;
  quantity: number;
  price: number;
  status: number;
  created_at?: string;
  updated_at?: string;
  menu_type_id: number;
  menu?: MenuTypeInterface;
}

export interface MenuItemListInterface {
  current_page: number;
  data: MenuItemInterface[];
  per_page: number;
  last_page: number;
  total: number;
}
