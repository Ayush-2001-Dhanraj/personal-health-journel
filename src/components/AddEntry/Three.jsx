import React from "react";
import { TextField, Box } from "@mui/material";

function Three({ description, onChangeDescription, disabled }) {
  return (
    <Box mt={1} mb={1}>
      <TextField
        value={description || "-- No Description --"}
        placeholder="Description"
        disabled={disabled}
        multiline
        rows={4}
        fullWidth
        variant="standard"
      />
    </Box>
  );
}

export default Three;
