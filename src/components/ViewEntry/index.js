import React, { useEffect, useState } from "react";

import {
  Typography,
  Box,
  IconButton,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ModalWrapper from "../ModalWrapper";
import One from "../AddEntry/One";
import Two from "../AddEntry/Two";
import Three from "../AddEntry/Three";
import Four from "../AddEntry/Four";
import { useDispatch, useSelector } from "react-redux";
import entriesService from "../../services/entriesService";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { openAttachmentModel } from "../../redux/globalSlice";
import { useTheme } from "@mui/material/styles";
import isPdfFile from "../../utils/isPdfFile";
import Lottie from "react-lottie";
import lightAnime from "../../assets/animations/viewEntryDay.json";
import darkAnime from "../../assets/animations/viewEntryNight.json";
import { useAuth } from "@clerk/clerk-react";
import { setIsLoading as setIsLoadingEntries } from "../../redux/entriesSlice";

function ViewEntryModel({ open, handleClose }) {
  const [entry, setEntry] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const clerkAuth = useAuth();

  const theme = useTheme();
  const { theme: selectedTheme } = useSelector((state) => state.global);

  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: selectedTheme === "light" ? lightAnime : darkAnime,
  };

  const { selectedEntry } = useSelector((state) => state.entries);

  const dispatch = useDispatch();

  const handleAttachmentOpen = () => dispatch(openAttachmentModel());

  const retrieveSelectedEntry = async () => {
    setIsLoading(true);
    const authToken = await clerkAuth.getToken();
    const res = await entriesService.getEntry(authToken, selectedEntry);
    setEntry(res);
    setIsLoading(false);
  };

  const toggleEditMode = () => setIsEdit((preV) => !preV);

  const handleChangeEntry = (name, value) => {
    setEntry((preV) => {
      return { ...preV, [name]: value };
    });
  };

  const handleConfirm = async () => {
    const authToken = await clerkAuth.getToken();
    const res = await entriesService.updateEntry(
      authToken,
      selectedEntry,
      entry
    );
    if (res && !res.err) {
      setIsEdit(false);
    }
  };

  const handleDelete = async () => {
    const authToken = await clerkAuth.getToken();
    const res = await entriesService.deleteEntry(authToken, selectedEntry);
    if (res && !res.err) {
      dispatch(setIsLoadingEntries(true));
      handleClose();
    }
  };

  const toggleIsExpanded = () => {
    if (isPdfFile(entry.file)) {
      handleAttachmentOpen();
    } else setIsExpanded((preV) => !preV);
  };

  useEffect(() => {
    if (selectedEntry) retrieveSelectedEntry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEntry, isEdit]);

  return (
    <>
      <ModalWrapper
        open={open}
        styles={{
          p: 0,
          width: { xs: "80%", sm: isExpanded ? 800 : 400 },
        }}
      >
        <Grid container sx={{ position: "relative" }}>
          <Grid
            item
            sm={isExpanded ? 6 : 12}
            xs={12}
            p={2}
            sx={{ position: "relative" }}
          >
            <Typography
              variant="h6"
              align="center"
              mb={2}
              sx={{ position: "relative" }}
            >
              {isEdit ? "Edit" : "View"} Details
              <IconButton
                size="small"
                color="primary"
                sx={{ position: "absolute", top: 0, right: 0 }}
                onClick={handleClose}
              >
                <CloseIcon size="small" />
              </IconButton>
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <One
                type={entry?.type}
                disabled={!isEdit}
                onChangeType={(value) => {
                  handleChangeEntry("type", value);
                }}
                compact
              />
              <Four
                eventDate={entry?.eventDate}
                onChangeEventDate={(value) => {
                  handleChangeEntry("eventDate", value);
                }}
                disabled={!isEdit}
                compact
              />
            </Box>

            <Two
              title={entry?.title}
              onChangeTitle={(value) => {
                handleChangeEntry("title", value);
              }}
              subtitle={entry?.subtitle}
              onChangeSubtitle={(value) => {
                handleChangeEntry("subtitle", value);
              }}
              disabled={!isEdit}
              compact
            />

            <Three
              description={entry?.description}
              onChangeDescription={(value) => {
                handleChangeEntry("description", value);
              }}
              disabled={!isEdit}
            />

            {/* entry?.files.map((file) => return ...) */}
            <Box mb={1} mt={1}>
              <Button
                variant={entry?.file ? "outlined" : "text"}
                fullWidth
                onClick={toggleIsExpanded}
                disabled={!entry?.file}
              >
                {entry?.file
                  ? isExpanded
                    ? "Close Preview"
                    : "Preview Attachment"
                  : "No Attachment present"}
              </Button>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <IconButton
                  color="primary"
                  size="small"
                  onClick={toggleEditMode}
                >
                  {isEdit ? "Cancel" : <EditIcon />}
                </IconButton>
                {!isEdit && (
                  <IconButton
                    color="warning"
                    size="small"
                    onClick={handleDelete}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
              <Button
                variant="contained"
                size="small"
                onClick={isEdit ? handleConfirm : handleClose}
              >
                {isEdit ? "Confirm" : "Close"}
              </Button>
            </Box>

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
          </Grid>
          {isExpanded && (
            <>
              <Grid
                item
                sm={isExpanded ? 6 : 0}
                xs={12}
                component="img"
                sx={{
                  objectFit: "cover",
                  height: { xs: 100, sm: "auto" },
                }}
                alt="attachment"
                src={entry?.file}
              />
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  [theme.breakpoints.down("sm")]: { bottom: 15 },
                  [theme.breakpoints.up("sm")]: {
                    top: 15,
                  },
                  right: 20,
                  background: theme.palette.background.default,
                  color: theme.palette.primary.main,
                }}
                onClick={toggleIsExpanded}
              >
                <CloseIcon fontSize="12" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  [theme.breakpoints.down("sm")]: { bottom: 50 },
                  [theme.breakpoints.up("sm")]: {
                    top: 50,
                  },
                  right: 20,
                  background: theme.palette.background.default,
                  color: theme.palette.primary.main,
                }}
                onClick={() => {
                  toggleIsExpanded();
                  handleAttachmentOpen();
                }}
              >
                <OpenInFullIcon fontSize="12" />
              </IconButton>
            </>
          )}

          {isLoading && (
            <Box
              sx={{
                top: "50%",
                right: "50%",
                transform: " translate(30%, -50%)",
                position: "absolute",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </ModalWrapper>
    </>
  );
}

export default ViewEntryModel;
