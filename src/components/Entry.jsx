import React from "react";

import { Box, Typography, IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import styles from "./Entry.module.css";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setSelectedEntry } from "../redux/entriesSlice";
import { openAttachmentModel } from "../redux/globalSlice";

function Entry({ r, onClick }) {
  const dispatch = useDispatch();

  const handleAttachmentClick = (e) => {
    e.stopPropagation();
    dispatch(setSelectedEntry(r._id));
    dispatch(openAttachmentModel());
    console.log("handleAttachmentClick clicked");
  };

  return (
    <Box className={styles.container} p={1} onClick={() => onClick(r)}>
      <Typography variant="caption">
        {dayjs(r.eventDate).format("LL")}
      </Typography>
      <Typography variant="h6">{r.title}</Typography>
      <Typography variant="subtitle2">{r.subtitle}</Typography>
      <Typography variant="body2">
        {r.description.length > 150
          ? r.description.substring(0, 150) + "..."
          : r.description}
      </Typography>
      <Typography variant="caption" sx={{ display: "block" }}>
        {r.type}
      </Typography>
      {true && (
        <IconButton onClick={handleAttachmentClick} size="small">
          <AttachFileIcon fontSize="2" />
        </IconButton>
      )}
    </Box>
  );
}

export default Entry;
