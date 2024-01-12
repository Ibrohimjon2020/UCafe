import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import OrdersList from "./orders-list";
import {
  useGetOrderColumnsQuery,
  useGetOrderListQuery,
  useUpdateStatusMutation,
} from "@/store/api/order";
import { sortById } from "@/utils/helpers/callback";
import { setOrders, setOrdersByColumn } from "@/store/reducers/orders";
import { optionType } from "../control-orders";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { OrderCardInterface } from "@/interface/order";
import { useSelector } from "react-redux";
import { StoreType } from "@/store";
import Drawerorder from "../drawer-order";

type PropType = {
  options: optionType;
};

const ManageOrders = ({ options }: PropType) => {
  const [curId, setCurId] = useState<null | number>(null);
  const ordersList = useSelector((store: StoreType) => store.orders.orders);

  const { data: columns } = useGetOrderColumnsQuery();
  const { data: orders } = useGetOrderListQuery();
  const [updateStatus] = useUpdateStatusMutation();

  const dispatch = useDispatch();

  const sortedColumns = useMemo(
    () => columns?.data.slice(0).sort(sortById),
    [columns]
  );

  const selectId = useCallback((id: number) => {
    setCurId(id);
  }, []);

  const removeFromList = (
    list: OrderCardInterface[],
    index: number
  ): [OrderCardInterface, OrderCardInterface[]] => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = useCallback(
    (
      list: OrderCardInterface[] = [],
      index: number,
      element: OrderCardInterface
    ): OrderCardInterface[] => {
      const result = Array.from(list);
      result.splice(index, 0, element);
      return result;
    },
    []
  );

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      if (!result.destination) {
        return;
      }

      const listCopy: typeof ordersList = { ...ordersList };
      const sourceList = listCopy?.[result.source.droppableId];

      const [removedElement, newSourceList] = removeFromList(
        sourceList,
        result.source.index
      );

      listCopy[result.source.droppableId] = newSourceList;
      const destinationList = listCopy[result.destination.droppableId];
      listCopy[result.destination.droppableId] = addToList(
        destinationList,
        result.destination.index,
        removedElement
      );
      dispatch(setOrders(listCopy));
      try {
        const columnId =
          columns?.data.find(
            (el) =>
              el.title.en.toLowerCase() === result.destination?.droppableId
          )?.id ?? removedElement.order_status;
        await updateStatus({
          order_status: columnId,
          payment_type: removedElement.payment_type.id,
          id: removedElement.id,
        }).unwrap();
      } catch (error) {
        console.log(error);
      }
    },
    [ordersList, addToList, dispatch, updateStatus, columns?.data]
  );

  useEffect(() => {
    if (orders) {
      dispatch(setOrdersByColumn({ data: orders }));
    }
  }, [orders, dispatch]);

  return (
    <Grid container p={3} spacing={3} flexGrow={1}>
      <DragDropContext onDragEnd={onDragEnd}>
        {sortedColumns?.map((col) => (
          <Grid
            item
            xs={12}
            md={4}
            display={"flex"}
            flexDirection={"column"}
            key={col.id}
          >
            <OrdersList
              title={col.title.ru}
              sortBy={col.title.en.toLowerCase()}
              options={options}
              selectId={selectId}
            />
          </Grid>
        ))}
      </DragDropContext>
      {curId && <Drawerorder id={curId} closeDrawer={() => setCurId(null)} />}
    </Grid>
  );
};

export default ManageOrders;
