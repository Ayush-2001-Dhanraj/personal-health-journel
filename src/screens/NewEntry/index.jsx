import React, { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import One from "./One";
import Two from "./Two";
import Three from "./Three";
import Four from "./Four";
import entriesService from "../../services/entriesService";
import { setSelectedEntry } from "../../redux/entriesSlice";
import { addEntrySteps } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "react-lottie";
import lightAnime from "../../assets/animations/addEntryDay.json";
import darkAnime from "../../assets/animations/addEntryNight.json";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import EventPreview from "../../components/EventPreview";
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
          type={entry?.type}
          title={entry?.title}
          onChangeTitle={(value) => handleChangeEntry("title", value)}
          subtitle={entry?.subtitle}
          onChangeSubtitle={(value) => handleChangeEntry("subtitle", value)}
          hospitalName={entry?.hospitalName}
          onChangeHospitalName={(value) =>
            handleChangeEntry("hospitalName", value)
          }
          doctorName={entry?.doctorName}
          onChangeDoctorName={(value) => handleChangeEntry("doctorName", value)}
          department={entry?.department}
          onChangeDepartment={(value) => handleChangeEntry("department", value)}
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
          type={entry?.type}
          eventDate={entry?.eventDate}
          onChangeEventDate={(value) => handleChangeEntry("eventDate", value)}
          isRecurring={entry?.isRecurring}
          onChangeIsRecurring={(value) =>
            handleChangeEntry("isRecurring", value)
          }
          repeatFrequency={entry?.repeatFrequency}
          onChangeRepeatFrequency={(value) =>
            handleChangeEntry("repeatFrequency", value)
          }
          recurringStartDate={entry?.recurringStartDate}
          onChangeRecurringStartDate={(value) =>
            handleChangeEntry("recurringStartDate", value)
          }
          isTestAwaited={entry?.isTestAwaited}
          onChangeIsTestAwaited={(value) =>
            handleChangeEntry("isTestAwaited", value)
          }
          testResultDate={entry?.testResultDate}
          onChangeTestResultDate={(value) =>
            handleChangeEntry("testResultDate", value)
          }
        />
      );
    case 4:
      return <EventPreview event={entry} />;
    default:
      return null;
  }
}

export default function AddEntryModal() {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const clerkAuth = useAuth();

  const { selectedEntry } = useSelector((state) => state.entries);

  useEffect(() => {
    const retrieveSelectedEntry = async () => {
      const authToken = await clerkAuth.getToken();
      const res = await entriesService.getEntry(authToken, selectedEntry);
      setEntry(res);
    };

    if (selectedEntry) retrieveSelectedEntry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEntry]);

  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [entry, setEntry] = useState({
    title: "",
    type: "",
    repeatFrequency: "MONTHLY",
    isRecurring: false,
    isTestAwaited: false,
    eventDate: new Date().toISOString(),
    recurringStartDate: new Date().toISOString(),
    testResultDate: new Date().toISOString(),
  });

  const { theme } = useSelector((state) => state.global);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitDisabled(true);
    const data = new FormData();

    const authToken = await clerkAuth.getToken();

    let res;

    if (selectedEntry) {
      res = await entriesService.updateEntry(authToken, selectedEntry, entry);
    } else {
      for (let key in entry) {
        data.append(key, entry[key]);
      }

      res = await entriesService.createEntry(authToken, user?._id, data);
    }

    if (res && !res.err) {
      dispatch(setIsLoading(true));
      handleNext();
    }
    setIsSubmitDisabled(false);
  };

  const handleChangeEntry = (name, value) => {
    setEntry((preV) => {
      return { ...preV, [name]: value };
    });
  };

  useEffect(() => {
    if (activeStep === addEntrySteps.length) {
      setTimeout(() => {
        dispatch(setSelectedEntry(null));
        navigate("/");
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep, navigate]);

  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: theme === "light" ? lightAnime : darkAnime,
  };

  return (
    <Box
      sx={{
        flex: 1,
        overflow: "auto",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        position: "relative",
      }}
    >
      <Typography
        variant="h6"
        align="center"
        mb={2}
        sx={{ position: "relative" }}
      >
        {selectedEntry ? "Edit" : "Add New"} Entry
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
          All Steps completed - entry {selectedEntry ? "updated" : "added"}{" "}
          successfully
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
              disabled={
                (activeStep === 1 && !entry.title.trim()) ||
                (activeStep === 0 && !entry.type) ||
                isSubmitDisabled
              }
            >
              {isSubmitDisabled ? (
                <CircularProgress size={20} />
              ) : activeStep === addEntrySteps.length - 1 ? (
                "Submit"
              ) : (
                "Next"
              )}
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
    </Box>
  );
}
