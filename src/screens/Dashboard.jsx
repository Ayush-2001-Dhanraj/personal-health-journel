import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fab, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { VerticalTimeline } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import Entry from "../components/Entry";
import ViewEntryModel from "../components/ViewEntry";
import { resetSelectedEntry, setSelectedEntry } from "../redux/entriesSlice";
import {
  closeAttachmentModel,
  closeViewModel,
  openViewModel,
  setIsLoading,
} from "../redux/globalSlice";
import AttachmentPreview from "../components/AttachmentPreview";
import EmptyEntries from "../components/EmptyEntries";
import Filter from "../components/Filter";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { entries } = useSelector((state) => state.entries);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isViewModelOpen, isAttachmentModelOpen } = useSelector(
    (state) => state.global
  );

  const reloadEntries = () => dispatch(setIsLoading(true));

  const handleAddNewClick = () => navigate("/new");

  const handleViewOpen = () => dispatch(openViewModel());
  const handleViewClose = () => {
    reloadEntries();
    dispatch(resetSelectedEntry());
    dispatch(closeViewModel());
  };

  const handleAttachmentClose = () => {
    reloadEntries();
    dispatch(closeAttachmentModel());
  };

  const handleEntryClick = (r) => {
    dispatch(setSelectedEntry(r._id));
    handleViewOpen();
  };

  useEffect(() => {
    dispatch(setSelectedEntry(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        flex: 1,
        overflow: "auto",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        position: "relative",
      }}
      pt={1}
    >
      {/* Add Entry Btn */}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Fab
          size="small"
          color="primary"
          onClick={handleAddNewClick}
          component={motion.button}
          whileTap={{ scale: 0.9 }}
          whileHover={{
            scale: 1.1,
            transition: { duration: 1 },
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
      {/* Timeline */}
      {!!entries.length ? (
        <VerticalTimeline>
          {entries.map((e) => (
            <Entry r={e} onClick={handleEntryClick} key={e._id} />
          ))}
        </VerticalTimeline>
      ) : (
        <EmptyEntries />
      )}

      {!!entries.length && <Filter />}

      {/* models */}
      {isViewModelOpen && (
        <ViewEntryModel open={isViewModelOpen} handleClose={handleViewClose} />
      )}
      {isAttachmentModelOpen && (
        <AttachmentPreview
          open={isAttachmentModelOpen}
          handleClose={handleAttachmentClose}
        />
      )}
    </Box>
  );
}

export default Dashboard;
