import React, { useContext } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./App.react";
import CashFlowAppReact from "./cashflow/CashFlowApp.react";

export default () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  return auth.isAuth ? (
    <CashFlowAppReact />
  ) : (
    <Button variant="contained" onClick={() => navigate("/login")}>
      Login
    </Button>
  );
};
