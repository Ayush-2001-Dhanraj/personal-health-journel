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
  Tooltip,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

function Four({
  type,
  eventDate,
  onChangeEventDate,
  isRecurring,
  onChangeIsRecurring,
  repeatFrequency,
  onChangeRepeatFrequency,
  recurringStartDate,
  onChangeRecurringStartDate,
  isTestAwaited,
  onChangeIsTestAwaited,
  testResultDate,
  onChangeTestResultDate,
  disabled,
  compact,
}) {
  const handleEventDateChange = (newDate) => {
    onChangeEventDate?.(new Date(newDate).toISOString());
  };

  const handleIsRecurringChange = (e) => {
    onChangeIsRecurring?.(!!+e.target.value);
  };

  const handleRepeatFrequencyChange = (e) => {
    onChangeRepeatFrequency?.(e.target.value);
  };

  const handleRecurringStartDateChange = (newDate) => {
    onChangeRecurringStartDate?.(new Date(newDate).toISOString());
  };

  const handleIsTestAwaitedChange = (e) => {
    onChangeIsTestAwaited?.(!!+e.target.value);
  };

  const handleTestResultDate = (newDate) => {
    onChangeTestResultDate?.(new Date(newDate).toISOString());
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

      {type === "TES" && (
        <>
          <Box mt={1}>
            <Typography
              variant="subtitle2"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              Is this test awaited?
            </Typography>
            <RadioGroup
              row
              value={isTestAwaited ? 1 : 0}
              onChange={handleIsTestAwaitedChange}
              style={{ marginLeft: 10 }}
            >
              <FormControlLabel value={1} control={<Radio />} label="Yes" />
              <FormControlLabel value={0} control={<Radio />} label="No" />
            </RadioGroup>
          </Box>
          {isTestAwaited && (
            <Box mt={1}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(testResultDate)}
                  onChange={handleTestResultDate}
                  disabled={disabled}
                  label="Test arrival expected on"
                />
              </LocalizationProvider>
            </Box>
          )}
        </>
      )}

      {type === "VIS" && (
        <>
          <Box mt={1}>
            <Typography
              variant="subtitle2"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              Would you like to convert this into a repeating event?
              <Tooltip
                title="Yes if you have to do the same thing often."
                placement="right"
              >
                <HelpIcon fontSize="2" color="primary" />
              </Tooltip>
            </Typography>

            <RadioGroup
              row
              value={isRecurring ? 1 : 0}
              onChange={handleIsRecurringChange}
              style={{ marginLeft: 10 }}
            >
              <FormControlLabel value={1} control={<Radio />} label="Yes" />
              <FormControlLabel value={0} control={<Radio />} label="No" />
            </RadioGroup>
          </Box>

          {isRecurring && (
            <>
              <Box mt={1} mb={1}>
                <Typography
                  variant="subtitle2"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  Repeat Frequency
                  <Tooltip
                    title="How often do you have to repeat this?"
                    placement="right"
                  >
                    <HelpIcon fontSize="2" color="primary" />
                  </Tooltip>
                </Typography>

                <RadioGroup
                  row
                  onChange={handleRepeatFrequencyChange}
                  value={repeatFrequency}
                  style={{ marginLeft: 10 }}
                >
                  <FormControlLabel
                    value="DAILY"
                    control={<Radio />}
                    label="Every Day"
                  />
                  <FormControlLabel
                    value="WEEKLY"
                    control={<Radio />}
                    label="Every Week"
                  />
                  <FormControlLabel
                    value="MONTHLY"
                    control={<Radio />}
                    label="Every Month"
                  />
                </RadioGroup>
              </Box>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(recurringStartDate) || ""}
                  onChange={handleRecurringStartDateChange}
                  disabled={disabled}
                  label="Start Recurring event from"
                />
              </LocalizationProvider>
            </>
          )}
        </>
      )}
    </Box>
  );
}

export default Four;
