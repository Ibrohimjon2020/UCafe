import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "@/store";
import { useCreateOrderMutation, useGetPaymentQuery } from "@/store/api/order";
import { useState } from "react";
import { clearBasket } from "@/store/reducers/basket";

type PropType = {
  basket_id: string;
};

type DetailStateType = {
  payment_type?: number;
  order_type: string;
  client_detail: {
    block: string;
    cabinet: string;
    cabinet_location: string;
    number: string;
  };
};

const BasketBottom = ({ basket_id }: PropType) => {
  const [basketDetail, setBasketDetail] = useState<DetailStateType>({
    payment_type: undefined,
    order_type: "with myself",
    client_detail: {
      block: "",
      cabinet: "",
      cabinet_location: "",
      number: "",
    },
  });
  const basket = useSelector((store: StoreType) => store.basket);
  const dispatch = useDispatch();
  const sum =
    basket[basket_id]?.basket.reduce((a, b) => a + b.price * b.amount, 0) || 0;

  const { data: payments } = useGetPaymentQuery();
  const [order] = useCreateOrderMutation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const orderItems =
      basket[basket_id]?.basket.map((el) => ({
        product_id: el.id,
        quantity: el.amount,
      })) ?? [];

    try {
      await order({
        order_items: orderItems,
        payment_type: basketDetail.payment_type,
        order_detail: JSON.stringify({
          name: basketDetail.order_type,
          delivery:
            basketDetail.order_type === "delivery"
              ? basketDetail.client_detail
              : undefined,
        }),
      }).unwrap();
      dispatch(clearBasket({ id: basket_id }));
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBasketDetail((prev) => ({
      ...prev,
      client_detail: {
        ...prev.client_detail,
        [name]: value,
      },
    }));
  };

  return (
    <form
      style={{
        padding: "16px 24px 32px",
        borderRadius: "12px 12px 0 0",
        backgroundColor: "#f5f5f5",
      }}
      onSubmit={onSubmit}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={2}
        mb={3}
      >
        <Typography>ID клиента</Typography>
        <Typography>Неопределено</Typography>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={2}
        mb={3}
      >
        <Typography>Общее количество позиций</Typography>
        <Typography>{basket[basket_id]?.basket.length ?? 0} позиций</Typography>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={2}
        mb={3}
      >
        <Typography>Тип заказа</Typography>
        <FormControl
          sx={{
            minWidth: "150px",
            bgcolor: "#fff",
          }}
        >
          <InputLabel id="demo-simple-select-label">Тип заказа</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={basketDetail.order_type}
            label="Тип заказа"
            onChange={(e) =>
              setBasketDetail((prev) => ({
                ...prev,
                order_type: e.target.value,
              }))
            }
            sx={{
              padding: "0",
            }}
            required
          >
            <MenuItem value={"with myself"}>с собой</MenuItem>
            <MenuItem value={"in place"}>на месте</MenuItem>
            <MenuItem value={"delivery"}>доставка</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {basketDetail.order_type === "delivery" && (
        <Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            spacing={2}
            mb={3}
          >
            <Typography>Номер блока и кабинета</Typography>
            <Stack direction={"row"} spacing={2}>
              <FormControl
                sx={{
                  minWidth: "150px",
                  bgcolor: "#fff",
                }}
              >
                <TextField
                  name="block"
                  placeholder="блок №"
                  required
                  value={basketDetail.client_detail.block}
                  onChange={onChangeHandler}
                />
              </FormControl>
              <FormControl
                sx={{
                  minWidth: "150px",
                  bgcolor: "#fff",
                }}
              >
                <TextField
                  name="cabinet"
                  placeholder="№ кабинета"
                  required
                  value={basketDetail.client_detail.cabinet}
                  onChange={onChangeHandler}
                />
              </FormControl>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            spacing={2}
            mb={3}
          >
            <Typography>Расположение кабинета</Typography>
            <FormControl
              sx={{
                minWidth: "150px",
                bgcolor: "#fff",
              }}
            >
              <TextField
                name="cabinet_location"
                placeholder="Слева от лифта"
                required
                value={basketDetail.client_detail.cabinet_location}
                onChange={onChangeHandler}
              />
            </FormControl>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            spacing={2}
            mb={3}
          >
            <Typography>Номер телефона</Typography>
            <FormControl
              sx={{
                minWidth: "150px",
                bgcolor: "#fff",
              }}
            >
              <TextField
                type="number"
                name="number"
                placeholder="+998 XX XXX XX XX"
                required
                value={basketDetail.client_detail.number}
                onChange={onChangeHandler}
              />
            </FormControl>
          </Stack>
        </Stack>
      )}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={2}
        mb={3}
      >
        <Typography>Способ оплаты</Typography>
        <FormControl
          sx={{
            minWidth: "150px",
            bgcolor: "#fff",
          }}
        >
          <InputLabel id="demo-simple-select-label">Способ оплаты</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={basketDetail.payment_type}
            label="Способ оплаты"
            onChange={(e) =>
              setBasketDetail((prev) => ({
                ...prev,
                payment_type: Number(e.target.value),
              }))
            }
            sx={{
              padding: "0",
            }}
            required
          >
            {payments?.data.map((pay) => (
              <MenuItem value={pay.id} key={pay.id}>
                {pay.title.ru.toLowerCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Stack pt={2} borderTop={"1px solid #7d858b33"}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={2}
          mb={3}
        >
          <Typography variant="h6" fontWeight={600}>
            Итоговая сумма
          </Typography>
          <Typography variant="h5" fontWeight={600}>
            {new Intl.NumberFormat("uz-Uz", {
              style: "currency",
              currency: "UZS",
            }).format(sum)}
          </Typography>
        </Stack>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#5566ff",
            color: "#fff",
            "&:hover": {
              bgcolor: "#5566ff",
              opacity: 0.8,
            },
          }}
          startIcon={<CheckCircleOutlineOutlinedIcon />}
          disabled={(basket[basket_id]?.basket.length || 0) === 0}
          type="submit"
        >
          Оплатить
        </Button>
      </Stack>
    </form>
  );
};

export default BasketBottom;
