import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
//
import { Stack, Typography } from "@mui/material";
import BasketItem from "./basket-item";
import BasketBottom from "./basket-bottom";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
//
import { StoreType } from "@/store";

const Basket = () => {
  const { basketId } = useParams();

  const basket = useSelector((store: StoreType) => store.basket);

  return (
    <Stack
      flexGrow={1}
      sx={{
        borderLeft: "1px solid #7d858b33",
      }}
    >
      <Stack
        padding={2}
        sx={{
          borderTop: "1px solid #7d858b33",
          borderBottom: "1px solid #7d858b33",
        }}
      >
        <Typography variant="h5" fontWeight={"600"} fontSize={"1.41rem"}>
          Новый заказ
        </Typography>
      </Stack>
      <Stack p={3} spacing={2} flexGrow={1}>
        {basketId && (basket[basketId]?.basket.length || 0) > 0 ? (
          basket[basketId]?.basket.map((menuItem) => (
            <BasketItem
              key={menuItem.id}
              menuItem={menuItem}
              basket_id={basketId}
            />
          ))
        ) : (
          <Stack flexGrow={1} justifyContent={"center"} alignItems={"center"}>
            <RoomServiceOutlinedIcon
              sx={{
                marginBottom: "8px",
                color: "#5566ff",
                width: "38px",
                height: "38px",
              }}
            />
            <Typography color={"GrayText"}>Начните добавлять блюда</Typography>
          </Stack>
        )}
      </Stack>
      {basketId && <BasketBottom basket_id={basketId} />}
    </Stack>
  );
};

export default Basket;
