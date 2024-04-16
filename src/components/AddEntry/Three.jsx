import React from "react";
import { TextField, Box, Button } from "@mui/material";
import { useSelector } from "react-redux";

function Three({ description, onChangeDescription, disabled }) {
  const { isViewModelOpen } = useSelector((state) => state.global);
  const handleDescriptionChange = (e) => {
    onChangeDescription?.(e.target.value);
  };

  return (
    <>
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
      {!isViewModelOpen && (
        <Box mt={1} mb={1}>
          <Button variant="outlined" component="label" fullWidth>
            Select a File (Eg: Report | Bill etc)
            <input type="file" hidden />
          </Button>
        </Box>
      )}
    </>
  );
}

export default Three;
