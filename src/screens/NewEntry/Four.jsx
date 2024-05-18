import React from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

function Four({ eventDate, onChangeEventDate, disabled, compact }) {
  const handleEventDateChange = (newDate) => {
    onChangeEventDate?.(new Date(newDate).toISOString());
  };

  return (
    <Box mt={1} mb={1} sx={{ display: "flex", flexDirection: "column" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disabled={disabled}
          value={dayjs(eventDate)}
          label="Event Date"
          onChange={handleEventDateChange}
        />
      </LocalizationProvider>
      <Box mt={1}>
        <Typography
          variant="subtitle2"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          Would you like to convert this into a repeating event?
          <HelpIcon fontSize="2" color="primary" />
        </Typography>
        <RadioGroup row defaultValue="No" style={{ marginLeft: 10 }}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Box>
      <Box mt={1} mb={1}>
        <Typography
          variant="subtitle2"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          Repeat Frequency
          <HelpIcon fontSize="2" color="primary" />
        </Typography>
        <RadioGroup row defaultValue="daily" style={{ marginLeft: 10 }}>
          <FormControlLabel
            value="daily"
            control={<Radio />}
            label="Every Day"
          />
          <FormControlLabel
            value="week"
            control={<Radio />}
            label="Every Week"
          />
          <FormControlLabel
            value="month"
            control={<Radio />}
            label="Every Month"
          />
        </RadioGroup>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker disabled={disabled} label="Start Recurring event from" />
      </LocalizationProvider>
    </Box>
  );
}

export default Four;
