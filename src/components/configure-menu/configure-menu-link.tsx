import { Button, styled } from "@mui/material";

const ConfigureMenuLink = styled(Button)({
  padding: "12px 16px",
  borderRadius: "5px",
  border: "1px solid #7d858b33",
  backgroundColor: "#fff",
  fontSize: "16px",
  fontWeight: 500,
  color: "#2f3138",
  textTransform: "none",
  width: "100%",
  justifyContent: "start",
  "&:hover": {
    color: "#5566ff",
  },
  "&.active": {
    color: "#5566ff",
    backgroundColor: "#5566ff1a",
  },
});

export default ConfigureMenuLink;
