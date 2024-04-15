import React from "react";
import { TextField, Box } from "@mui/material";

function Two({
  title,
  onChangeTitle,
  subtitle,
  onChangeSubtitle,
  disabled,
  compact,
}) {
  return (
    <>
      <Box mt={1}>
        <TextField
          label="Title"
          value={title || "--"}
          disabled={disabled}
          helperText={disabled || compact ? "" : "Enter Title of the Entry"}
          variant="standard"
          required={!disabled}
          fullWidth
        />
      </Box>
      <Box mt={1}>
        <TextField
          label="Subtitle"
          value={subtitle || "--"}
          disabled={disabled}
          helperText={disabled || compact ? "" : "Enter Title of the Entry"}
          variant="standard"
          fullWidth
        />
      </Box>
    </>
  );
}

export default Two;
