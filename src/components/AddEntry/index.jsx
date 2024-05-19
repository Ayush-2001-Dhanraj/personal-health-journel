import React, { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import One from "./One";
import Two from "./Two";
import Three from "./Three";
import Four from "./Four";
import ModalWrapper from "../ModalWrapper";
import entriesService from "../../services/entriesService";
import { addEntrySteps } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "react-lottie";
import lightAnime from "../../assets/animations/addEntryDay.json";
import darkAnime from "../../assets/animations/addEntryNight.json";
import { useAuth } from "@clerk/clerk-react";
import { setIsLoading } from "../../redux/globalSlice";

function StepContent({ activeStep, entry, handleChangeEntry }) {
  switch (activeStep) {
    case 0:
      return (
        <One
          type={entry?.type}
          onChangeType={(value) => handleChangeEntry("type", value)}
        />
      );
    case 1:
      return (
        <Two
          title={entry?.title}
          onChangeTitle={(value) => handleChangeEntry("title", value)}
          subtitle={entry?.subtitle}
          onChangeSubtitle={(value) => handleChangeEntry("subtitle", value)}
        />
      );
    case 2:
      return (
        <Three
          description={entry?.description}
          onChangeDescription={(value) =>
            handleChangeEntry("description", value)
          }
          attachment={entry?.attachment}
          onChangeAttachment={(value) => handleChangeEntry("attachment", value)}
        />
      );
    case 3:
      return (
        <Four
          eventDate={entry?.eventDate}
          onChangeEventDate={(value) => handleChangeEntry("eventDate", value)}
        />
      );
    default:
      return null;
  }
}

export default function AddEntryModal({ open, handleClose }) {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const [entry, setEntry] = useState({
    title: "",
    subtitle: "",
    type: "GEN",
    description: "",
    eventDate: new Date().toISOString(),
    attachment: "",
  });

  const { theme } = useSelector((state) => state.global);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const clerkAuth = useAuth();

  const handleSubmit = async () => {
    const data = new FormData();

    const authToken = await clerkAuth.getToken();

    for (let key in entry) {
      data.append(key, entry[key]);
    }

    const res = await entriesService.createEntry(authToken, user?._id, data);
    if (res && !res.err) {
      dispatch(setIsLoading(true));
      handleNext();
    }
  };

  const handleChangeEntry = (name, value) => {
    setEntry((preV) => {
      return { ...preV, [name]: value };
    });
  };

  useEffect(() => {
    setActiveStep(0);
    setEntry({
      title: "",
      subtitle: "",
      type: "GEN",
      description: "",
      eventDate: new Date().toISOString(),
    });
  }, [open]);

  useEffect(() => {
    if (activeStep === addEntrySteps.length) {
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  }, [activeStep, handleClose]);

  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: theme === "light" ? lightAnime : darkAnime,
  };

  return (
    <ModalWrapper open={open} sx={{ position: "relative" }}>
      <Typography
        variant="h6"
        align="center"
        mb={2}
        sx={{ position: "relative" }}
      >
        Add New Entry
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
        {addEntrySteps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === addEntrySteps.length ? (
        <Typography sx={{ mt: 2, mb: 1 }} align="center">
          All Steps completed - entry added successfully
        </Typography>
      ) : (
        <>
          <Box mt={4} mb={2}>
            <StepContent
              activeStep={activeStep}
              entry={entry}
              handleChangeEntry={handleChangeEntry}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {activeStep !== 0 && (
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            )}
            <Box sx={{ flex: "1 1 auto" }} />

            <Button
              onClick={
                activeStep === addEntrySteps.length - 1
                  ? handleSubmit
                  : handleNext
              }
              disabled={activeStep === 1 && !entry.title.trim()}
            >
              {activeStep === addEntrySteps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </>
      )}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          left: -200,
          zIndex: -1,
          width: "100%",
        }}
      >
        <Lottie
          speed={0.6}
          options={animationOptions}
          height={200}
          width={200}
        />
      </Box>
    </ModalWrapper>
  );
}
