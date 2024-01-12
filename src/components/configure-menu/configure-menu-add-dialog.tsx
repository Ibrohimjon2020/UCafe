import { ChangeEvent, useState } from "react";
import {
  Button,
  Dialog,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Stack,
  SvgIcon,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

import {
  useAddImageMutation,
  useAddMenuItemMutation,
  useGetMenuTypesQuery,
  useUpdateMenuItemMutation,
} from "@/store/api/menu";
import ConfigureMenuLink from "./configure-menu-link";
import IOSSwitch from "../ios-switch";
import { initialState } from "@/constant/data/menu";
import { MenuItemInterface } from "@/interface/menu";

type PropType = {
  open: boolean;
  onClose: () => void;
  menuItem?: MenuItemInterface;
  type: "update" | "add";
};

const ConfigureMenuAddDialog = ({
  open,
  onClose,
  menuItem,
  type,
}: PropType) => {
  const [product, setProduct] = useState({
    title: menuItem?.title || {
      ru: "",
      en: "",
      uz: "",
    },
    price: menuItem?.price || 0,
    quantity: menuItem?.quantity || 0,
    image: menuItem?.image || null,
    menu_type_id: menuItem?.menu_type_id || 0,
    status: menuItem?.status ?? 1,
  });

  // QUERIES
  const { data: menuTypes } = useGetMenuTypesQuery(1);
  const [update] = useUpdateMenuItemMutation();
  const [add] = useAddMenuItemMutation();
  const [addImage] = useAddImageMutation();

  const updateHandler = async (id: number) => {
    try {
      await update({
        id,
        ...product,
      }).unwrap();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const addHandler = async () => {
    try {
      if (product.menu_type_id) {
        await add({
          ...product,
        }).unwrap();
        onClose();
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (["uz", "ru", "en"].includes(name)) {
      setProduct((prev) => ({
        ...prev,
        title: {
          ...prev.title,
          [name]: value,
        },
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const uploadImageHandler = async (
    formData: FormData,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const res = await addImage(formData).unwrap();
      setProduct((prev) => ({
        ...prev,
        image: `${import.meta.env.VITE_BASE_URL}/storage/${res.path}`,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      e.target.files = null;
    }
  };

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      uploadImageHandler(formData, e);
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      onClose={() => {
        onClose();
        setProduct(initialState);
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        py={3}
        px={4}
        borderBottom={"1px solid #7d858b33"}
      >
        <Typography variant="h5" fontWeight={"600"}>
          {type === "update" ? "Обновить блюдо" : "Добавить блюдо"}
        </Typography>
        <IconButton
          onClick={() => {
            onClose();
            setProduct(initialState);
          }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <Stack px={4} pt={3} pb={6}>
        <Stack direction={"row"} mb={4} spacing={3} alignItems={"center"}>
          <Stack
            width={"120px"}
            height={"120px"}
            borderRadius={"12px"}
            overflow={"hidden"}
            sx={{
              bgcolor: "#f5f5f5",
              border: "1px dashed #7d858b33",
              color: "#7d848b",
            }}
          >
            {product.image ? (
              <img
                src={product.image}
                width={120}
                height={120}
                style={{ flexGrow: 1, objectFit: "cover" }}
              />
            ) : (
              <AddPhotoAlternateOutlinedIcon
                sx={{
                  margin: "auto",
                  width: "40px",
                  height: "40px",
                }}
              />
            )}
          </Stack>
          <Stack>
            {product.image ? (
              <Stack
                direction={"row"}
                divider={<Divider orientation="vertical" flexItem />}
                spacing={1}
              >
                <Button
                  component="label"
                  sx={{
                    color: "#5566ff",
                    fontSize: "14px",
                    fontWeight: "500",
                    textTransform: "none",
                    padding: 0,
                  }}
                >
                  Изменить
                  <VisuallyHiddenInput onChange={uploadImage} type="file" />
                </Button>
                <Button
                  sx={{
                    color: "#ff1f00",
                    fontSize: "14px",
                    fontWeight: "500",
                    textTransform: "none",
                    padding: 0,
                  }}
                  onClick={() =>
                    setProduct((prev) => ({ ...prev, image: null }))
                  }
                >
                  Удалить
                </Button>
              </Stack>
            ) : (
              <Button
                component="label"
                sx={{
                  color: "#5566ff",
                  fontSize: "14px",
                  fontWeight: "500",
                  textTransform: "none",
                  alignSelf: "flex-start",
                  padding: 0,
                  marginBottom: "8px",
                }}
              >
                Добавить изображение
                <VisuallyHiddenInput onChange={uploadImage} type="file" />
              </Button>
            )}
            <Typography color={"GrayText"}>
              Загрузите изображение блюда в формате .png, .jpg, .jpeg. <br />
              Максимальный размер файла 10MB
            </Typography>
          </Stack>
        </Stack>
        <Grid container spacing={2} mb={2}>
          {menuTypes?.data.map((type) => (
            <Grid item md={2} key={type.id}>
              <ConfigureMenuLink
                className={`${
                  type.id === product.menu_type_id ? "active" : ""
                }`}
                startIcon={
                  <SvgIcon>
                    <g dangerouslySetInnerHTML={{ __html: type.logo }} />
                  </SvgIcon>
                }
                onClick={() =>
                  setProduct((prev) => ({
                    ...prev,
                    menu_type_id: type.id,
                  }))
                }
              >
                {type.title.ru}
              </ConfigureMenuLink>
            </Grid>
          ))}
        </Grid>
        <FormControl
          sx={{
            mb: "16px",
          }}
        >
          <TextField
            label="Название блюда (РУ)"
            variant="outlined"
            name="ru"
            value={product.title.ru}
            onChange={onChangeHandler}
          />
        </FormControl>
        <FormControl
          sx={{
            mb: "16px",
          }}
        >
          <TextField
            label="Название блюда (EN)"
            variant="outlined"
            name="en"
            value={product.title.en}
            onChange={onChangeHandler}
          />
        </FormControl>
        <FormControl
          sx={{
            mb: "16px",
          }}
        >
          <TextField
            label="Название блюда (UZ)"
            variant="outlined"
            name="uz"
            value={product.title.uz}
            onChange={onChangeHandler}
          />
        </FormControl>
        <Stack direction={"row"} spacing={2} mb={4}>
          <FormControl
            sx={{
              flexGrow: 1,
            }}
          >
            <TextField
              type="number"
              label="Количество (штук)"
              variant="outlined"
              name="quantity"
              value={product.quantity}
              onChange={onChangeHandler}
            />
          </FormControl>
          <FormControl
            sx={{
              flexGrow: 1,
            }}
          >
            <TextField
              type="number"
              label="Цена за шт. (UZS)"
              variant="outlined"
              name="price"
              value={product.price}
              onChange={onChangeHandler}
            />
          </FormControl>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"} spacing={2}>
            <IOSSwitch
              checked={Boolean(product.status)}
              onChange={() =>
                setProduct((prev) => ({
                  ...prev,
                  status: prev.status === 1 ? 0 : 1,
                }))
              }
            />
            <Typography>Отображать в меню</Typography>
          </Stack>
          <Button
            variant="contained"
            color="info"
            size="large"
            sx={{
              bgcolor: "#5566ff",
              padding: "14px 24px",
            }}
            onClick={() =>
              type === "update" && menuItem
                ? updateHandler(menuItem?.id)
                : addHandler()
            }
          >
            {type === "update" ? "Обновить блюдо" : "Добавить блюдо"}
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default ConfigureMenuAddDialog;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
