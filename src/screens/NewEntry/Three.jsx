import React from "react";
import { Box, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { Editor } from "primereact/editor";

function Three({
  description,
  onChangeDescription,
  attachment,
  onChangeAttachment,
  disabled,
}) {
  const { isViewModelOpen } = useSelector((state) => state.global);
  const handleDescriptionChange = (e) => {
    onChangeDescription?.(e.htmlValue);
  };

  const handleAttachmentChange = (e) => {
    onChangeAttachment?.(e.target.files[0]);
  };

  const removeAttachment = () => onChangeAttachment?.("");

  const renderHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
      </span>
    );
  };

  const header = renderHeader();

  return (
    <>
      <Box mt={1} mb={1}>
        <Editor
          value={description}
          onTextChange={handleDescriptionChange}
          headerTemplate={header}
          readOnly={disabled}
          style={{ height: "160px" }}
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
