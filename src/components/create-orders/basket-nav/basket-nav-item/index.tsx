import { useDispatch } from "react-redux";
//
import { BasketItemInterface } from "@/interface/basket";
import { Box, Checkbox, IconButton, Stack, Typography } from "@mui/material";
//
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { addItem, removeItem } from "@/store/reducers/basket";

type PropType = {
  menuItem: BasketItemInterface;
  basket_id: string;
};

const BasketNavItem = ({ menuItem, basket_id }: PropType) => {
  const dispatch = useDispatch();

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={2}
      sx={{
        border: "1px solid #ecedee",
        borderRadius: "8px",
        padding: "12px",
      }}
    >
      <Checkbox checked={Boolean(menuItem.amount)} />
      <Box
        overflow={"hidden"}
        width={"65px"}
        height={"65px"}
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
            width={65}
            height={65}
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
      <Stack flexGrow={1}>
        <Typography
          sx={{
            color: "#2f3138",
          }}
          variant="h6"
        >
          {menuItem.title.ru}
        </Typography>
        <Typography>В наличии: {menuItem.quantity}</Typography>
      </Stack>
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
          }}
          onClick={() => dispatch(addItem({ id: menuItem.id, basket_id }))}
        >
          <AddIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default BasketNavItem;
