import { useEffect, useState } from "react";
import {
  useGetOrderByIdQuery,
  useGetPaymentQuery,
  useUpdateOrderMutation,
} from "@/store/api/order";
import {
  Breadcrumbs,
  Button,
  Chip,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import { OrderInterface } from "@/interface/order";
import DrawerOrderItem from "./item";
import { green, red } from "@mui/material/colors";
import { typesOfOrder } from "@/constant/data/oders";

type PropType = {
  id: number;
  closeDrawer: () => void;
};

export type orderDetailType = {
  items: OrderInterface[];
  order_type: string;
  payment_type: number | "";
  client_detail: {
    block: string;
    cabinet: string;
    cabinet_location: string;
    number: string;
  };
};

const Drawerorder = ({ id, closeDrawer }: PropType) => {
  const [orderDetail, setOrderDetail] = useState<orderDetailType>({
    items: [],
    order_type: "",
    payment_type: "",
    client_detail: {
      block: "",
      cabinet: "",
      cabinet_location: "",
      number: "",
    },
  });
  const { data: orderItem } = useGetOrderByIdQuery(id);
  const { data: payments } = useGetPaymentQuery();
  const [updateStatus] = useUpdateOrderMutation();

  const sum =
    orderDetail.items.reduce((a, b) => a + b.price * b.quantity, 0) || 0;

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOrderDetail((prev) => ({
      ...prev,
      client_detail: {
        ...prev.client_detail,
        [name]: value,
      },
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();

    const orderItems =
      orderDetail.items.map((el) => ({
        product_id: el.product.id,
        quantity: el.quantity,
      })) ?? [];
    try {
      await updateStatus({
        id,
        order_items: orderItems,
        payment_type: orderDetail.payment_type,
        payment_status: "paid",
        order_detail: JSON.stringify({
          name: orderDetail.order_type,
          delivery:
            orderDetail.order_type === "delivery"
              ? orderDetail.client_detail
              : undefined,
        }),
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const archive = async (id: number) => {
    try {
      await updateStatus({
        id,
        order_status: 4,
      }).unwrap();
      closeDrawer();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (orderItem) {
      const orderType = JSON.parse(orderItem.order_detail);

      setOrderDetail((prev) => ({
        ...prev,
        items: orderItem.order_items ?? [],
        payment_type: orderItem.payment_type.id,
        order_type: orderType.name,
        client_detail: {
          block: orderType.delivery?.block || "",
          cabinet: orderType.delivery?.cabinet || "",
          cabinet_location: orderType.delivery?.cabinet_location || "",
          number: orderType.delivery?.number || "",
        },
      }));
    }
  }, [orderItem]);

  return (
    <Drawer anchor="right" open={true} onClose={closeDrawer}>
      {orderItem && (
        <>
          <Stack py={4} px={3}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              spacing={2}
              mb={2}
            >
              <Breadcrumbs separator="•" aria-label={"breadcrump"}>
                <Typography>
                  Оформлен в{" "}
                  {new Date(orderItem.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hourCycle: "h24",
                  })}
                </Typography>
                <Typography>{orderItem.order_status.title.ru}</Typography>
              </Breadcrumbs>
              <IconButton onClick={closeDrawer}>
                <CloseIcon />
              </IconButton>
            </Stack>
            <Typography
              variant="h5"
              color={"CaptionText"}
              fontWeight={"bold"}
              mb={2}
            >
              Заказ №{orderItem.id}
            </Typography>
            <Divider />
            <Stack spacing={2} pt={2}>
              {orderDetail.items.map((item) => (
                <DrawerOrderItem
                  menuItem={item}
                  key={item.id}
                  updateItem={setOrderDetail}
                  paid={orderItem.payment_status === "paid"}
                />
              ))}
            </Stack>
          </Stack>
          <form
            style={{
              padding: "16px 24px 32px",
              borderRadius: "12px 12px 0 0",
              backgroundColor: "#f5f5f5",
              marginTop: "auto",
            }}
            onSubmit={(e) => onSubmit(e, orderItem.id)}
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
              <Typography>{orderDetail.items.length} позиций</Typography>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              spacing={2}
              mb={3}
            >
              <Typography>Тип заказа</Typography>
              {orderItem.payment_status === "paid" ? (
                <Typography>{typesOfOrder[orderDetail.order_type]}</Typography>
              ) : (
                <FormControl
                  sx={{
                    minWidth: "150px",
                    bgcolor: "#fff",
                  }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Тип заказа
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={orderDetail.order_type}
                    label="Тип заказа"
                    onChange={(e) =>
                      setOrderDetail((prev) => ({
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
              )}
            </Stack>
            {orderDetail.order_type === "delivery" &&
              orderItem.payment_status === "unpaid" && (
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
                          value={orderDetail.client_detail.block}
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
                          value={orderDetail.client_detail.cabinet}
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
                        value={orderDetail.client_detail.cabinet_location}
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
                        value={orderDetail.client_detail.number}
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
              {orderItem.payment_status === "paid" ? (
                <Typography>
                  {
                    payments?.data.find(
                      (el) => el.id === orderDetail.payment_type
                    )?.title.ru
                  }
                </Typography>
              ) : (
                <FormControl
                  sx={{
                    minWidth: "150px",
                    bgcolor: "#fff",
                  }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Способ оплаты
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={orderDetail.payment_type}
                    label="Способ оплаты"
                    onChange={(e) =>
                      setOrderDetail((prev) => ({
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
              )}
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              spacing={2}
              mb={3}
            >
              <Typography>Статус</Typography>
              {orderItem.payment_status === "paid" ? (
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
              {orderItem.payment_status === "paid" ? (
                <Stack direction={"row"} justifyContent={"stretch"} spacing={2}>
                  <Button
                    variant="contained"
                    sx={{
                      flexGrow: 1,
                      flexBasis: "50%",
                      bgcolor: "#5566ff1a",
                      color: "#5566ff",
                      boxShadow: "none",
                      whiteSpace: "nowrap",
                      "&:hover": {
                        bgcolor: "#5566ff1a",
                        opacity: 0.8,
                        boxShadow: "none",
                      },
                    }}
                    startIcon={<PaidOutlinedIcon />}
                    type="button"
                    onClick={() => console.log("prosmotr check")}
                  >
                    Посмотреть чек
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      flexGrow: 1,
                      flexBasis: "50%",
                      bgcolor: "#5566ff",
                      color: "#fff",
                      boxShadow: "none",
                      "&:hover": {
                        bgcolor: "#5566ff",
                        boxShadow: "none",
                        opacity: 0.8,
                      },
                    }}
                    startIcon={<CheckCircleOutlineOutlinedIcon />}
                    type="button"
                    onClick={closeDrawer}
                  >
                    Закрыть заказ
                  </Button>
                </Stack>
              ) : (
                <Stack direction={"row"} justifyContent={"stretch"} spacing={2}>
                  <Button
                    variant="contained"
                    sx={{
                      flexGrow: 1,
                      flexBasis: "50%",
                      bgcolor: "#5566ff1a",
                      color: "#5566ff",
                      boxShadow: "none",
                      "&:hover": {
                        bgcolor: "#5566ff1a",
                        opacity: 0.8,
                        boxShadow: "none",
                      },
                    }}
                    startIcon={<ArchiveOutlinedIcon />}
                    type="button"
                    onClick={() => archive(orderItem.id)}
                  >
                    Архивировать
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      flexGrow: 1,
                      flexBasis: "50%",
                      bgcolor: "#5566ff",
                      color: "#fff",
                      boxShadow: "none",
                      "&:hover": {
                        bgcolor: "#5566ff",
                        boxShadow: "none",
                        opacity: 0.8,
                      },
                    }}
                    startIcon={<CheckCircleOutlineOutlinedIcon />}
                    type="submit"
                  >
                    Оплатить
                  </Button>
                </Stack>
              )}
            </Stack>
          </form>
        </>
      )}
    </Drawer>
  );
};

export default Drawerorder;
