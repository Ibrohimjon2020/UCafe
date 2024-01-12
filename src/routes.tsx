import { useRoutes } from "react-router-dom";

import pathes from "./router-list";

import { routerMaker } from "./utils/helpers/router";

const Routes = () => {
  return useRoutes(
    pathes.map((path) => {
      return routerMaker(path);
    })
  );
};

export default Routes;
