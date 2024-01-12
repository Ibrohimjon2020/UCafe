import { useSelector } from "react-redux";
import { Stack, Typography } from "@mui/material";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";

import { blue } from "@mui/material/colors";
import OrdersItem from "./orders-item";
import { StoreType } from "@/store";
import { optionType } from "../control-orders";
import { StrictModeDroppable } from "@/components/strict-mode-droppable";

type PropType = {
  title: string;
  sortBy: string;
  options: optionType;
  selectId: (id: number) => void;
};

const OrdersList = ({ title, sortBy, options, selectId }: PropType) => {
  const orders = useSelector((store: StoreType) => store.orders.orders);
  const filteredOrder =
    orders[sortBy]?.filter((el) =>
      [options.paid && "paid", options.unpaid && "unpaid"].includes(
        el.payment_status
      )
    ) ?? [];

  return (
    <Stack alignItems={"flex-start"} flexGrow={1}>
      <Typography
        sx={{
          bgcolor: "#f5f5f5",
          padding: "9px 12px 5px",
          borderRadius: "8px 8px 0 0",
          color: "black",
          fontWeight: "500",
        }}
      >
        {title}{" "}
        <Typography component={"span"} variant="body1" color={"GrayText"}>
          ({filteredOrder.length})
        </Typography>
      </Typography>
      <Stack
        p={2}
        bgcolor={"#f5f5f5"}
        alignSelf={"stretch"}
        borderRadius={"0 8px 8px 8px"}
        flexGrow={1}
        spacing={2}
      >
        <StrictModeDroppable droppableId={sortBy}>
          {(provided) => (
            <Stack
              {...provided.droppableProps}
              ref={provided.innerRef}
              flexGrow={1}
            >
              {filteredOrder.length ? (
                filteredOrder.map((card, index) => (
                  <OrdersItem
                    key={card.id}
                    card={card}
                    index={index}
                    selectId={selectId}
                  />
                ))
              ) : (
                <Stack
                  flexGrow={1}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <ArticleRoundedIcon
                    sx={{
                      color: blue["A700"],
                    }}
                  />
                  <Typography variant="body1" color={"GrayText"}>
                    Заказов еще нет
                  </Typography>
                </Stack>
              )}
              {provided.placeholder}
            </Stack>
          )}
        </StrictModeDroppable>
      </Stack>
    </Stack>
  );
};

export default OrdersList;
