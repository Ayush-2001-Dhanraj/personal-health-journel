import React from "react";
import { Box, Typography } from "@mui/material";
import { Editor } from "primereact/editor";
import LoopIcon from "@mui/icons-material/Loop";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import dayjs from "dayjs";

function EventPreview({ event }) {
  const renderHeader = () => {
    return <Typography variant="subtitle2">Description</Typography>;
  };

  const header = renderHeader();

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Entry Preview
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between" }} mb={1}>
        <Box>
          <Box mb={1}>
            <Typography variant="subtitle2">Title</Typography>
            <Typography variant="h6">{event?.title || "--"}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">Subtitle</Typography>
            <Typography variant="h6">{event?.subtitle || "--"}</Typography>
          </Box>
        </Box>
        <Box>
          <Box mb={1}>
            <Typography variant="subtitle2" align="right">
              Type
            </Typography>
            <Typography variant="h6" align="right">
              {event?.type || "--"}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" align="right">
              Event Date
            </Typography>
            <Typography variant="h6" align="right">
              {dayjs(event?.eventDate).format("YYYY-MM-DD") || "--"}
            </Typography>
          </Box>
        </Box>
      </Box>

      {event?.type !== "GEN" && (
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2">Hospital / Clinic Name</Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: "bolder" }}>
              {event?.hospitalName || "--"}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" align="center">
              Doctor Name
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bolder" }}
              align="center"
            >
              {event?.doctorName || "--"}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" align="right">
              Department
            </Typography>

            <Typography
              variant="subtitle2"
              align="right"
              sx={{ fontWeight: "bolder" }}
            >
              {event?.department || "--"}
            </Typography>
          </Box>
        </Box>
      )}

      {event?.type === "VIS" && event?.isRecurring && (
        <Box sx={{ flex: 1 }}>
          <Box sx={{ textAlign: "center" }}>
            <LoopIcon fontSize="large" />
          </Box>
          <Typography variant="subtitle2" align="center">
            <span style={{ fontWeight: "bolder" }}>
              {event?.repeatFrequency || "--"}
            </span>{" "}
            starting from{" "}
            <span style={{ fontWeight: "bolder" }}>
              {dayjs(event?.recurringStartDate).format("YYYY-MM-DD") || "--"}
            </span>
          </Typography>
        </Box>
      )}

      {event?.type === "TES" && event?.isTestAwaited && (
        <Box sx={{ flex: 1 }} mt={2}>
          <Box sx={{ textAlign: "center" }}>
            <HourglassTopIcon fontSize="large" />
          </Box>
          <Typography variant="subtitle2" align="center">
            Test Result expected by{" "}
            <span style={{ fontWeight: "bolder" }}>
              {dayjs(event?.testResultDate).format("YYYY-MM-DD") || "--"}
            </span>
          </Typography>
        </Box>
      )}

      <Box mt={1} mb={1}>
        <Editor
          value={event?.description}
          headerTemplate={header}
          readOnly
          style={{ height: "auto", fontSize: 16 }}
        />
      </Box>
    </Box>
  );
}

export default EventPreview;
