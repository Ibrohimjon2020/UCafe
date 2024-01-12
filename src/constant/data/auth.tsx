import { authInterface } from "@/interface/auth";

const token = localStorage.getItem("_tn");
const userStr = localStorage.getItem("_ur");

export const authState: authInterface = {
  token,
  user: userStr ? JSON.parse(userStr) : null,
};
