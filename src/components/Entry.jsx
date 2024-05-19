import React, { useState } from "react";

import { Box, Typography, IconButton } from "@mui/material";
import BiotechIcon from "@mui/icons-material/Biotech";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEntry } from "../redux/entriesSlice";
import { openAttachmentModel, setIsLoading } from "../redux/globalSlice";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import DeleteIcon from "@mui/icons-material/Delete";
import Lottie from "react-lottie";
import lightAnime from "../assets/animations/addEntryDay.json";
import darkAnime from "../assets/animations/addEntryNight.json";
import dayjs from "dayjs";
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
    dispatch(setIsLoading(true));
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
        padding: 4,
      }}
      contentArrowStyle={{
        borderRight: `7px solid  ${theme.palette.primary.main}`,
      }}
      date={dayjs(r.eventDate).format("LL")}
      iconStyle={{
        background: theme.palette.background.default,
        color: theme.palette.primary.main,
      }}
      icon={
        r.type === "GEN" ? (
          <ReceiptIcon size="small" />
        ) : (
          <BiotechIcon size="small" />
        )
      }
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
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {r.title}
          <Typography variant="caption">{r.type}</Typography>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle2" sx={{ flex: 1 }}>
            {r.subtitle}
          </Typography>

          <Box>
            {r.file && (
              <IconButton
                onClickCapture={handleAttachmentClick}
                size="small"
                sx={{ color: theme.palette.background.default }}
              >
                <AttachFileIcon fontSize="2" />
              </IconButton>
            )}
            <IconButton
              onClickCapture={handleDelete}
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
