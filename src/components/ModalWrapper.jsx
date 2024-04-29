import React from "react";

import { Box, Modal } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", sm: 400 },
  maxWidth: "90%",
  maxHeight: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 1,
  p: 2,
};

function ModalWrapper({ open, styles, children }) {
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modalStyle, ...styles }}>{children}</Box>
      </Modal>
    </>
  );
}

export default ModalWrapper;
