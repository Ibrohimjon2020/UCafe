import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import IOSSwitch from "../ios-switch";
import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
//
import { MenuItemInterface } from "@/interface/menu";
import { useUpdateMenuItemMutation } from "@/store/api/menu";

import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

type PropType = {
  menuItem: MenuItemInterface;
  openDeleteDialog: (id: number) => void;
  openAddDialog: (id: number) => void;
  openSnackbar: () => void;
};

const ConfigureMenuItem = ({
  menuItem,
  openDeleteDialog,
  openAddDialog,
  openSnackbar,
}: PropType) => {
  const [updateItem] = useUpdateMenuItemMutation();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    try {
      await updateItem({
        ...menuItem,
        status: checked ? 1 : 0,
      }).unwrap();
    } catch (error) {
      openSnackbar();
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
      <Grid xs={12} md={5} item>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Box
            overflow={"hidden"}
            width={"48px"}
            height={"48px"}
            display={"flex"}
            flexShrink={0}
            borderRadius={"8px"}
            sx={{
              bgcolor: "#f5f5f5",
              border: "1px dashed #7d858b33",
              color: "#7d848b",
            }}
          >
            {menuItem.image ? (
              <img
                src={menuItem.image}
                alt="product"
                width={48}
                height={48}
                style={{
                  objectFit: "cover",
                }}
              />
            ) : (
              <AddPhotoAlternateOutlinedIcon
                sx={{
                  margin: "auto",
                }}
              />
            )}
          </Box>
          <Typography fontWeight={600} fontSize={16}>
            {menuItem.title.ru}
          </Typography>
        </Stack>
      </Grid>
      <Grid xs={2} md={2} item>
        {menuItem.quantity} шт.
      </Grid>
      <Grid xs={4} md={2} item>
        {new Intl.NumberFormat("uz-Uz", {
          style: "currency",
          currency: "UZS",
        }).format(menuItem.price)}
      </Grid>
      <Grid xs={3} md={1} item>
        <IOSSwitch checked={Boolean(menuItem.status)} onChange={handleChange} />
      </Grid>
      <Grid xs={3} md={2} textAlign={"end"} item>
        <IconButton
          sx={{
            bgcolor: "#5566ff1a",
            color: "#5566ff",
            borderRadius: "5px",
            marginRight: "16px",
          }}
          onClick={() => openAddDialog(menuItem.id)}
        >
          <DrawOutlinedIcon />
        </IconButton>
        <IconButton
          sx={{
            bgcolor: "#ff1f001a",
            color: "#ff1f00",
            borderRadius: "5px",
          }}
          onClick={() => openDeleteDialog(menuItem.id)}
        >
          <DeleteForeverOutlinedIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ConfigureMenuItem;
