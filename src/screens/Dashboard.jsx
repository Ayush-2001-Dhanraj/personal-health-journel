import React, { useState } from "react";
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

function Dashboard() {
  const { entries } = useSelector((state) => state.entries);

  const dispatch = useDispatch();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const handleAddOpen = () => setIsAddOpen(true);
  const handleAddClose = () => setIsAddOpen(false);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const handleViewOpen = () => setIsViewOpen(true);
  const handleViewClose = () => {
    dispatch(resetSelectedEntry());
    setIsViewOpen(false);
  };

  const handleEntryClick = (r) => {
    console.log("sdk Entry clicked", r);
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
      <AddEntryModal open={isAddOpen} handleClose={handleAddClose} />
      <ViewEntryModel open={isViewOpen} handleClose={handleViewClose} />
    </Box>
  );
}

export default Dashboard;
