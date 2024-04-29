import React from "react";
import { TextField, Box, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

function Three({
  description,
  onChangeDescription,
  attachment,
  onChangeAttachment,
  disabled,
}) {
  const { isViewModelOpen } = useSelector((state) => state.global);
  const handleDescriptionChange = (e) => {
    onChangeDescription?.(e.target.value);
  };

  const handleAttachmentChange = (e) => {
    onChangeAttachment?.(e.target.files[0]);
  };

  const removeAttachment = () => onChangeAttachment?.("");

  return (
    <>
      <Box mt={1} mb={1}>
        <TextField
          value={description ? description : disabled ? "NA" : ""}
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
        <Box mt={1} mb={1} sx={{ display: "flex" }}>
          <Button variant="outlined" component="label" fullWidth>
            {attachment
              ? attachment?.name
              : "Select a File (Eg: Report | Bill etc)"}
            <input
              type="file"
              name="file"
              filename={attachment?.name}
              hidden
              onChange={handleAttachmentChange}
            />
          </Button>
          {attachment && (
            <IconButton onClick={removeAttachment}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      )}
    </>
  );
}

export default Three;
