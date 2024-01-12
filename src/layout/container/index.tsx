import Header from "@/components/header";
import { ReactElement } from "react";

type PropType = {
  children: ReactElement;
};

const Container = ({ children }: PropType) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Container;
