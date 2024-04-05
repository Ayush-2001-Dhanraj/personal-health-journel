import React from "react";
import { useRouteError } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Logo from "../components/Logo";

function ErrorPage() {
  const error = useRouteError();

  return (
    <Box
      sx={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3">Oops!</Typography>
      <Typography variant="body1">
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="body2">
        <i>{error.statusText || error.message}</i>
      </Typography>
      <Logo />
    </Box>
  );
}

export default ErrorPage;
