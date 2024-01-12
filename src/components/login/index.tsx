// main
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//components
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
//additionals
import CafeImg from "@/assets/images/cafe.png";
import LogoIcon from "@/assets/images/logo.svg";

import { blue, red } from "@mui/material/colors";
import { useLoginMutation } from "@/store/api/auth";
import { ErrorResType } from "@/interface/error";
import { setAuthDetails } from "@/store/reducers/auth";

const Login = () => {
  const [details, setDetails] = useState({
    login: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const detailsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const res = await login(details).unwrap();
      dispatch(
        setAuthDetails({
          token: res.token,
          user: res.user,
        })
      );
      navigate("/orders");
    } catch (err) {
      if ((err as ErrorResType).status === 404) {
        setErrorMsg((err as ErrorResType).data.message);
      } else {
        setErrorMsg("Something went wrong! Please try again");
      }
    }
  };

  return (
    <Grid container height={"100vh"}>
      <Grid item xs={7} display={"flex"}>
        <img
          src={CafeImg}
          alt="Cafe"
          style={{ flexGrow: 1, height: "100vh", objectFit: "cover" }}
        />
      </Grid>
      <Grid
        item
        xs={5}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "350px",
            width: "100%",
          }}
          onSubmit={loginHandler}
        >
          <img
            src={LogoIcon}
            alt="logo"
            width={160}
            height={62}
            style={{ marginBottom: "24px" }}
          />
          <Typography variant="h5" fontWeight={600} mb={"48px"}>
            Вход в аккаунт
          </Typography>
          <FormControl
            sx={{
              mb: "24px",
              width: "100%",
            }}
            error={Boolean(errorMsg)}
          >
            <TextField
              placeholder="Логин"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon
                      sx={{
                        color: "black",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              name="login"
              value={details.login}
              onChange={detailsHandler}
              error={Boolean(errorMsg)}
            />
            {Boolean(errorMsg) && (
              <FormHelperText
                sx={{
                  marginLeft: 0,
                  color: red["700"],
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {errorMsg}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            sx={{
              mb: "24px",
              width: "100%",
            }}
          >
            <TextField
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HttpsOutlinedIcon sx={{ color: "black" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              name="password"
              value={details.password}
              onChange={detailsHandler}
            />
          </FormControl>
          <Button
            variant="contained"
            startIcon={<LogoutIcon />}
            size="large"
            type="submit"
            sx={{
              bgcolor: blue["A700"],
              textTransform: "none",
              width: "100%",
            }}
          >
            Войти в аккаунт
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
