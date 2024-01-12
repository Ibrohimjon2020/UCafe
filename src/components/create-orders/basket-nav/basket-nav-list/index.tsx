import { useEffect, useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//
import { Pagination, PaginationItem, Skeleton, Stack } from "@mui/material";
import BasketNavItem from "../basket-nav-item";
//
import { StoreType } from "@/store";
import { queryMaker, queryStringify } from "@/utils/helpers/query";
import { useGetMenuItemsQuery, useGetMenuTypesQuery } from "@/store/api/menu";
import { addMenu } from "@/store/reducers/basket";

type PropType = {
  menuType: string;
};

const BasketNavList = ({ menuType }: PropType) => {
  const basket = useSelector((store: StoreType) => store.basket);
  const dispatch = useDispatch();

  const { basketId } = useParams();
  const { search } = useLocation();
  const queryObj = queryMaker(search);
  const { page } = queryObj;

  const { data: menuTypes } = useGetMenuTypesQuery(1);

  const typeId = useMemo(
    () =>
      menuTypes?.data.find((el) => el.title.en.toLowerCase() === menuType)?.id,
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
      status: 1,
    },
    { skip: !typeId }
  );

  useEffect(() => {
    if (basketId && menuItems?.data) {
      dispatch(
        addMenu({
          data: menuItems?.data || [],
          basket_id: basketId,
        })
      );
    }
  }, [dispatch, menuItems?.data, basketId]);

  return (
    <Stack spacing={2}>
      {isLoading && !error && (
        <>
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
        </>
      )}
      {basketId &&
        basket[basketId]?.menu
          ?.filter((item) => item.quantity > 0)
          .map((item) => {
            const itemInBasket = basket[basketId].basket.find(
              (menuItem) => menuItem.id === item.id
            );
            return (
              <BasketNavItem
                key={item.id}
                menuItem={itemInBasket ?? item}
                basket_id={basketId}
              />
            );
          })}
      {(menuItems?.last_page || 1) > 1 && (
        <Stack alignItems={"center"} mt={"auto"}>
          <Pagination
            page={Number(page) || 1}
            count={menuItems?.last_page || 1}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/orders/create/${basketId}?${queryStringify(queryObj, {
                  page: item.page,
                })}`}
                {...item}
              />
            )}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default BasketNavList;
