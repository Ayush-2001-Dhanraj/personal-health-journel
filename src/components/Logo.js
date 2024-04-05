import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import { Box } from "@mui/material";

function Logo() {
  const navigate = useNavigate();

  const handleLogoClick = () => navigate("/");

  return (
    <>
      <Box
        component="img"
        sx={{
          height: 40,
          maxHeight: { xs: 30, md: 40 },
          cursor: "pointer",
        }}
        alt="Logo"
        src={logo}
        onClick={handleLogoClick}
      />
    </>
  );
}

export default Logo;
