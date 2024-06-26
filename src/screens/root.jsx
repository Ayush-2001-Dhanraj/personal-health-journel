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
import Footer from "../components/Footer";
import LoadingComp from "../components/LoadingComp";
import { setIsLoading } from "../redux/globalSlice";

export default function Root() {
  const clerkAuth = useAuth();
  const { user: clerkUser } = useUser();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { searchTerm } = useSelector((state) => state.entries);
  const { isAddModelOpen, isViewModelOpen, theme, isLoading } = useSelector(
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

  function filterArrayByQuery(arr, query) {
    const queryLower = query.toLowerCase();
    return arr.filter((item) => {
      return [
        "description",
        "doctorName",
        "hospitalName",
        "title",
        "subtitle",
      ].some((key) => {
        if (item[key]) {
          return item[key].toLowerCase().includes(queryLower);
        }
        return false;
      });
    });
  }

  const retrieveAllRecords = async () => {
    const authToken = await clerkAuth.getToken();
    const res = await entriesService.getAllEntries(authToken, user._id);
    const filteredRes = filterArrayByQuery(res, searchTerm);
    dispatch(refreshEntries(filteredRes));
    if (isLoading) {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    if (user._id) retrieveAllRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    if (!isAddModelOpen && !isViewModelOpen && user._id && isLoading)
      retrieveAllRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddModelOpen, isViewModelOpen, user, isLoading, searchTerm]);

  useEffect(() => {
    if (clerkUser?.primaryEmailAddress?.emailAddress) retrieveUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clerkUser]);

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Header />
        <Outlet />
        <Footer />
        <LoadingComp open={isLoading} />
      </Container>
    </ThemeProvider>
  );
}
