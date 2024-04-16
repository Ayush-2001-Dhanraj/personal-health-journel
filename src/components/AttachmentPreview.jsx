import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ModelWrapper from "./ModalWrapper";
import { useDispatch } from "react-redux";
import { closeAttachmentModel, openViewModel } from "../redux/globalSlice";

function AttachmentPreview({ open, handleClose }) {
  const dispatch = useDispatch();

  const handleViewCompleteEntry = () => {
    dispatch(closeAttachmentModel());
    dispatch(openViewModel());
  };

  const handleOpen = () => {
    console.log("Open attachment clicked");
  };

  return (
    <ModelWrapper open={open} styles={{ width: { xs: "80%", sm: "70%" } }}>
      <Typography variant="h6" align="center">
        Attachment Preview
      </Typography>
      <Box
        sx={{
          height: 300,
          maxHeight: { xs: 200, md: 300 },
          cursor: "pointer",
          border: "1px solid",
        }}
        mt={2}
        mb={2}
      ></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Button variant="contained" onClick={handleOpen}>
          Open
        </Button>
        <Box>
          <Button variant="outlined" onClick={handleViewCompleteEntry}>
            View Complete Entry
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </ModelWrapper>
  );
}

export default AttachmentPreview;
