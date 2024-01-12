// Main functions
import { Link, useLocation } from "react-router-dom";
// MUI components
import {
  AppBar,
  Toolbar,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Badge,
} from "@mui/material";

// Images - functions - contants
import { navList } from "@/constant/data/links";
import LogoIcon from "@/assets/images/logo.svg";
import Profile from "./profile";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#f3f3f3",
        color: "#2f3138",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexGrow={1}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <img src={LogoIcon} alt="logo" width={108} height={42} />
            <List
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 0,
              }}
            >
              {navList.map((nav) => (
                <ListItem
                  key={nav.id}
                  sx={{
                    padding: 0,
                  }}
                >
                  <ListItemButton
                    component={Link}
                    to={nav.path}
                    sx={{
                      padding: "20px 16px",
                      borderBottom: `2px solid ${
                        pathname === nav.path ? "#5566ff" : "transparent"
                      }`,
                      color: pathname === nav.path ? "#5566ff" : "inherit",
                    }}
                  >
                    <ListItemText
                      sx={{
                        whiteSpace: "nowrap",
                        marginRight: "8px",
                      }}
                    >
                      {nav.name}
                    </ListItemText>
                    <Badge
                      color="error"
                      variant="dot"
                      invisible={pathname !== nav.path}
                    ></Badge>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Stack>
          <Profile />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
