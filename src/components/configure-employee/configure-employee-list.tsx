import { useCallback, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
//
import { Pagination, PaginationItem, Skeleton, Stack } from "@mui/material";
import ConfigureEmployeeItem from "./configure-employee-item";
import ConfigureEmployeeDialog from "./configure-employee-dialog";
import HttpError from "../http-error";
//
import { useGetAllStaffsQuery, useGetStaffRolesQuery } from "@/store/api/staff";
import { queryMaker, queryStringify } from "@/utils/helpers/query";

const ConfigureEmployeeList = () => {
  const [open, setOpen] = useState(false);
  const [curId, setCurId] = useState<number | null>(null);

  const { search } = useLocation();
  const queryObj = queryMaker(search);
  const { page } = queryObj;

  const { data: employees, isLoading, error } = useGetAllStaffsQuery({ page });
  const { data: roles } = useGetStaffRolesQuery();

  const curItem = useMemo(() => {
    if (curId) {
      return employees?.data.find((el) => el.id === curId);
    }
  }, [curId, employees?.data]);

  const openHandler = useCallback((id: number) => {
    setOpen(true);
    setCurId(id);
  }, []);

  const closeHandler = useCallback(() => {
    setOpen(false);
    setCurId(null);
  }, []);

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
          new Array(7).fill(1).map((_, ind) => (
            <Skeleton
              key={ind}
              height={80}
              sx={{
                transform: "none",
                WebkitTransform: "none",
              }}
            />
          ))}
        {employees?.data.map((emp) => (
          <ConfigureEmployeeItem
            openDialog={openHandler}
            emp={emp}
            key={emp.id}
          />
        ))}
      </Stack>

      {employees && (
        <Stack alignItems={"center"} pt={4} mt={"auto"}>
          <Pagination
            page={Number(page) || 1}
            count={employees?.last_page || 1}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/configure-employee?${queryStringify(queryObj, {
                  page: item.page,
                })}`}
                {...item}
              />
            )}
          />
        </Stack>
      )}

      {curItem && roles && (
        <ConfigureEmployeeDialog
          open={open}
          onClose={closeHandler}
          emp={curItem}
          roles={roles}
          type="update"
        />
      )}
    </Stack>
  );
};

export default ConfigureEmployeeList;
