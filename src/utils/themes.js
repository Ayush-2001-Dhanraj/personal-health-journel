import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#32012F",
    },
    text: {
      primary: "#94FFD8",
    },
    primary: {
      main: "#FDFFC2",
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#94FFD8",
    },
    text: {
      primary: "#32012F",
    },
    primary: {
      main: "#F97300",
    },
  },
});
