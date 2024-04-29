import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fab, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { VerticalTimeline } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import Entry from "../components/Entry";
import AddEntryModal from "../components/AddEntry";
import ViewEntryModel from "../components/ViewEntry";
import { resetSelectedEntry, setSelectedEntry } from "../redux/entriesSlice";
import {
  closeAddModel,
  closeAttachmentModel,
  closeViewModel,
  openAddModel,
  openViewModel,
} from "../redux/globalSlice";
import AttachmentPreview from "../components/AttachmentPreview";

function Dashboard() {
  const { entries } = useSelector((state) => state.entries);

  const dispatch = useDispatch();

  const { isAddModelOpen, isViewModelOpen, isAttachmentModelOpen } =
    useSelector((state) => state.global);
  const handleAddOpen = () => dispatch(openAddModel());
  const handleAddClose = () => dispatch(closeAddModel());

  const handleViewOpen = () => dispatch(openViewModel());
  const handleViewClose = () => {
    dispatch(resetSelectedEntry());
    dispatch(closeViewModel());
  };

  const handleAttachmentClose = () => dispatch(closeAttachmentModel());

  const handleEntryClick = (r) => {
    dispatch(setSelectedEntry(r._id));
    handleViewOpen();
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 70px)",
        overflow: "auto",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
      pt={2}
    >
      {/* Add Entry Btn */}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Fab
          size="small"
          color="primary"
          onClick={handleAddOpen}
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
      <VerticalTimeline>
        {entries &&
          entries.map((e) => (
            <Entry r={e} onClick={handleEntryClick} key={e._id} />
          ))}
      </VerticalTimeline>

      {/* models */}
      {isAddModelOpen && (
        <AddEntryModal open={isAddModelOpen} handleClose={handleAddClose} />
      )}
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
