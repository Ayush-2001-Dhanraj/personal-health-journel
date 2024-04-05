import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Typography, IconButton } from "@mui/material";

function Login() {
  return (
    <>
      <Typography variant="h6">Login</Typography>
      <IconButton>
        <GoogleIcon />
      </IconButton>
    </>
  );
}

export default Login;
