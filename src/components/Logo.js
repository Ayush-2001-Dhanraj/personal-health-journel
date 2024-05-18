import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

function Logo() {
  const navigate = useNavigate();

  const handleLogoClick = () => navigate("/");

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          fontFamily: '"Caveat", cursive',
          fontWeight: 400,
          fontStyle: "normal",
          cursor: "pointer",
        }}
        p={1}
        onClick={handleLogoClick}
      >
        PurePath Journal
      </Typography>
    </>
  );
}

export default Logo;
