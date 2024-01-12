import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// components
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LogoutIcon from "@mui/icons-material/Logout";
import AvatarIcon from "@/assets/images/avatar.png";
// utils
import { deepOrange } from "@mui/material/colors";
import { profileList } from "@/constant/data/links";
import { removeAuthDetails } from "@/store/reducers/auth";
import { StoreType } from "@/store";

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useSelector((store: StoreType) => store.auth.user);
  const dispatch = useDispatch();

  const openMenu = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack direction={"row"} spacing={2}>
      <Tooltip title="Account Settings">
        <IconButton
          sx={{ borderRadius: "12px" }}
          id="profile-button"
          aria-controls={openMenu ? "profile-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          onClick={handleClick}
        >
          <Avatar
            src={AvatarIcon}
            alt="Admin"
            sx={{
              bgcolor: deepOrange[500],
              mr: "12px",
            }}
          />
          <Stack alignItems={"flex-start"}>
            <Typography
              component={"h6"}
              color={"black"}
              fontSize={"14px"}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {user?.name || "Who are you?"}{" "}
              {openMenu ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Typography>
            <Typography color={"primary"} fontSize={"12px"}>
              {user?.roles[0].title.ru || "Администратор"}
            </Typography>
          </Stack>
        </IconButton>
      </Tooltip>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "profile-button",
        }}
        sx={{
          width: "100%",
        }}
      >
        {profileList.map((link) => (
          <MenuItem
            key={link.id}
            onClick={() => {
              navigate(link.path);
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText>{link.name}</ListItemText>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={() => dispatch(removeAuthDetails())}>
          <ListItemIcon>
            <LogoutIcon color="error" />
          </ListItemIcon>
          <ListItemText>Выйти из аккаунта</ListItemText>
        </MenuItem>
      </Menu>
    </Stack>
  );
};

export default Profile;
