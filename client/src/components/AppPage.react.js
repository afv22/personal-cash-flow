import React, { useState } from "react";
import { Button, Drawer } from "@mui/material";
import { Menu } from "@mui/icons-material";
import SideMenu from "./SideMenu.react";
import CashFlowApp from "./cashflow/CashFlowApp.react";

export default () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = setIsOpen;

  return (
    <React.Fragment>
      <Button onClick={() => toggleDrawer(true)}>
        <Menu />
      </Button>
      <CashFlowApp />
      <Drawer anchor="left" open={isOpen} onClose={() => toggleDrawer(false)}>
        <SideMenu toggleDrawer={toggleDrawer} />
      </Drawer>
    </React.Fragment>
  );
};
