import { ChangeEvent, useState } from "react";
//
import {
  Button,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
//
import CloseIcon from "@mui/icons-material/Close";
//
import { ExpenseInterface } from "@/interface/expense";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import {
  useAddExpenseMutation,
  useUpdateExpenseMutation,
} from "@/store/api/expense";

type PropType = {
  open: boolean;
  onClose: () => void;
  exp?: ExpenseInterface;
  type: "update" | "add";
};

type StateType = {
  day: Dayjs | null;
  price: number;
  description: string;
};

const ExpenseAddDialog = ({ open, onClose, type, exp }: PropType) => {
  const [expense, setExpense] = useState<StateType>({
    day: dayjs(exp?.day ?? new Date().toISOString()),
    price: exp?.price ?? 0,
    description: exp?.description ?? "",
  });

  const [update] = useUpdateExpenseMutation();
  const [add] = useAddExpenseMutation();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateHandler = async (id: number) => {
    try {
      await update({ id, ...expense }).unwrap();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const addHandler = async () => {
    try {
      await add(expense).unwrap();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        py={3}
        px={4}
        borderBottom={"1px solid #7d858b33"}
      >
        <Typography variant="h5" fontWeight={"600"}>
          {type === "update" ? "Обновить расход" : "Добавить расход"}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Stack p={4}>
        <Grid container spacing={2} mb={4}>
          <Grid item md={6}>
            <DatePicker
              label="Basic date picker"
              name="day"
              value={expense.day}
              onChange={(newValue) =>
                setExpense((prev) => ({ ...prev, day: newValue }))
              }
              sx={{
                width: "100%",
              }}
            />
          </Grid>
          <Grid item md={6}>
            <FormControl fullWidth>
              <TextField
                label="Сумма расхода"
                type="number"
                name="price"
                onChange={onChangeHandler}
                value={expense.price}
              />
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <FormControl fullWidth>
              <TextField
                label="Комментарий"
                multiline
                rows={5}
                name="description"
                onChange={onChangeHandler}
                value={expense.description}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="info"
          size="large"
          sx={{
            bgcolor: "#5566ff",
            padding: "14px 24px",
            alignSelf: "flex-end",
          }}
          onClick={() =>
            type === "update" && exp ? updateHandler(exp.id) : addHandler()
          }
        >
          {type === "update" ? "Обновить сотрудника" : "Добавить сотрудника"}
        </Button>
      </Stack>
    </Dialog>
  );
};

export default ExpenseAddDialog;
