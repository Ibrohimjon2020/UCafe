import { useDispatch } from "react-redux";
//
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
//
import { addItem, deleteItem, removeItem } from "@/store/reducers/basket";
import { BasketItemInterface } from "@/interface/basket";
import { red } from "@mui/material/colors";

type PropType = {
  menuItem: BasketItemInterface;
  basket_id: string;
};

const BasketItem = ({ menuItem, basket_id }: PropType) => {
  const dispatch = useDispatch();

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
      <Stack>
        <Typography>{menuItem.title.ru}</Typography>
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
            onClick={() => dispatch(removeItem({ id: menuItem.id, basket_id }))}
          >
            <RemoveIcon />
          </IconButton>
          <Typography>{menuItem.amount}</Typography>
          <IconButton
            color="success"
            sx={{
              bgcolor: "#fff",
              color: "#000",
              width: "24px",
              height: "24px",
            }}
            onClick={() => dispatch(addItem({ id: menuItem.id, basket_id }))}
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
        <Button
          color="error"
          sx={{
            padding: 0,
            color: red["A400"],
            textTransform: "none",
          }}
          onClick={() => dispatch(deleteItem({ id: menuItem.id, basket_id }))}
        >
          Удалить
        </Button>
      </Stack>
    </Stack>
  );
};

export default BasketItem;
