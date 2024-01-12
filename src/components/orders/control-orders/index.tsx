import { SetStateAction } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { blue, pink } from "@mui/material/colors";

export type optionType = {
  paid: boolean;
  unpaid: boolean;
};

type PropType = {
  options: optionType;
  setOptions: (opt: SetStateAction<{ paid: boolean; unpaid: boolean }>) => void;
};

const ControlOrders = ({ options, setOptions }: PropType) => {
  const optionsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setOptions((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <Stack
      px={"24px"}
      py={"21px"}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      borderBottom={"1px solid #7D858B33"}
    >
      <Typography variant="h5" fontWeight={600}>
        Все заказы
      </Typography>
      <Stack
        gap={"24px"}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={"14px"}
        >
          <Typography>Отображать заказы:</Typography>
          <FormControlLabel
            control={
              <Checkbox
                color="success"
                name="paid"
                checked={options.paid}
                onChange={optionsHandler}
              />
            }
            label="оплаченные"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="unpaid"
                checked={options.unpaid}
                onChange={optionsHandler}
                sx={{
                  color: pink[800],
                  "&.Mui-checked": {
                    color: pink[600],
                  },
                }}
              />
            }
            label="не оплаченные"
          />
        </Stack>
        <Button
          variant="contained"
          color="info"
          size="large"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          component={Link}
          to="/orders/create"
          sx={{
            bgcolor: blue["A700"],
            textTransform: "none",
            color: "white",
            "&:hover": {
              color: "white",
            },
          }}
        >
          Создать заказ
        </Button>
      </Stack>
    </Stack>
  );
};

export default ControlOrders;
