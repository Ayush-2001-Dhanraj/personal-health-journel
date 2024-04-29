import React from "react";

import { Box, Typography, IconButton } from "@mui/material";
import BiotechIcon from "@mui/icons-material/Biotech";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { setSelectedEntry } from "../redux/entriesSlice";
import { openAttachmentModel } from "../redux/globalSlice";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import dayjs from "dayjs";

function Entry({ r, onClick }) {
  const dispatch = useDispatch();

  const theme = useTheme();

  const handleAttachmentClick = (e) => {
    e.stopPropagation();
    dispatch(setSelectedEntry(r._id));
    dispatch(openAttachmentModel());
  };

  return (
    <VerticalTimelineElement
      key={r._id}
      className="vertical-timeline-element--work"
      contentStyle={{
        background: theme.palette.primary.main,
      }}
      contentArrowStyle={{
        borderRight: `7px solid  ${theme.palette.primary.main}`,
      }}
      date={dayjs(r.eventDate).format("LL")}
      iconStyle={{
        background: theme.palette.background.default,
        color: theme.palette.primary.main,
      }}
      icon={r.type === "GEN" ? <ReceiptIcon /> : <BiotechIcon />}
    >
      <Box
        p={1}
        onClick={() => onClick(r)}
        sx={{
          color: theme.palette.background.default,
          cursor: "pointer",
          border: `1px solid ${theme.palette.background.default}`,
          "&:hover": { boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" },
        }}
        borderRadius={1}
      >
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
        {r.file && (
          <IconButton
            onClick={handleAttachmentClick}
            size="small"
            color="secondary"
            background="primary"
          >
            <AttachFileIcon fontSize="2" />
          </IconButton>
        )}
      </Box>
    </VerticalTimelineElement>
  );
}

export default Entry;
