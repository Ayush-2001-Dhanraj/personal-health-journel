import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

import { Box, Grid, Typography } from "@mui/material";

import loginArtwork from "../../assets/login.jpg";
import registerArtwork from "../../assets/register.jpg";
import Login from "./Login";
import Register from "./Register";

function Auth() {
  const [currentView, setCurrentView] = useState("login");
  const { isSignedIn } = useAuth();

  const handleViewChange = () =>
    setCurrentView((preView) => (preView === "login" ? "register" : "login"));

  if (isSignedIn) return <Navigate to={"/"} />;

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={8}>
          <Box
            sx={{
              height: { xs: 200, sm: "100vh" },
              width: { xs: "100vw", sm: "inherit" },
            }}
          >
            <Box
              component="img"
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                cursor: "pointer",
              }}
              alt="Logo"
              src={currentView === "login" ? loginArtwork : registerArtwork}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            {currentView === "login" ? <Login /> : <Register />}
            <Typography
              variant="caption"
              onClick={handleViewChange}
              sx={{ cursor: "pointer", display: "block" }}
              align="center"
            >
              {currentView === "login" ? "Don't have" : "Already have"} an
              account??
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Auth;
