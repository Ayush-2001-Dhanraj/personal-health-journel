import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { darkTheme, lightTheme } from "../utils/themes";
import Header from "../components/Header";
import userService from "../services/userService";
import entriesService from "../services/entriesService";
import { useAuth, useUser } from "@clerk/clerk-react";
import { setUser } from "../redux/userSlice";
import { refreshEntries } from "../redux/entriesSlice";
import "react-vertical-timeline-component/style.min.css";

export default function Root() {
  const { theme } = useSelector((state) => state.global);
  const clerkAuth = useAuth();
  const { user: clerkUser } = useUser();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isAddModelOpen, isViewModelOpen } = useSelector(
    (state) => state.global
  );

  const retrieveUserData = async () => {
    const authToken = await clerkAuth.getToken();
    const res = await userService.getUser(
      authToken,
      clerkUser?.primaryEmailAddress?.emailAddress
    );
    dispatch(setUser(res));
  };

  const retrieveAllRecords = async () => {
    const authToken = await clerkAuth.getToken();
    const res = await entriesService.getAllEntries(authToken, user._id);
    dispatch(refreshEntries(res));
  };

  useEffect(() => {
    if (!isAddModelOpen && !isViewModelOpen && user._id) retrieveAllRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddModelOpen, isViewModelOpen, user]);

  useEffect(() => {
    if (clerkUser?.primaryEmailAddress?.emailAddress) retrieveUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clerkUser]);

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ overflow: "hidden" }}>
        <Header />
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}
