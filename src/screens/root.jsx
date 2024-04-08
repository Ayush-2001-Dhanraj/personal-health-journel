import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { darkTheme, lightTheme } from "../utils/themes";
import Header from "../components/Header";
import userService from "../services/userService";
import useToken from "../hooks/useToken";
import { useUser } from "@clerk/clerk-react";

export default function Root() {
  const { theme } = useSelector((state) => state.global);
  const [token] = useToken();
  const { user } = useUser();

  const retrieveUserData = async () => {
    const res = await userService.getUser(
      token,
      user?.primaryEmailAddress?.emailAddress
    );
    console.log(res);
  };

  useEffect(() => {
    if (token && user?.primaryEmailAddress?.emailAddress) retrieveUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user]);

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
