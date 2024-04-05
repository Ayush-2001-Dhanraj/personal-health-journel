import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { testTypes } from "../../utils/constants";

function One() {
  return (
    <TextField
      select
      label="Type of Entry"
      defaultValue="General"
      helperText="Please select type of Entry"
      variant="standard"
      required
      fullWidth
    >
      {testTypes.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default One;
