import React from "react";
import { Typography, Grid, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Logo from "./Logo";
import Clock from "./Clock";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/globalSlice";

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

  return (
    <Grid container pt={2}>
      <Grid
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
          {theme === "light" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Grid>
      <Grid
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
    </Grid>
  );
}

export default Header;
