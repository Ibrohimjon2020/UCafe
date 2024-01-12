import { ChangeEvent, useState } from "react";
//
import {
  Button,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IOSSwitch from "../ios-switch";
//
import { RolesListInterface, StaffInterface } from "@/interface/staff";
import { useAddStaffMutation, useUpdateStaffMutation } from "@/store/api/staff";

type PropType = {
  open: boolean;
  onClose: () => void;
  emp?: StaffInterface;
  roles: RolesListInterface;
  type: "update" | "add";
};

const ConfigureEmployeeDialog = ({
  open,
  onClose,
  emp,
  roles,
  type,
}: PropType) => {
  const [employee, setEmployee] = useState({
    name: emp?.name || "",
    login: emp?.login || "",
    role: emp?.roles[0].id || roles.data[0].id,
    password: "",
    staff_status: emp?.staff_status ?? 1,
  });

  const [update] = useUpdateStaffMutation();
  const [add] = useAddStaffMutation();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateHandler = async (id: number) => {
    try {
      await update({ ...employee, id }).unwrap();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const addHandler = async () => {
    try {
      await add(employee).unwrap();
      setEmployee((prev) => ({
        ...prev,
        login: "",
        name: "",
        password: "",
      }));
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
          {type === "update" ? "Обновить сотрудника" : "Добавить сотрудника"}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Stack p={4}>
        <Grid container spacing={2} mb={4}>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <TextField
                label="ФИО"
                name="name"
                value={employee.name}
                onChange={onChangeHandler}
              />
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Должность</InputLabel>
              <Select
                value={employee.role}
                label="Должность"
                name="role"
                onChange={(e) =>
                  setEmployee((prev) => ({
                    ...prev,
                    role: e.target.value as number,
                  }))
                }
              >
                {roles.data.map((role) => (
                  <MenuItem value={role.id}>{role.title.ru}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <TextField
                label="Логин"
                name="login"
                value={employee.login}
                onChange={onChangeHandler}
              />
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <TextField
                label="Пароль"
                name="password"
                value={employee.password}
                onChange={onChangeHandler}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          spacing={2}
        >
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <IOSSwitch
              checked={Boolean(employee.staff_status)}
              onChange={() =>
                setEmployee((prev) => ({
                  ...prev,
                  staff_status: prev.staff_status === 1 ? 0 : 1,
                }))
              }
            />
            <Typography>Статус активности</Typography>
          </Stack>
          <Button
            variant="contained"
            color="info"
            size="large"
            sx={{
              bgcolor: "#5566ff",
              padding: "14px 24px",
            }}
            onClick={() =>
              type === "update" && emp ? updateHandler(emp.id) : addHandler()
            }
          >
            {type === "update" ? "Обновить сотрудника" : "Добавить сотрудника"}
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default ConfigureEmployeeDialog;
