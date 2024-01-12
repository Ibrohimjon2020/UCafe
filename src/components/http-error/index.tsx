import { useNavigate } from "react-router-dom";
// componentss
import { Box, Button, Stack, Typography } from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { blue } from "@mui/material/colors";

type PropType = {
  statusCode: number;
};

const HttpError = ({ statusCode }: PropType) => {
  const navigate = useNavigate();

  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        height: "calc(100vh - 74px)",
      }}
    >
      <Box width={"390px"} textAlign={"center"}>
        <WarningAmberRoundedIcon
          sx={{
            width: "32px",
            height: "32px",
            color: blue["A700"],
            mb: "10px",
          }}
        />
        {statusCode >= 500 ? (
          <>
            <Typography marginBottom={"24px"}>
              Ошибка сервера 500. На сервере произошла непредвиденная ошибка.
              Пожалуйста, подождите, она вскоре будет исправлена.
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: blue["A700"],
              }}
              onClick={() => navigate(0)}
            >
              Обновить
            </Button>
          </>
        ) : (
          <>
            <Typography marginBottom={"24px"}>
              Страница, которую вы запрашиваете не существует. Возможно, она
              устарела, была удалена или был введен неверный адрес
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: blue["A700"],
              }}
              onClick={() => navigate("/orders")}
            >
              Вернуться на главную
            </Button>
          </>
        )}
      </Box>
    </Stack>
  );
};

export default HttpError;
