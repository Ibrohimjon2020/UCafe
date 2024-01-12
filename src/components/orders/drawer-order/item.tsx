import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { OrderInterface } from "@/interface/order";
import { red } from "@mui/material/colors";
import { orderDetailType } from ".";

type PropType = {
  menuItem: OrderInterface;
  updateItem: React.Dispatch<React.SetStateAction<orderDetailType>>;
  paid: boolean;
};

const DrawerOrderItem = ({ menuItem, updateItem, paid }: PropType) => {
  const addItem = (id: number) => {
    if (!paid) {
      updateItem((prev) => ({
        ...prev,
        items: prev.items.map((el) =>
          el.id === id ? { ...el, quantity: el.quantity + 1 } : el
        ),
      }));
    }
  };

  const removeItem = (id: number) => {
    if (!paid) {
      updateItem((prev) => ({
        ...prev,
        items: prev.items
          .map((el) =>
            el.id === id ? { ...el, quantity: el.quantity - 1 } : el
          )
          .filter((el) => el.quantity > 0),
      }));
    }
  };

  const deleteItem = (id: number) => {
    updateItem((prev) => ({
      ...prev,
      items: prev.items.filter((el) => el.id !== id),
    }));
  };

  return (
    <Stack direction={"row"} alignItems={"center"} spacing={2}>
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
        {menuItem.product.image ? (
          <img
            src={menuItem.product.image}
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
      <Stack>
        <Typography>{menuItem.product.title.ru}</Typography>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={1}
          sx={{
            bgcolor: "#ecedee",
            borderRadius: 100,
            padding: "2px",
          }}
        >
          <IconButton
            color="error"
            sx={{
              bgcolor: "#fff",
              color: "#000",
              width: "24px",
              height: "24px",
            }}
            onClick={() => removeItem(menuItem.id)}
          >
            <RemoveIcon />
          </IconButton>
          <Typography>{menuItem.quantity}</Typography>
          <IconButton
            color="success"
            sx={{
              bgcolor: "#fff",
              color: "#000",
              width: "24px",
              height: "24px",
            }}
            onClick={() => addItem(menuItem.id)}
          >
            <AddIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Stack alignItems={"flex-end"} marginLeft={"auto"} flexGrow={1}>
        <Typography>
          {new Intl.NumberFormat("uz-Uz", {
            style: "currency",
            currency: "UZS",
          }).format(menuItem.price)}
        </Typography>
        {!paid && (
          <Button
            color="error"
            sx={{
              padding: 0,
              color: red["A400"],
              textTransform: "none",
            }}
            onClick={() => deleteItem(menuItem.id)}
          >
            Удалить
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default DrawerOrderItem;
