import { Button, Grid, Typography } from "@mui/material";
import IOSSwitch from "../ios-switch";
//
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { StaffInterface } from "@/interface/staff";
import { useUpdateStaffMutation } from "@/store/api/staff";

type PropType = {
  openDialog: (id: number) => void;
  emp: StaffInterface;
};

const ConfigureEmployeeItem = ({ emp, openDialog }: PropType) => {
  const [update] = useUpdateStaffMutation();

  const updateHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    try {
      await update({
        ...emp,
        staff_status: checked ? 1 : 0,
        role: emp.roles[0].id,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid
      container
      p={2}
      borderRadius={"6px"}
      bgcolor={"#fff"}
      alignItems={"center"}
      spacing={2}
    >
      <Grid item md={4}>
        <Typography fontWeight={"600"}>{emp.name}</Typography>
      </Grid>
      <Grid item md={3}>
        <Typography>{emp.login}</Typography>
      </Grid>
      <Grid item md={2}>
        <Typography>{emp.roles[0].title.ru}</Typography>
      </Grid>
      <Grid item md={1}>
        <IOSSwitch
          checked={Boolean(emp.staff_status)}
          onChange={updateHandler}
        />
      </Grid>
      <Grid item md={2} textAlign={"end"}>
        <Button
          variant="outlined"
          startIcon={<VisibilityOutlinedIcon />}
          onClick={() => openDialog(emp.id)}
        >
          Посмотреть
        </Button>
      </Grid>
    </Grid>
  );
};

export default ConfigureEmployeeItem;
