import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//
import { Button, IconButton, Stack } from "@mui/material";
//
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
//
import { StoreType } from "@/store";
import { addBasket, removeBasket } from "@/store/reducers/basket";

const BasketNavHeader = () => {
  const { basketId } = useParams();
  const navigate = useNavigate();

  const basket = useSelector((store: StoreType) => store.basket);
  const dispatch = useDispatch();

  return (
    <Stack
      direction={"row"}
      bgcolor={"#f5f5f5"}
      sx={{
        borderTop: "1px solid #7d858b33",
        borderBottom: "1px solid #7d858b33",
      }}
    >
      <IconButton
        sx={{
          padding: "19px 24px",
          borderRadius: 0,
        }}
        onClick={() => navigate("/orders")}
      >
        <KeyboardBackspaceIcon />
      </IconButton>
      <Stack direction={"row"}>
        {Object.keys(basket).map((bas, ind) => (
          <Button
            key={bas}
            endIcon={
              <CloseIcon
                onClick={() => {
                  dispatch(removeBasket(bas));
                  if (Object.keys(basket).length > 1) {
                    navigate(-1);
                  }
                }}
              />
            }
            sx={{
              color: basketId === bas ? "#2f3138 " : "#7d848b",
              textTransform: "none",
              fontWeight: 600,
              bgcolor: basketId === bas ? "#fff" : "transparent",
              pl: "16px",
              pr: "16px",
            }}
            onClick={() => navigate(`/orders/create/${bas}`)}
          >
            Корзина №{ind + 1}
          </Button>
        ))}
      </Stack>
      <IconButton
        onClick={() => dispatch(addBasket())}
        sx={{
          padding: "19px 24px",
          borderRadius: 0,
          bgcolor: "#5566ff",
          color: "#fff",
          "&:hover": {
            bgcolor: "#5566ff",
            opacity: 0.8,
          },
        }}
      >
        <AddIcon />
      </IconButton>
    </Stack>
  );
};

export default BasketNavHeader;
