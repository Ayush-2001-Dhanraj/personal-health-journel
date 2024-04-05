import React from "react";

import { Box, Modal } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", sm: 400 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 1,
  p: 2,
};

function ModalWrapper({ open, children }) {
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>{children}</Box>
      </Modal>
    </>
  );
}

export default ModalWrapper;
