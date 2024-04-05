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
import AddRecordModal from "../components/AddRecordModal";

function Dashboard() {
  const { records } = useSelector((state) => state.global);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRecordClick = (r) => {
    console.log("sdk Record clicked", r);
  };

  return (
    <Box>
      {/* Add Entry Btn */}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Fab size="small" color="primary" onClick={handleOpen}>
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
      <AddRecordModal open={open} handleClose={handleClose} />
    </Box>
  );
}

export default Dashboard;
