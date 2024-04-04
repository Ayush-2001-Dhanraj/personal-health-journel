import React from "react";
import logo from "../assets/logo.png";
import { Box } from "@mui/material";

function Logo() {
  return (
    <>
      <Box
        component="img"
        sx={{
          height: 40,
          maxHeight: { xs: 25, md: 40 },
        }}
        alt="Logo"
        src={logo}
      />
    </>
  );
}

export default Logo;
