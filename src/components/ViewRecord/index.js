import React from "react";

import { Typography, Box, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ModalWrapper from "../ModalWrapper";
import One from "../AddRecord/One";
import Two from "../AddRecord/Two";
import Three from "../AddRecord/Three";

function ViewRecordModel({ open, handleClose }) {
  return (
    <ModalWrapper open={open}>
      <Typography
        variant="h6"
        align="center"
        mb={2}
        sx={{ position: "relative" }}
      >
        View Record
        <IconButton
          size="small"
          color="primary"
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={handleClose}
        >
          <CloseIcon size="small" />
        </IconButton>
      </Typography>

      <One />
      <Two />
      <Three />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" size="small">
          Edit
        </Button>
        <Button variant="contained" size="small" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </ModalWrapper>
  );
}

export default ViewRecordModel;
