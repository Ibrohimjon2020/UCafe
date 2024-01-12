import { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
//
import { blue } from "@mui/material/colors";
import ConfigureEmployeeList from "./configure-employee-list";
import ConfigureEmployeeDialog from "./configure-employee-dialog";
import { useGetStaffRolesQuery } from "@/store/api/staff";

const ConfigureEmployeeContainer = () => {
  const [addOpen, setAddOpen] = useState(false);

  const { data: roles } = useGetStaffRolesQuery();

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
          Управление сотрудниками
        </Typography>
        <Button
          variant="contained"
          color="info"
          size="large"
          startIcon={<ControlPointOutlinedIcon />}
          sx={{
            bgcolor: blue["A700"],
            textTransform: "none",
            color: "white",
            "&:hover": {
              color: "white",
            },
          }}
          onClick={() => setAddOpen(true)}
        >
          Новый сотрудник
        </Button>
      </Stack>
      <Stack p={3} bgcolor={"#f5f5f5"} flexGrow={1}>
        <ConfigureEmployeeList />
        {roles && addOpen && (
          <ConfigureEmployeeDialog
            open={addOpen}
            onClose={() => setAddOpen(false)}
            type="add"
            roles={roles}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default ConfigureEmployeeContainer;
