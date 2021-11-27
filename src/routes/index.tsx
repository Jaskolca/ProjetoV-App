import React from "react";
import { useAuth } from "../hooks/auth";

import AppRoutes from "./app.routes";
import UserRoutes from "./user.routes";

const Routes: React.FC = () => {
  const { token } = useAuth();

  if (token) {
    return <UserRoutes />;
  }

  return <AppRoutes />;
};

export default Routes;
