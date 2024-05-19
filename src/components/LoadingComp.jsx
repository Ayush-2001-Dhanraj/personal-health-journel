import { CircularProgress } from "@mui/material";
import React from "react";
import ModalWrapper from "./ModalWrapper";

function LoadingComp({ open }) {
  return (
    <ModalWrapper
      styles={{
        bgcolor: "none",
        width: "auto",
        boxShadow: 0,
        border: "none",
      }}
      open={open}
    >
      <CircularProgress color="secondary" />
    </ModalWrapper>
  );
}

export default LoadingComp;
