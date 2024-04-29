import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Typography, IconButton } from "@mui/material";
import { useSignIn } from "@clerk/clerk-react";
import { useTheme } from "@mui/material/styles";

function Register() {
  const { signIn } = useSignIn();

  const theme = useTheme();

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
      <IconButton
        onClick={() => signInWith("oauth_google")}
        size="small"
        sx={{
          background: theme.palette.primary.main,
          margin: 1,
        }}
      >
        <GoogleIcon />
      </IconButton>
    </>
  );
}

export default Register;
