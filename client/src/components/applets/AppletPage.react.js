import React, { useEffect, useState } from "react";
import { Button, Drawer } from "@mui/material";
import { Menu } from "@mui/icons-material";
import SideMenu from "./SideMenu.react";
import AuthWrapper from "../auth/AuthWrapper.react";

export default ({ applet, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.title = title || "";
  }, [title]);

  return (
    <AuthWrapper>
      <Button onClick={() => setIsOpen(true)}>
        <Menu />
      </Button>
      <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
        <SideMenu closeDrawer={() => setIsOpen(false)} />
      </Drawer>
      {applet}
    </AuthWrapper>
  );
};
