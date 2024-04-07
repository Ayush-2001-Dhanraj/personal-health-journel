import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Typography, Box } from "@mui/material";
import { SignInButton } from "@clerk/clerk-react";

function Login() {
  return (
    <>
      <Typography variant="h6">Login</Typography>
      <Box mt={1} mb={1}>
        <SignInButton>
          <GoogleIcon />
        </SignInButton>
      </Box>
    </>
  );
}

export default Login;
