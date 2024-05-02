import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Box, Grid, Typography } from "@mui/material";
import { lightTheme } from "../../utils/themes.js";
import Login from "./Login";
import Register from "./Register";
import Lottie from "react-lottie";
import loginAnimation from "../../assets/animations/login.json";
import starterService from "../../services/starterService.js";

function Auth() {
  const [currentView, setCurrentView] = useState("login");
  const { isSignedIn } = useAuth();

  const handleViewChange = () =>
    setCurrentView((preView) => (preView === "login" ? "register" : "login"));

  const triggerBackend = async () => await starterService.startBackend();

  useEffect(() => {
    triggerBackend();
  }, []);

  if (isSignedIn) return <Navigate to={"/"} />;

  const loginAnimeOptions = {
    loop: true,
    autoplay: true,
    animationData: loginAnimation,
  };

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Grid container spacing={0} sx={{ overflow: "hidden" }}>
          <Grid item xs={12} sm={8}>
            <Box
              sx={{
                height: { xs: 200, sm: "100vh" },
                width: { xs: "100vw", sm: "inherit" },
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: -100,
                  left: -100,
                  zIndex: -1,
                }}
              >
                <Lottie options={loginAnimeOptions} height={500} width={500} />
              </Box>
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
        </Grid>{" "}
        <Typography
          variant="h3"
          sx={{
            position: "absolute",
            bottom: 5,
            left: { xs: 0, sm: 300 },
            fontFamily: '"Caveat", cursive',
            fontWeight: 400,
            fontStyle: "normal",
          }}
          p={1}
        >
          Personal Health Journal
        </Typography>
      </ThemeProvider>
    </>
  );
}

export default Auth;
