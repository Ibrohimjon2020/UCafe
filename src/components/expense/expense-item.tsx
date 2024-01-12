import { Grid, IconButton } from "@mui/material";
//
import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { ExpenseInterface } from "@/interface/expense";

type PropType = {
  exp: ExpenseInterface;
  openDeleteDialog: (id: number) => void;
  openAddDialog: (id: number) => void;
};

const ExpenseItem = ({ exp, openAddDialog, openDeleteDialog }: PropType) => {
  return (
    <Grid
      container
      p={2}
      borderRadius={"6px"}
      bgcolor={"#fff"}
      alignItems={"center"}
    >
      <Grid item md={3}>
        {new Date(exp.day).toDateString()}
      </Grid>
      <Grid item md={3}>
        {new Intl.NumberFormat("uz-Uz", {
          style: "currency",
          currency: "UZS",
        }).format(exp.price)}
      </Grid>
      <Grid item md={4}>
        {exp.description}
      </Grid>
      <Grid item md={2} textAlign={"end"}>
        <IconButton
          sx={{
            bgcolor: "#5566ff1a",
            color: "#5566ff",
            borderRadius: "5px",
            marginRight: "16px",
          }}
          onClick={() => openAddDialog(exp.id)}
        >
          <DrawOutlinedIcon />
        </IconButton>
        <IconButton
          sx={{
            bgcolor: "#ff1f001a",
            color: "#ff1f00",
            borderRadius: "5px",
          }}
          onClick={() => openDeleteDialog(exp.id)}
        >
          <DeleteForeverOutlinedIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ExpenseItem;
