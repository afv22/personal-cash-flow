import React, { useContext } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./App.react";
import CashFlowAppReact from "./CashFlowApp.react";

export default ({}) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth.isAuth) {
    return (
      <Button variant="contained" onClick={() => navigate("/login")}>
        Login
      </Button>
    );
  }

  return <CashFlowAppReact />;
};
