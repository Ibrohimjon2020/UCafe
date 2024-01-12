import { useLocation, useNavigate } from "react-router-dom";
// components
import { Grid, Skeleton, SvgIcon } from "@mui/material";
//utils
import { useGetMenuTypesQuery } from "@/store/api/menu";
import ConfigureMenuLink from "./configure-menu-link";
import { queryMaker } from "@/utils/helpers/query";

const ConfigureMenuTypes = () => {
  const navigate = useNavigate();

  const { data: menuTypes, isLoading, error } = useGetMenuTypesQuery(1);
  const { search } = useLocation();
  const queryObj = queryMaker(search);
  const { type: menuType } = queryObj;

  return (
    <>
      <Grid container spacing={2} mb={3}>
        {isLoading &&
          !error &&
          [1, 2, 3, 4, 5, 6].map((id) => (
            <Grid item md={2} key={id}>
              <Skeleton
                height={"50px"}
                sx={{
                  transform: "none",
                  WebkitTransform: "none",
                }}
              />
            </Grid>
          ))}
        {menuTypes?.data.map((type) => (
          <Grid item md={2} key={type.id}>
            <ConfigureMenuLink
              className={`${
                type.title.en.toLowerCase() === (menuType || "breakfast")
                  ? "active"
                  : ""
              }`}
              startIcon={
                <SvgIcon>
                  <g dangerouslySetInnerHTML={{ __html: type.logo }} />
                </SvgIcon>
              }
              onClick={() =>
                navigate(`/configure-menu?type=${type.title.en.toLowerCase()}`)
              }
            >
              {type.title.ru}
            </ConfigureMenuLink>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ConfigureMenuTypes;
