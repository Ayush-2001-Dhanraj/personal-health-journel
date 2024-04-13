import React from "react";
import { TextField } from "@mui/material";

function Two() {
  return (
    <>
      <TextField
        label="Title"
        helperText="Enter Title of the Entry"
        variant="standard"
        required
        fullWidth
      />
      <TextField
        label="Subtitle"
        helperText="Enter Title of the Entry"
        variant="standard"
        fullWidth
      />
    </>
  );
}

export default Two;
