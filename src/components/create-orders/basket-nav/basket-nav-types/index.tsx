// components
import { Grid, Skeleton, SvgIcon } from "@mui/material";
//utils
import { useGetMenuTypesQuery } from "@/store/api/menu";
import ConfigureMenuLink from "@/components/configure-menu/configure-menu-link";

type PropType = {
  menuType: string;
  setMenuType: (type: string) => void;
};

const BasketNavTypes = ({ menuType, setMenuType }: PropType) => {
  const { data: menuTypes, isLoading, error } = useGetMenuTypesQuery(1);

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
                type.title.en.toLowerCase() === menuType ? "active" : ""
              }`}
              startIcon={
                <SvgIcon>
                  <g dangerouslySetInnerHTML={{ __html: type.logo }} />
                </SvgIcon>
              }
              onClick={() => setMenuType(type.title.en.toLowerCase())}
            >
              {type.title.ru}
            </ConfigureMenuLink>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default BasketNavTypes;
