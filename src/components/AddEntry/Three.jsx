import React from "react";
import { TextField, Box } from "@mui/material";

function Three({ description, onChangeDescription, disabled }) {
  const handleDescriptionChange = (e) => {
    onChangeDescription?.(e.target.value);
  };

  return (
    <Box mt={1} mb={1}>
      <TextField
        value={description || "--"}
        placeholder="Description"
        label="Description"
        disabled={disabled}
        onChange={handleDescriptionChange}
        multiline
        rows={4}
        fullWidth
        variant="standard"
      />
    </Box>
  );
}

export default Three;
