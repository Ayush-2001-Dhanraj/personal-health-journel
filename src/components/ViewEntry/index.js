import React, { useEffect, useState } from "react";

import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModalWrapper from "../ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import entriesService from "../../services/entriesService";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { openAttachmentModel, setIsLoading } from "../../redux/globalSlice";
import Lottie from "react-lottie";
import lightAnime from "../../assets/animations/viewEntryDay.json";
import darkAnime from "../../assets/animations/viewEntryNight.json";
import { useAuth } from "@clerk/clerk-react";
import { setSelectedEntry } from "../../redux/entriesSlice";
import EventPreview from "../EventPreview";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useNavigate } from "react-router-dom";

function ViewEntryModel({ open, handleClose }) {
  const [entry, setEntry] = useState({});

  const navigate = useNavigate();

  const clerkAuth = useAuth();

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

  const handleDownloadClick = () => {};

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
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
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
      </ModalWrapper>
    </>
  );
}

export default ViewEntryModel;
