import { Box } from "@mui/material";
import React from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <Box
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <BeatLoader />
    </Box>
  );
};

export default Loading;
