import { useState } from "react";
import Container from "@/layout/container";
import ControlOrders from "@/components/orders/control-orders";
import ManageOrders from "@/components/orders/manage-orders";
import { useGetOrderColumnsQuery } from "@/store/api/order";
import HttpError from "@/components/http-error";

const Orders = () => {
  const [options, setOptions] = useState({
    paid: true,
    unpaid: true,
  });

  const { error } = useGetOrderColumnsQuery();
  return (
    <Container>
      {error ? (
        <HttpError
          statusCode={"status" in error ? Number(error.status) : 500}
        />
      ) : (
        <>
          <ControlOrders options={options} setOptions={setOptions} />
          <ManageOrders options={options} />
        </>
      )}
    </Container>
  );
};

export default Orders;
