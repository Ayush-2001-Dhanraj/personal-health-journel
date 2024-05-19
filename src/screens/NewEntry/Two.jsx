import React from "react";
import { TextField, Box } from "@mui/material";

function Two({
  type,
  title,
  onChangeTitle,
  subtitle,
  onChangeSubtitle,
  hospitalName,
  onChangeHospitalName,
  doctorName,
  onChangeDoctorName,
  department,
  onChangeDepartment,
  disabled,
  compact,
}) {
  const handleTitleChange = (e) => {
    onChangeTitle?.(e.target.value);
  };

  const handleSubtitleChange = (e) => {
    onChangeSubtitle?.(e.target.value);
  };

  const handleHospitalChange = (e) => {
    onChangeHospitalName?.(e.target.value);
  };

  const handleDoctorNameChange = (e) => {
    onChangeDoctorName?.(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    onChangeDepartment?.(e.target.value);
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

      {type !== "GEN" && (
        <>
          <Box mt={1}>
            <TextField
              label="Hospital / Clinic Name"
              value={hospitalName ? hospitalName : disabled ? "NA" : ""}
              disabled={disabled}
              helperText={disabled || compact ? "" : "Establishment u went to?"}
              variant="standard"
              onChange={handleHospitalChange}
              autoComplete="off"
              fullWidth
            />
          </Box>
          <Box mt={1} sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Doctor Name"
              value={doctorName ? doctorName : disabled ? "NA" : ""}
              disabled={disabled}
              helperText={disabled || compact ? "" : "Who attended u?"}
              variant="standard"
              onChange={handleDoctorNameChange}
              autoComplete="off"
              fullWidth
            />
            <TextField
              label="Department"
              value={department ? department : disabled ? "NA" : ""}
              disabled={disabled}
              helperText={disabled || compact ? "" : "Department u visited"}
              variant="standard"
              onChange={handleDepartmentChange}
              autoComplete="off"
              fullWidth
            />
          </Box>
        </>
      )}
    </>
  );
}

export default Two;
