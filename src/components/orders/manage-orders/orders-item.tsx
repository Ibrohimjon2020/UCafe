import { ReactElement } from "react";
import { Chip, Stack, Typography } from "@mui/material";

import { blue, green, red } from "@mui/material/colors";
import { OrderCardInterface, OrderTypeInterface } from "@/interface/order";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import ChairAltOutlinedIcon from "@mui/icons-material/ChairAltOutlined";
import { Draggable } from "react-beautiful-dnd";

type PropType = {
  card: OrderCardInterface;
  index: number;
  selectId: (id: number) => void;
};

const types: { [title: string]: { title: string; icon: ReactElement } } = {
  "with myself": {
    title: "с собой",
    icon: (
      <DirectionsRunIcon
        color="info"
        sx={{
          color: blue["A700"],
          width: "20px",
        }}
      />
    ),
  },
  "in place": {
    title: "на месте",
    icon: (
      <ChairAltOutlinedIcon
        color="info"
        sx={{
          color: blue["A700"],
          width: "20px",
        }}
      />
    ),
  },
  delivery: {
    title: "доставка",
    icon: (
      <BusinessOutlinedIcon
        color="info"
        sx={{
          color: blue["A700"],
          width: "20px",
        }}
      />
    ),
  },
};

const OrdersItem = ({ card, index, selectId }: PropType) => {
  const orderType: OrderTypeInterface = JSON.parse(card.order_detail);

  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided, snapshot) => {
        return (
          <Stack
            p={2}
            gap={2}
            mb={2}
            sx={{
              bgcolor: "white",
              borderRadius: "6 px",
              border: "1px solid transparent",
            }}
            ref={provided.innerRef}
            {...{ snapshot }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => selectId(card.id)}
          >
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography
                sx={{
                  color: "black",
                  fontWeight: 600,
                }}
              >
                Заказ №{card.id}
              </Typography>
              <Typography color={"GrayText"} variant="body2">
                {new Date(card.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hourCycle: "h24",
                })}
              </Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Chip
                icon={types[orderType.name]?.icon}
                label={`${types[orderType.name]?.title} ${
                  orderType.delivery?.cabinet
                    ? `(№${orderType.delivery.cabinet})`
                    : ""
                }`}
                variant="outlined"
                sx={{
                  borderColor: "#7d858b33",
                  borderRadius: "5px",
                  padding: "5px 8px",
                  fontWeight: "500",
                  fontSize: "14px",
                  color: "black",
                }}
              />
              <Stack>
                {card.payment_status === "paid" ? (
                  <Chip
                    label="оплачено"
                    sx={{
                      bgcolor: green["50"],
                      color: green["A700"],
                      borderRadius: "5px",
                      fontSize: "14px",
                    }}
                  />
                ) : (
                  <Chip
                    label="не оплачено"
                    sx={{
                      bgcolor: red["50"],
                      color: red["A400"],
                      borderRadius: "5px",
                      fontSize: "14px",
                    }}
                  />
                )}
              </Stack>
            </Stack>
          </Stack>
        );
      }}
    </Draggable>
  );
};

export default OrdersItem;
