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
import Footer from "../../components/Footer.jsx";

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
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
          <Grid container spacing={0} sx={{ flex: 1 }}>
            <Grid
              item
              xs={12}
              sm={8}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Lottie options={loginAnimeOptions} height={500} width={500} />
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
                  {currentView === "login"
                    ? "New Here? Sign Up!"
                    : "Have an account already? Sign In!"}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Caveat", cursive',
                    fontWeight: 400,
                    fontStyle: "normal",
                  }}
                  p={1}
                >
                  PurePath Journal
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Auth;
