import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import useThemeToggle from "../hooks/useThemeToggle";

export default function Root() {
  const { currentTheme } = useThemeToggle();

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      Mother
      <Outlet />
    </ThemeProvider>
  );
}
