import { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
//
import ConfigureMenuTypes from "./configure-menu-types";
import ConfigureMenuProducts from "./configure-menu-products";
//
import { blue } from "@mui/material/colors";
import ConfigureMenuAddDialog from "./configure-menu-add-dialog";
import HttpError from "../http-error";
import { useGetMenuTypesQuery } from "@/store/api/menu";

const ConfigureMenu = () => {
  const [addOpen, setAddOpen] = useState(false);
  const { error } = useGetMenuTypesQuery(1);

  return (
    <Stack flexGrow={1}>
      {error ? (
        <HttpError
          statusCode={"status" in error ? Number(error.status) : 500}
        />
      ) : (
        <>
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
              Создать заказ
            </Button>
          </Stack>
          <Stack p={3} bgcolor={"#f5f5f5"} flexGrow={1}>
            <ConfigureMenuTypes />
            <ConfigureMenuProducts />
            <ConfigureMenuAddDialog
              type="add"
              open={addOpen}
              onClose={() => {
                setAddOpen(false);
              }}
            />
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default ConfigureMenu;
