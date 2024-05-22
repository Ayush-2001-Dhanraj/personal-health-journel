import React from "react";
import { Typography, Grid, IconButton, Box, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Logo from "./Logo";
import Clock from "./Clock";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/globalSlice";
import Lottie from "react-lottie";
import sunAnimation from "../assets/animations/sun.json";
import moonAnimation from "../assets/animations/moon.json";

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
      <Grid container pt={1}>
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
          <IconButton color="primary" onClick={handleOnClickThemeBtn}>
            <Tooltip title="Change Theme">
              {theme === "light" ? <LightModeIcon /> : <DarkModeIcon />}
            </Tooltip>
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
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Tooltip title="View Profile">
            <Clock />
            <Typography variant="caption" color="secondary">
              {user?.name}
            </Typography>
          </Tooltip>
        </Grid>
        <Box
          sx={{
            position: "absolute",
            right: -180,
            top: -250,
            zIndex: -1,
          }}
        >
          <Lottie
            speed={0.05}
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
