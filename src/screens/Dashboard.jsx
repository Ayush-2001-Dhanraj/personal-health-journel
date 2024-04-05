import React, { useState } from "react";
import { useSelector } from "react-redux";

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

import Record from "../components/Record";
import AddRecordModal from "../components/AddRecord";
import ViewRecordModel from "../components/ViewRecord";

function Dashboard() {
  const { records } = useSelector((state) => state.global);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const handleAddOpen = () => setIsAddOpen(true);
  const handleAddClose = () => setIsAddOpen(false);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const handleViewOpen = () => setIsViewOpen(true);
  const handleViewClose = () => setIsViewOpen(false);

  const handleRecordClick = (r) => {
    console.log("sdk Record clicked", r);
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
        {records &&
          records.map((r) => (
            <TimelineItem key={r.id}>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Record r={r} onClick={handleRecordClick} />
              </TimelineContent>
            </TimelineItem>
          ))}
      </Timeline>
      <AddRecordModal open={isAddOpen} handleClose={handleAddClose} />
      <ViewRecordModel open={isViewOpen} handleClose={handleViewClose} />
    </Box>
  );
}

export default Dashboard;
