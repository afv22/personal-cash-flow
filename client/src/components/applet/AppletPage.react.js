import React, { useEffect, useState } from "react";
import { IconButton, Drawer } from "@mui/material";
import { Menu } from "@mui/icons-material";
import SideMenu from "./SideMenu.react";
import AuthWrapper from "../auth/AuthWrapper.react";

const style = {
  menuButton: {
    margin: 0,
    bottom: "auto",
    left: 20,
    top: 20,
    right: "auto",
    position: "fixed",
  },
};

export default ({ applet, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.title = title || "";
  }, [title]);

  return (
    <AuthWrapper>
      <IconButton
        onClick={() => setIsOpen(true)}
        size="large"
        style={style.menuButton}
      >
        <Menu />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
        <SideMenu closeDrawer={() => setIsOpen(false)} />
      </Drawer>
      {applet}
    </AuthWrapper>
  );
};
