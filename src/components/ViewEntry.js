import React, { useEffect, useRef, useState } from "react";

import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModalWrapper from "./ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import entriesService from "../services/entriesService";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { openAttachmentModel, setIsLoading } from "../redux/globalSlice";
import Lottie from "react-lottie";
import lightAnime from "../assets/animations/viewEntryDay.json";
import darkAnime from "../assets/animations/viewEntryNight.json";
import { useAuth } from "@clerk/clerk-react";
import { setSelectedEntry } from "../redux/entriesSlice";
import EventPreview from "./EventPreview";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useNavigate } from "react-router-dom";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import { useTheme } from "@emotion/react";

function ViewEntryModel({ open, handleClose }) {
  const [entry, setEntry] = useState({});

  const navigate = useNavigate();

  const targetRef = useRef();

  const clerkAuth = useAuth();

  const theme = useTheme();

  const { theme: selectedTheme } = useSelector((state) => state.global);

  const { selectedEntry } = useSelector((state) => state.entries);

  const dispatch = useDispatch();

  const retrieveSelectedEntry = async () => {
    dispatch(setIsLoading(true));
    const authToken = await clerkAuth.getToken();
    const res = await entriesService.getEntry(authToken, selectedEntry);
    setEntry(res);
    dispatch(setIsLoading(false));
  };

  const handleDelete = async () => {
    const authToken = await clerkAuth.getToken();
    const res = await entriesService.deleteEntry(authToken, selectedEntry);
    if (res && !res.err) {
      dispatch(setIsLoading(true));
      handleClose();
    }
  };

  const options = {
    resolution: Resolution.NORMAL,
    page: {
      margin: Margin.SMALL,
    },
    canvas: {
      qualityRatio: 1,
    },
    overrides: {
      // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
      pdf: {
        compress: true,
      },
      // see https://html2canvas.hertzen.com/configuration for more options
      canvas: {
        useCORS: true,
      },
    },
    filename: entry.title || "entry",
  };

  const handleDownloadClick = () => {
    generatePDF(targetRef, options);
  };

  const handleAttachmentClick = () => {
    dispatch(setSelectedEntry(entry._id));
    dispatch(openAttachmentModel());
  };

  const handleCrossClick = () => {
    dispatch(setSelectedEntry(null));
    handleClose();
  };

  const handleEditClick = () => {
    handleClose();
    dispatch(setSelectedEntry(entry._id));
    navigate("/new");
  };

  useEffect(() => {
    if (selectedEntry) retrieveSelectedEntry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEntry]);

  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: selectedTheme === "light" ? lightAnime : darkAnime,
  };

  return (
    <>
      <ModalWrapper
        open={open}
        styles={{
          p: 2,
          width: { xs: "80%", sm: 600 },
        }}
      >
        <Box ref={targetRef}>
          <Box
            sx={{
              position: "absolute",
              top: { xs: 0, sm: 10 },
              right: { xs: 0, sm: 10 },
              transform: { xs: "translate(0, -50%)", sm: "none" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              background: theme.palette.background.default,
              boxSizing: "border-box",
              paddingLeft: { xs: 2, sm: 0 },
              paddingRight: { xs: 2, sm: 0 },
            }}
            borderRadius={4}
          >
            <IconButton
              color="primary"
              size="small"
              onClick={handleDownloadClick}
            >
              <DownloadOutlinedIcon />
            </IconButton>
            {entry?.file && (
              <IconButton
                color="primary"
                size="small"
                onClick={handleAttachmentClick}
              >
                <AttachFileIcon />
              </IconButton>
            )}
            <IconButton color="primary" size="small" onClick={handleDelete}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
            <IconButton color="primary" size="small" onClick={handleEditClick}>
              <EditOutlinedIcon />
            </IconButton>
            <IconButton color="primary" size="small" onClick={handleCrossClick}>
              <CloseIcon />
            </IconButton>
          </Box>

          <EventPreview event={entry} />
          <Box
            sx={{
              position: "absolute",
              top: -50,
              left: "-50%",
              width: "100%",
            }}
          >
            <Lottie
              speed={0.6}
              options={animationOptions}
              height={100}
              width={100}
            />
          </Box>
        </Box>
      </ModalWrapper>
    </>
  );
}

export default ViewEntryModel;
