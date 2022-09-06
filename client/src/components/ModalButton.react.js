import React from "react";
import { Button } from "@mui/material";

export default ({ onClick, title }) => {
  return (
    <Button variant="contained" onClick={onClick} style={{ width: "120px" }}>
      {title}
    </Button>
  );
};
