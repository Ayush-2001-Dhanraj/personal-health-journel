import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { testTypes } from "../../utils/constants";

function One({ type, onChangeType, disabled, compact }) {
  const handleChange = (e) => {
    onChangeType?.(e.target.value);
  };

  return (
    <>
      <TextField
        select
        label="Type of Entry"
        defaultValue="TES"
        value={type || "TES"}
        disabled={disabled}
        onChange={handleChange}
        helperText={disabled || compact ? "" : "Please select type of Entry"}
        variant="standard"
        required={!disabled}
        fullWidth
      >
        {testTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}

export default One;
