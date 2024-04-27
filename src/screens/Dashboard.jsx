import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Fab, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

import Entry from "../components/Entry";
import AddEntryModal from "../components/AddEntry";
import ViewEntryModel from "../components/ViewEntry";
import { resetSelectedEntry, setSelectedEntry } from "../redux/entriesSlice";
import {
  closeAddModel,
  closeViewModel,
  openAddModel,
  openViewModel,
} from "../redux/globalSlice";

function Dashboard() {
  const { entries } = useSelector((state) => state.entries);

  const dispatch = useDispatch();

  const { isAddModelOpen, isViewModelOpen } = useSelector(
    (state) => state.global
  );
  const handleAddOpen = () => dispatch(openAddModel());
  const handleAddClose = () => dispatch(closeAddModel());

  const handleViewOpen = () => dispatch(openViewModel());
  const handleViewClose = () => {
    dispatch(resetSelectedEntry());
    dispatch(closeViewModel());
  };

  const handleEntryClick = (r) => {
    dispatch(setSelectedEntry(r._id));
    handleViewOpen();
  };

  return (
    <Box>
      {/* Add Entry Btn */}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Fab size="small" color="primary" onClick={handleAddOpen}>
          <AddIcon />
        </Fab>
      </Box>
      {/* Timeline */}
      <Timeline position="alternate">
        {entries &&
          entries.map((r) => (
            <TimelineItem key={r._id}>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Entry r={r} onClick={handleEntryClick} />
              </TimelineContent>
            </TimelineItem>
          ))}
      </Timeline>
      {/* models */}
      {isAddModelOpen && (
        <AddEntryModal open={isAddModelOpen} handleClose={handleAddClose} />
      )}
      {isViewModelOpen && (
        <ViewEntryModel open={isViewModelOpen} handleClose={handleViewClose} />
      )}
    </Box>
  );
}

export default Dashboard;
