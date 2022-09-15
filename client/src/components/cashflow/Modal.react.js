import React from "react";
import { Box, Button, Typography, Modal, Divider } from "@mui/material";

const modalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const NewModal = ({ open, closeModal, title, children }) => {
  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={modalBoxStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Divider sx={{ marginY: 2 }} variant="middle" />
        {children}
      </Box>
    </Modal>
  );
};

const ModalButton = ({ onClick, title }) => {
  return (
    <Button variant="contained" onClick={onClick} style={{ width: "120px" }}>
      {title}
    </Button>
  );
};

export default NewModal;
export { ModalButton };
