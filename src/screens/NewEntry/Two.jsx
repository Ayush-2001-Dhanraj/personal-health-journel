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
          helperText={disabled || compact ? "" : "Title of the Entry"}
          variant="standard"
          required={!disabled}
          onChange={handleTitleChange}
          autoComplete="off"
          fullWidth
        />
      </Box>
      <Box mt={1}>
        <TextField
          label="Subtitle"
          value={subtitle ? subtitle : disabled ? "NA" : ""}
          disabled={disabled}
          helperText={disabled || compact ? "" : "Alternative title"}
          variant="standard"
          onChange={handleSubtitleChange}
          autoComplete="off"
          fullWidth
        />
      </Box>
      <Box mt={1}>
        <TextField
          label="Hospital / Clinic Name"
          value={subtitle ? subtitle : disabled ? "NA" : ""}
          disabled={disabled}
          helperText={disabled || compact ? "" : "Establishment u went to?"}
          variant="standard"
          onChange={handleSubtitleChange}
          autoComplete="off"
          fullWidth
        />
      </Box>
      <Box mt={1} sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Doctor Name"
          value={subtitle ? subtitle : disabled ? "NA" : ""}
          disabled={disabled}
          helperText={disabled || compact ? "" : "Who attended u?"}
          variant="standard"
          onChange={handleSubtitleChange}
          autoComplete="off"
          fullWidth
        />
        <TextField
          label="Department"
          value={subtitle ? subtitle : disabled ? "NA" : ""}
          disabled={disabled}
          helperText={disabled || compact ? "" : "Department u visited"}
          variant="standard"
          onChange={handleSubtitleChange}
          autoComplete="off"
          fullWidth
        />
      </Box>
    </>
  );
}

export default Two;
