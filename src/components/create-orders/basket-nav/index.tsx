import { Stack } from "@mui/material";
import BasketNavHeader from "./basket-nav-header";
import { Outlet } from "react-router-dom";

const BasketNav = () => {
  return (
    <Stack>
      <BasketNavHeader />
      <Outlet />
    </Stack>
  );
};

export default BasketNav;
