import React from "react";
import { Typography, Grid, IconButton, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Logo from "./Logo";
import Clock from "./Clock";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/globalSlice";
import Lottie from "react-lottie";
import sunAnimation from "../assets/animations/sun.json";
import moonAnimation from "../assets/animations/moon2.json";

function Header() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const { theme } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const handleClickUserName = () => {
    navigate("/profile");
  };

  const handleOnClickThemeBtn = () => {
    dispatch(toggleTheme());
  };

  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: theme === "light" ? sunAnimation : moonAnimation,
  };

  return (
    <>
      <Grid container pt={2} sx={{ position: "relative" }}>
        <Grid
          item
          md={2}
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <Logo />
        </Grid>
        <Grid
          item
          md={8}
          xs={4}
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton color="secondary" onClick={handleOnClickThemeBtn}>
            {theme === "light" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Grid>
        <Grid
          item
          md={2}
          xs={4}
          onClick={handleClickUserName}
          sx={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <Clock />
          <Typography variant="caption">{user?.name}</Typography>
        </Grid>
        <Box
          sx={{
            position: "absolute",
            top: -300,
            marginLeft: "auto",
            marginRight: "auto",
            zIndex: -1,
            width: "100%",
          }}
        >
          <Lottie
            speed={0.2}
            options={animationOptions}
            height={450}
            width={450}
          />
        </Box>
      </Grid>
    </>
  );
}

export default Header;
