import React, { useState } from "react";

import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import BiotechIcon from "@mui/icons-material/Biotech";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoading as setIsLoadingEntries,
  setSelectedEntry,
} from "../redux/entriesSlice";
import { openAttachmentModel } from "../redux/globalSlice";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Lottie from "react-lottie";
import lightAnime from "../assets/animations/addEntryDay.json";
import darkAnime from "../assets/animations/addEntryNight.json";
import dayjs from "dayjs";
import Invoice from "./Invoice";
import { useAuth } from "@clerk/clerk-react";
import entriesService from "../services/entriesService";

function Entry({ r, onClick }) {
  const [isAnimeVisible, setIsAnimeVisible] = useState(false);

  const dispatch = useDispatch();

  const clerkAuth = useAuth();

  const theme = useTheme();
  const { theme: selectedTheme } = useSelector((state) => state.global);

  const handleAttachmentClick = (e) => {
    e.stopPropagation();
    dispatch(setSelectedEntry(r._id));
    dispatch(openAttachmentModel());
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const authToken = await clerkAuth.getToken();
    await entriesService.deleteEntry(authToken, r._id);
    dispatch(setIsLoadingEntries(true));
  };

  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: selectedTheme === "light" ? lightAnime : darkAnime,
  };

  return (
    <VerticalTimelineElement
      key={r._id}
      className="vertical-timeline-element--work"
      contentStyle={{
        background: theme.palette.primary.main,
        position: "relative",
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
        onMouseOver={() => setIsAnimeVisible(true)}
        onMouseLeave={() => setIsAnimeVisible(false)}
      >
        <Typography variant="h5">{r.title}</Typography>
        <Typography variant="subtitle2">{r.subtitle}</Typography>
        <Typography variant="body2">
          {r.description.length > 150
            ? r.description.substring(0, 150) + "..."
            : r.description}
        </Typography>
        <Typography variant="caption" sx={{ display: "block" }}>
          {r.type}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            {r.file && (
              <IconButton
                onClick={handleAttachmentClick}
                size="small"
                sx={{ color: theme.palette.background.default }}
              >
                <AttachFileIcon fontSize="2" />
              </IconButton>
            )}
          </Box>
          <Box>
            <IconButton
              onClick={(e) => e.stopPropagation()}
              size="small"
              color="secondary"
              background="primary"
            >
              <PDFDownloadLink
                document={<Invoice entry={r} />}
                fileName={`${r.title}.pdf`}
                style={{
                  color: theme.palette.background.default,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {({ blob, url, loading, error }) =>
                  loading ? (
                    <CircularProgress color="secondary" size={20} />
                  ) : (
                    <DownloadIcon color="secondary" fontSize="6" />
                  )
                }
              </PDFDownloadLink>
            </IconButton>
            <IconButton
              onClick={handleDelete}
              size="small"
              color="secondary"
              background="primary"
            >
              <DeleteIcon fontSize="2" />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "-55%",
            width: "100%",
          }}
        >
          {isAnimeVisible && (
            <Lottie
              speed={0.7}
              options={animationOptions}
              height={100}
              width={100}
            />
          )}
        </Box>
      </Box>
    </VerticalTimelineElement>
  );
}

export default Entry;
