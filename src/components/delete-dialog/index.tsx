import { ReactNode } from "react";
import { Button, Dialog, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

type PropType = {
  title: string;
  about: string | ReactNode;
  open: boolean;
  onClose: () => void;
  deleteHandler: () => void;
};

const DeleteDialog = ({
  onClose,
  open,
  deleteHandler,
  about,
  title,
}: PropType) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        py={3}
        px={4}
        borderBottom={"1px solid #7d858b33"}
      >
        <Typography variant="h5" fontWeight={"600"}>
          {title}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Stack p={4} alignItems={"center"} spacing={3}>
        <DeleteForeverOutlinedIcon
          color="error"
          sx={{
            width: "32px",
            height: "32px",
          }}
        />
        <Typography textAlign={"center"}>{about}</Typography>
        <Stack direction={"row"} spacing={2}>
          <Button
            size="large"
            sx={{
              bgcolor: "#f5f5f5",
              color: "#2f3138",
              padding: "14px",
            }}
            onClick={onClose}
          >
            Отмена
          </Button>
          <Button
            color="error"
            size="large"
            sx={{
              bgcolor: "#ff1f001a",
              color: "#ff1f00",
              padding: "14px",
            }}
            onClick={deleteHandler}
          >
            Удалить
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default DeleteDialog;
