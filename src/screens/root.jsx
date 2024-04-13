import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { darkTheme, lightTheme } from "../utils/themes";
import Header from "../components/Header";
import userService from "../services/userService";
import entriesService from "../services/entriesService";
import useToken from "../hooks/useToken";
import { useUser } from "@clerk/clerk-react";
import { setUser, refreshEntries } from "../redux/globalSlice";

export default function Root() {
  const { theme } = useSelector((state) => state.global);
  const [token] = useToken();
  const { user: clerkUser } = useUser();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.global);

  const retrieveUserData = async () => {
    const res = await userService.getUser(
      token,
      clerkUser?.primaryEmailAddress?.emailAddress
    );
    dispatch(setUser(res));
  };

  const retrieveAllRecords = async () => {
    const res = await entriesService.getAllEntries(token);
    dispatch(refreshEntries(res));
  };

  useEffect(() => {
    if (Object.keys(user).length && token) retrieveAllRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token]);

  useEffect(() => {
    if (token && clerkUser?.primaryEmailAddress?.emailAddress)
      retrieveUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, clerkUser]);

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
