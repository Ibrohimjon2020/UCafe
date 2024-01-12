import { Stack } from "@mui/material";
import BasketNavTypes from "../basket-nav-types";
import { useState } from "react";
import BasketNavList from "../basket-nav-list";

const BasketNavWrapper = () => {
  const [menuType, setMenuType] = useState("breakfast");

  return (
    <Stack p={3} spacing={2}>
      <BasketNavTypes menuType={menuType} setMenuType={setMenuType} />
      <BasketNavList menuType={menuType} />
    </Stack>
  );
};

export default BasketNavWrapper;
