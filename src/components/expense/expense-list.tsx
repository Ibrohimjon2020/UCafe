import { useCallback, useMemo, useState } from "react";
import { useLocation } from "react-router";
//
import { Stack } from "@mui/system";
import ExpenseItem from "./expense-item";
//
import {
  useDeleteExpenseMutation,
  useGetAllExpensesQuery,
} from "@/store/api/expense";
import { queryMaker, queryStringify } from "@/utils/helpers/query";
import { Pagination, PaginationItem, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import HttpError from "../http-error";
import ExpenseAddDialog from "./expense-add-dialog";
import DeleteDialog from "../delete-dialog";

type PropType = {
  filter: {
    to_date: string | null;
    from_date: string | null;
  };
};

const ExpenseList = ({ filter }: PropType) => {
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [curId, setCurId] = useState<number | null>(null);

  const { search } = useLocation();
  const queryObj = queryMaker(search);
  const { page } = queryObj;

  const {
    data: expenses,
    isLoading,
    error,
  } = useGetAllExpensesQuery({ page: page ?? 1, ...filter });

  const [deleteHandler] = useDeleteExpenseMutation();

  const deleteItemHandler = async (id: number) => {
    try {
      await deleteHandler(id).unwrap();
      closeDeleteDialog();
    } catch (err) {
      console.log(err);
    }
  };

  const curExpense = useMemo(() => {
    if (curId) {
      return expenses?.data.find((el) => el.id === curId);
    }
    return null;
  }, [curId, expenses?.data]);

  const openDeleteDialogHandler = useCallback((id: number) => {
    setDeleteOpen(true);
    setCurId(id);
  }, []);

  const openAddDialogHandler = useCallback((id: number) => {
    setAddOpen(true);
    setCurId(id);
  }, []);

  const closeDeleteDialog = () => {
    setDeleteOpen(false);
    setCurId(null);
  };

  return (
    <Stack flexGrow={1}>
      {error && (
        <HttpError
          statusCode={"status" in error ? Number(error.status) : 500}
        />
      )}
      <Stack spacing={2}>
        {isLoading &&
          !error &&
          new Array(10).fill(1).map((_, ind) => (
            <Skeleton
              key={ind}
              height={60}
              sx={{
                transform: "none",
                WebkitTransform: "none",
              }}
            />
          ))}
        {expenses?.data.map((exp) => (
          <ExpenseItem
            key={exp.id}
            exp={exp}
            openAddDialog={openAddDialogHandler}
            openDeleteDialog={openDeleteDialogHandler}
          />
        ))}
      </Stack>
      {expenses && (
        <Stack alignItems={"center"} pt={4} mt={"auto"}>
          <Pagination
            page={Number(page) || 1}
            count={expenses?.last_page || 1}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/expenses?${queryStringify(queryObj, {
                  page: item.page,
                })}`}
                {...item}
              />
            )}
          />
        </Stack>
      )}
      {curId && (
        <DeleteDialog
          title="Удалить расход"
          about={
            <>
              Вы уверены, что хотите удалить выбранный <br /> расход из учета?
            </>
          }
          open={deleteOpen}
          onClose={closeDeleteDialog}
          deleteHandler={() => deleteItemHandler(curId)}
        />
      )}
      {curExpense && addOpen && (
        <ExpenseAddDialog
          exp={curExpense}
          open={addOpen}
          onClose={() => {
            setAddOpen(false);
            setCurId(null);
          }}
          type="update"
        />
      )}
    </Stack>
  );
};

export default ExpenseList;
