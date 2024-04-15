import React, { useEffect, useState } from "react";

import { Typography, Box, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ModalWrapper from "../ModalWrapper";
import One from "../AddEntry/One";
import Two from "../AddEntry/Two";
import Three from "../AddEntry/Three";
import Four from "../AddEntry/Four";
import { useSelector } from "react-redux";
import entriesService from "../../services/entriesService";
import useToken from "../../hooks/useToken";

function ViewEntryModel({ open, handleClose }) {
  const [entry, setEntry] = useState({});
  const [isEdit, setIsEdit] = useState(true);

  const [token] = useToken();

  const { selectedEntry } = useSelector((state) => state.entries);

  const retrieveSelectedEntry = async () => {
    const res = await entriesService.getEntry(token, selectedEntry);
    setEntry(res);
  };

  const toggleEditMode = () => setIsEdit((preV) => !preV);

  useEffect(() => {
    if (selectedEntry) retrieveSelectedEntry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEntry]);

  return (
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
          disabled={isEdit}
          onChangeType={() => {}}
          compact
        />
        <Four
          eventDate={entry?.eventDate}
          onChangeEventDate={() => {}}
          disabled={isEdit}
          compact
        />
      </Box>
      <Two
        title={entry?.title}
        onChangeTitle={() => {}}
        subtitle={entry?.subtitle}
        onChangeSubtitle={() => {}}
        disabled={isEdit}
        compact
      />
      <Three
        description={entry?.description}
        onChangeDescription={() => {}}
        disabled={isEdit}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" size="small" onClick={toggleEditMode}>
          Edit
        </Button>
        <Button variant="contained" size="small" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </ModalWrapper>
  );
}

export default ViewEntryModel;
