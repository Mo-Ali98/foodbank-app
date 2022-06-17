import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

interface Props {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/login"} />;
  }
};
