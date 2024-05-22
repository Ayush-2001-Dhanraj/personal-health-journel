import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Typography, IconButton, Tooltip } from "@mui/material";
import { useSignIn } from "@clerk/clerk-react";
import { useTheme } from "@mui/material/styles";

function Login() {
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
      <Typography variant="h6">Login</Typography>
      <IconButton
        onClick={() => signInWith("oauth_google")}
        size="small"
        sx={{
          background: theme.palette.primary.main,
          margin: 1,
        }}
      >
        <Tooltip title="Login via Google" placement="left">
          <GoogleIcon />
        </Tooltip>
      </IconButton>
    </>
  );
}

export default Login;
