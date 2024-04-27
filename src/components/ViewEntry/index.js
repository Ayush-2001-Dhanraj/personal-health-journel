import React, { useEffect, useState } from "react";

import { Typography, Box, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
import {
  closeAttachmentModel,
  openAttachmentModel,
} from "../../redux/globalSlice";
import AttachmentPreview from "../AttachmentPreview";

function ViewEntryModel({ open, handleClose }) {
  const [entry, setEntry] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const [token] = useToken();

  const { selectedEntry } = useSelector((state) => state.entries);
  const { isAttachmentModelOpen } = useSelector((state) => state.global);

  const dispatch = useDispatch();

  const handleAttachmentClose = () => dispatch(closeAttachmentModel());
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

  const handleAttachmentClick = () => {
    if (entry?.file) {
      handleAttachmentOpen();
      console.log("Attachments clicked");
    }
  };

  useEffect(() => {
    if (selectedEntry && token) retrieveSelectedEntry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEntry, isEdit, token]);

  return (
    <>
      <ModalWrapper open={open}>
        <Typography
          variant="h6"
          align="center"
          mb={2}
          sx={{ position: "relative" }}
        >
          Entry Details
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
            onClick={handleAttachmentClick}
          >
            {entry?.file ? "Preview Attachment" : "No Attachment present"}
          </Button>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <IconButton color="primary" size="small" onClick={toggleEditMode}>
              {isEdit ? "Cancel" : <EditIcon />}
            </IconButton>
            {!isEdit && (
              <IconButton color="warning" size="small" onClick={handleDelete}>
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
      </ModalWrapper>
      {isAttachmentModelOpen && (
        <AttachmentPreview
          open={isAttachmentModelOpen}
          handleClose={handleAttachmentClose}
          entry={entry}
        />
      )}
    </>
  );
}

export default ViewEntryModel;
