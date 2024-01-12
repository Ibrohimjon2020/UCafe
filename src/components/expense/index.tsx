import { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
//
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { blue } from "@mui/material/colors";
import ExpenseList from "./expense-list";
import ExpenseAddDialog from "./expense-add-dialog";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

type DayType = {
  to_date: Dayjs | null;
  from_date: Dayjs | null;
};

const ExpenseContainer = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [day, setDay] = useState<DayType>({
    to_date: null,
    from_date: null,
  });

  return (
    <Stack flexGrow={1}>
      <Stack
        px={"24px"}
        py={"21px"}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        borderBottom={"1px solid #7D858B33"}
      >
        <Typography variant="h5" fontWeight={600}>
          Расходы
        </Typography>
        <Stack direction={"row"} spacing={2}>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <DatePicker
              label="от"
              name="from_date"
              value={day.from_date}
              onChange={(newValue) =>
                setDay((prev) => ({ ...prev, from_date: newValue }))
              }
              sx={{
                width: "100%",
              }}
            />
            <span>-</span>
            <DatePicker
              label="до"
              name="to_date"
              value={day.to_date}
              onChange={(newValue) =>
                setDay((prev) => ({ ...prev, to_date: newValue }))
              }
              sx={{
                width: "100%",
              }}
            />
          </Stack>
          <Button
            variant="contained"
            color="info"
            size="large"
            startIcon={<ControlPointOutlinedIcon />}
            sx={{
              bgcolor: blue["A700"],
              color: "white",
              "&:hover": {
                color: "white",
              },
              textTransform: "none",
            }}
            onClick={() => setAddOpen(true)}
          >
            Добавить расход
          </Button>
        </Stack>
      </Stack>
      <Stack p={3} bgcolor={"#f5f5f5"} flexGrow={1}>
        <ExpenseList
          filter={{
            from_date: day.from_date?.format() || null,
            to_date: day.to_date?.format() || null,
          }}
        />
        {addOpen && (
          <ExpenseAddDialog
            open={addOpen}
            onClose={() => setAddOpen(false)}
            type="add"
          />
        )}
      </Stack>
    </Stack>
  );
};

export default ExpenseContainer;
