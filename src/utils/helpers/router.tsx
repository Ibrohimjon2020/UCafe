//
import { ReactElement } from "react";
// Components
import ProtectedRoutes from "../../components/protected-routes";
// Types
import { PathType } from "../../interface/path";

type returnPathType = {
  path: string;
  element: ReactElement;
};

type returnType = {
  children?: returnPathType[];
} & returnPathType;

export function routerMaker({
  path,
  element,
  children,
  private: isPrivate,
}: PathType): returnType {
  return {
    path,
    element: isPrivate ? <ProtectedRoutes>{element}</ProtectedRoutes> : element,
    children: children?.map((child) => routerMaker(child)),
  };
}
