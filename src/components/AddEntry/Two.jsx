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
  const handleTitleChange = (e) => {
    onChangeTitle?.(e.target.value);
  };

  const handleSubtitleChange = (e) => {
    onChangeSubtitle?.(e.target.value);
  };

  return (
    <>
      <Box mt={1}>
        <TextField
          label="Title"
          value={title ? title : disabled ? "NA" : ""}
          disabled={disabled}
          helperText={disabled || compact ? "" : "Enter Title of the Entry"}
          variant="standard"
          required={!disabled}
          onChange={handleTitleChange}
          fullWidth
        />
      </Box>
      <Box mt={1}>
        <TextField
          label="Subtitle"
          value={subtitle ? subtitle : disabled ? "NA" : ""}
          disabled={disabled}
          helperText={disabled || compact ? "" : "Enter Title of the Entry"}
          variant="standard"
          onChange={handleSubtitleChange}
          fullWidth
        />
      </Box>
    </>
  );
}

export default Two;
