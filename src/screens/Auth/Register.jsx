import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Typography, IconButton } from "@mui/material";
import { useSignIn } from "@clerk/clerk-react";

function Register() {
  const { signIn } = useSignIn();

  const signInWith = (strategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  };
  return (
    <>
      <Typography variant="h6">Register</Typography>
      <IconButton onClick={() => signInWith("oauth_google")}>
        <GoogleIcon />
      </IconButton>
    </>
  );
}

export default Register;
