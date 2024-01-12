import { Navigate } from "react-router-dom";
// Pages
import Auth from "@/pages/auth";
import NotFound from "@/pages/404";
import Orders from "@/pages/orders";
import ConfigureMenu from "@/pages/configure-menu";

import { PathType } from "@/interface/path";
import ConfigureEmployee from "./pages/configure-employee";
import Expense from "./pages/expense";
import CreateOrders from "./pages/create-orders";
import CreateOrderList from "./pages/create-orders/list";

const pathes: PathType[] = [
  {
    path: "/",
    element: <Navigate to={"/orders"} />,
    private: true,
  },
  {
    path: "/orders",
    element: <Orders />,
    private: true,
  },
  {
    path: "/orders/create",
    element: <CreateOrders />,
    private: true,
    children: [
      {
        path: ":basketId",
        element: <CreateOrderList />,
        private: true,
      },
    ],
  },
  {
    path: "/configure-menu",
    element: <ConfigureMenu />,
    private: true,
  },
  {
    path: "/configure-employee",
    element: <ConfigureEmployee />,
    private: true,
  },
  {
    path: "/expenses",
    element: <Expense />,
    private: true,
  },
  {
    path: "/login",
    element: <Auth />,
    private: false,
  },
  {
    path: "/*",
    element: <NotFound />,
    private: false,
  },
];

export default pathes;
