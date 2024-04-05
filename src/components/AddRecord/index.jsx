import React, { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import One from "./One";
import Two from "./Two";
import Three from "./Three";
import Four from "./Four";

const steps = ["Type", "Title & Subtitle", "Description & Files", "Date"];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", sm: 400 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 1,
  p: 2,
};

function StepContent({ activeStep }) {
  switch (activeStep) {
    case 0:
      return <One />;
    case 1:
      return <Two />;
    case 2:
      return <Three />;
    case 3:
      return <Four />;
    default:
      return null;
  }
}

export default function AddRecordModal({ open, handleClose }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    setActiveStep(0);
  }, [open]);

  useEffect(() => {
    if (activeStep === steps.length) {
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  }, [activeStep, handleClose]);

  return (
    <Modal
      open={open}
      //   onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography
          variant="h6"
          align="center"
          mb={2}
          sx={{ position: "relative" }}
        >
          Add Record
          <IconButton
            size="small"
            color="primary"
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={handleClose}
          >
            <CloseIcon size="small" />
          </IconButton>
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <Typography sx={{ mt: 2, mb: 1 }} align="center">
            All steps completed - you&apos;re finished
          </Typography>
        ) : (
          <>
            <Box mt={4} mb={2}>
              <StepContent activeStep={activeStep} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}
