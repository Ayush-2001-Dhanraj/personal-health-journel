import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Logo from "./Logo";
import Clock from "./Clock";

function Header() {
  const navigate = useNavigate();

  const handleClickUserName = () => {
    console.log("Clicked");
    navigate("/profile");
  };

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
      <Box onClick={handleClickUserName} sx={{ cursor: "pointer" }}>
        <Clock />
        <Typography variant="caption">Ayush Dhanraj</Typography>
      </Box>
    </Box>
  );
}

export default Header;
