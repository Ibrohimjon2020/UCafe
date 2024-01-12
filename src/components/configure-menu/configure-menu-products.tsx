import { useCallback, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
//
import {
  useDeleteMenuItemMutation,
  useGetMenuItemsQuery,
  useGetMenuTypesQuery,
} from "@/store/api/menu";
import { queryMaker, queryStringify } from "@/utils/helpers/query";
import {
  Alert,
  IconButton,
  Pagination,
  PaginationItem,
  Skeleton,
  Snackbar,
  Stack,
} from "@mui/material";
import ConfigureMenuItem from "./configure-menu-item";
import ConfigureMenuAddDialog from "./configure-menu-add-dialog";
import CloseIcon from "@mui/icons-material/Close";
import DeleteDialog from "../delete-dialog";

const ConfigureMenuProducts = () => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [curId, setCurId] = useState<null | number>(null);
  // QUERY
  const { search } = useLocation();
  const queryObj = queryMaker(search);
  const { type: menuType, page } = queryObj;

  const { data: menuTypes } = useGetMenuTypesQuery(1);
  const typeId = useMemo(
    () =>
      menuTypes?.data.find(
        (el) => el.title.en.toLowerCase() === (menuType || "breakfast")
      )?.id,
    [menuTypes?.data, menuType]
  );
  const {
    data: menuItems,
    isLoading,
    error,
  } = useGetMenuItemsQuery(
    {
      type: typeId,
      page: page || 1,
    },
    { skip: !typeId }
  );

  const [deleteHandler] = useDeleteMenuItemMutation();

  const deleteItemHandler = async (id: number) => {
    try {
      await deleteHandler(id).unwrap();
      closeDeleteDialog();
    } catch (err) {
      console.log(err);
    }
  };

  const currentItem = useMemo(() => {
    if (curId) {
      return menuItems?.data.find((el) => el.id === curId);
    }
    return null;
  }, [curId, menuItems?.data]);
  // HANDLERS
  const openDeleteDialogHandler = useCallback((id: number) => {
    setDeleteOpen(true);
    setCurId(id);
  }, []);

  const openAddDialogHandler = useCallback((id: number) => {
    setAddOpen(true);
    setCurId(id);
  }, []);

  const closeSnackbar = () => setSnackbar(false);

  const openSnackbar = useCallback(() => setSnackbar(true), []);

  const closeDeleteDialog = () => {
    setDeleteOpen(false);
    setCurId(null);
  };

  const itemsList = useMemo(
    () =>
      menuItems?.data.map((item) => (
        <ConfigureMenuItem
          key={item.id}
          menuItem={item}
          openDeleteDialog={openDeleteDialogHandler}
          openSnackbar={openSnackbar}
          openAddDialog={openAddDialogHandler}
        />
      )),
    [
      menuItems?.data,
      openAddDialogHandler,
      openSnackbar,
      openDeleteDialogHandler,
    ]
  );

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={closeSnackbar}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  return (
    <>
      {isLoading && !error && (
        <Stack spacing={2} mb={4}>
          {new Array(7).fill(1).map((_, ind) => (
            <Skeleton
              key={ind}
              height={80}
              sx={{
                transform: "none",
                WebkitTransform: "none",
              }}
            />
          ))}
        </Stack>
      )}
      {menuItems && (
        <>
          <Stack spacing={2} mb={4}>
            {itemsList}
          </Stack>
          <Stack alignItems={"center"} mt={"auto"}>
            <Pagination
              page={Number(page) || 1}
              count={menuItems?.last_page || 1}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/configure-menu?${queryStringify(queryObj, {
                    page: item.page,
                  })}`}
                  {...item}
                />
              )}
            />
          </Stack>
        </>
      )}
      {curId && (
        <DeleteDialog
          title="Удалить блюдо"
          about={
            <>
              Вы уверены, что хотите удалить выбранное <br /> блюдо из меню?
            </>
          }
          open={deleteOpen}
          onClose={closeDeleteDialog}
          deleteHandler={() => deleteItemHandler(curId)}
        />
      )}
      <Snackbar
        open={snackbar}
        onClose={closeSnackbar}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={5000}
      >
        <Alert
          onClose={closeSnackbar}
          severity="error"
          sx={{
            width: "100%",
            bgcolor: "#fff",
            color: "#2f3138",
            borderLeft: "3px solid #ff1f00",
          }}
        >
          При выполнении операции произошла ошибка. Попробуйте еще раз
        </Alert>
      </Snackbar>
      {currentItem && (
        <ConfigureMenuAddDialog
          open={addOpen}
          onClose={() => {
            setAddOpen(false);
            setCurId(null);
          }}
          menuItem={currentItem}
          type="update"
        />
      )}
    </>
  );
};

export default ConfigureMenuProducts;
