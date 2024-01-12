import { lang } from "./auth";

export interface StaffRoleInterface {
  id: number;
  title: lang;
  pivot: {
    user_id: number;
    role_id: number;
  };
}

export interface StaffInterface {
  id: number;
  name: string;
  phone_number: number;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  login: string;
  staff_status: number;
  roles: StaffRoleInterface[];
}

export interface StaffListInterface {
  current_page: number;
  data: StaffInterface[];
  last_page: number;
  per_page: number;
  total: number;
}

export interface RolesListInterface {
  data: StaffRoleInterface[];
  last_page: number;
  per_page: number;
  total: number;
}
