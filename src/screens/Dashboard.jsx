import React from "react";
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

function Dashboard() {
  const { records } = useSelector((state) => state.global);
  console.log("sdk records", records);
  return (
    <Box>
      {/* Add Entry Btn */}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Fab size="small" color="primary">
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
                <Record r={r} />
              </TimelineContent>
            </TimelineItem>
          ))}
      </Timeline>
    </Box>
  );
}

export default Dashboard;
