import React, { useEffect, useState } from "react";

import { Typography, Box, IconButton, Button, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ModalWrapper from "../ModalWrapper";
import One from "../AddEntry/One";
import Two from "../AddEntry/Two";
import Three from "../AddEntry/Three";
import Four from "../AddEntry/Four";
import { useDispatch, useSelector } from "react-redux";
import entriesService from "../../services/entriesService";
import useToken from "../../hooks/useToken";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { openAttachmentModel } from "../../redux/globalSlice";
import { useTheme } from "@mui/material/styles";

function ViewEntryModel({ open, handleClose }) {
  const [entry, setEntry] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [token] = useToken();

  const theme = useTheme();

  const { selectedEntry } = useSelector((state) => state.entries);

  const dispatch = useDispatch();

  const handleAttachmentOpen = () => dispatch(openAttachmentModel());

  const retrieveSelectedEntry = async () => {
    const res = await entriesService.getEntry(token, selectedEntry);
    setEntry(res);
  };

  const toggleEditMode = () => setIsEdit((preV) => !preV);

  const handleChangeEntry = (name, value) => {
    setEntry((preV) => {
      return { ...preV, [name]: value };
    });
  };

  const handleConfirm = async () => {
    const res = await entriesService.updateEntry(token, selectedEntry, entry);
    if (res && !res.err) {
      setIsEdit(false);
    }
  };

  const handleDelete = async () => {
    const res = await entriesService.deleteEntry(token, selectedEntry);
    if (res && !res.err) handleClose();
  };

  const toggleIsExpanded = () => setIsExpanded((preV) => !preV);

  const handleAttachmentClick = () => {
    toggleIsExpanded();
    if (entry?.file) handleAttachmentOpen();
  };

  useEffect(() => {
    if (selectedEntry && token) retrieveSelectedEntry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEntry, isEdit, token]);

  return (
    <>
      <ModalWrapper
        open={open}
        styles={{ p: 0, width: { xs: "80%", sm: isExpanded ? 800 : 400 } }}
      >
        <Grid container>
          <Grid item sm={isExpanded ? 6 : 12} xs={12} p={2}>
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
                onClick={handleAttachmentClick}
              >
                <OpenInFullIcon fontSize="12" />
              </IconButton>
            </>
          )}
        </Grid>
      </ModalWrapper>
    </>
  );
}

export default ViewEntryModel;
