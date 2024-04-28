import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import ModelWrapper from "./ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import { closeAttachmentModel, openViewModel } from "../redux/globalSlice";
import { Viewer } from "@react-pdf-viewer/core";
import useToken from "../hooks/useToken";
import entriesService from "../services/entriesService";

function AttachmentPreview({ open, handleClose }) {
  const [attachment, setAttachment] = useState("");
  const [fileType, setFileType] = useState("");

  const [token] = useToken();

  const { selectedEntry } = useSelector((state) => state.entries);

  const dispatch = useDispatch();

  const handleViewCompleteEntry = () => {
    dispatch(closeAttachmentModel());
    dispatch(openViewModel());
  };

  const handleDownload = () => {
    window.open(attachment, "_blank");
  };

  useEffect(() => {
    const getFileType = () => {
      const extension = attachment.split(".").pop().toLowerCase();
      if (extension === "pdf") {
        setFileType("pdf");
      } else if (
        extension === "jpg" ||
        extension === "jpeg" ||
        extension === "png" ||
        extension === "gif"
      ) {
        setFileType("image");
      } else {
        console.error("Unsupported file type");
      }
    };

    if (attachment) getFileType();
  }, [attachment]);

  const retrieveAttachment = async () => {
    const res = await entriesService.getAttachment(token, selectedEntry);
    if (res.file) setAttachment(res.file);
  };

  useEffect(() => {
    if (selectedEntry && token) {
      retrieveAttachment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEntry, token]);

  return (
    <ModelWrapper open={open} styles={{ width: { xs: "80%", sm: "70%" } }}>
      <Typography variant="h6" align="center">
        Attachment Preview
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 320,
          overflow: "auto",
        }}
        mt={2}
        mb={2}
      >
        {fileType === "pdf" ? (
          <Viewer fileUrl={attachment} />
        ) : (
          <Box
            component="img"
            sx={{
              height: 300,
              maxHeight: { xs: 200, md: 300 },
              cursor: "pointer",
              border: "1px solid",
            }}
            alt="attachment"
            src={attachment}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Button variant="contained" onClick={handleDownload}>
          Download
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
