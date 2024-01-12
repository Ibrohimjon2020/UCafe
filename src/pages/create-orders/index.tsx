import Basket from "@/components/create-orders/basket";
import BasketNav from "@/components/create-orders/basket-nav";
import HttpError from "@/components/http-error";
import Container from "@/layout/container";
import { useGetMenuTypesQuery } from "@/store/api/menu";
import { Grid } from "@mui/material";

const CreateOrders = () => {
  const { error } = useGetMenuTypesQuery(1);

  return (
    <Container>
      {error ? (
        <HttpError
          statusCode={"status" in error ? Number(error.status) : 500}
        />
      ) : (
        <Grid container flexGrow={1} alignItems={"flex-start"}>
          <Grid item md={8} display={"flex"} flexDirection={"column"}>
            <BasketNav />
          </Grid>
          <Grid
            item
            md={4}
            display={"flex"}
            flexDirection={"column"}
            minHeight={"100vh"}
            position={"sticky"}
            top={0}
          >
            <Basket />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CreateOrders;
