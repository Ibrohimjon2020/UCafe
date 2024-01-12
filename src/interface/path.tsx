import { ReactElement } from "react";

export type Path = {
  path: string;
  element: ReactElement;
  private: boolean;
};

export type PathType = {
  children?: Path[];
} & Path;
