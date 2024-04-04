import React from "react";
import { Box, Typography } from "@mui/material";
import Logo from "./Logo";
import Clock from "./Clock";

function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      mt={2}
    >
      <Box>
        <Logo />
      </Box>
      <Box>
        <Clock />
        <Typography variant="caption">Ayush Dhanraj</Typography>
      </Box>
    </Box>
  );
}

export default Header;
