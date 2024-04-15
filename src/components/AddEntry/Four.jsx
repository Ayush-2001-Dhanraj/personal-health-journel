import React from "react";
import dayjs from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DateField } from "@mui/x-date-pickers/DateField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box } from "@mui/material";

function Four({ eventDate, onChangeEventDate, disabled, compact }) {
  const handleEventDateChange = (newDate) => {
    onChangeEventDate?.(new Date(newDate).toISOString());
  };

  return (
    <Box mt={1} mb={1}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {disabled || compact ? (
          <DateField
            disabled={disabled}
            value={dayjs(eventDate)}
            // defaultValue={dayjs("2022-04-17")}
            label="Event Date"
            fullWidth
            onChange={handleEventDateChange}
            variant="standard"
          />
        ) : (
          <DateCalendar
            disabled={disabled}
            // defaultValue={dayjs("2022-04-17")}
            value={dayjs(eventDate)}
            onChange={handleEventDateChange}
            sx={{ width: "100%" }}
          />
        )}
      </LocalizationProvider>
    </Box>
  );
}

export default Four;
