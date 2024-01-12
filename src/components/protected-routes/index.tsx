import React from "react";
import { Navigate } from "react-router";

import { useSelector } from "react-redux";
import { StoreType } from "@/store";

type PropType = {
  children: React.ReactNode;
};

const ProtectedRoutes = ({ children }: PropType) => {
  const isAuthentificated = useSelector((store: StoreType) => store.auth.token);

  return isAuthentificated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
