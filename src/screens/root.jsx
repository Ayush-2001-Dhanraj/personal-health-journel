import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { darkTheme, lightTheme } from "../utils/themes";
import Header from "../components/Header";
import userService from "../services/userService";
import useToken from "../hooks/useToken";

export default function Root() {
  const { theme } = useSelector((state) => state.global);
  const [token] = useToken();

  const retrieveUserData = async () => {
    const res = await userService.getUser(token);
    console.log(res);
  };

  useEffect(() => {
    if (token) retrieveUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Header />
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}
