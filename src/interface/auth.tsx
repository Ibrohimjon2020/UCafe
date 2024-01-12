export interface authInterface {
  user: userInterface | null;
  token: string | null;
}

export interface userInterface {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  login: string;
  staff_status: number;
  roles: rolesInterface[];
}

export interface rolesInterface {
  id: number;
  title: lang;
  created_at: string;
  updated_at: string;
  pivot: {
    user_id: number;
    role_id: number;
  };
}

export type lang = {
  en: string;
  ru: string;
  uz: string;
};
