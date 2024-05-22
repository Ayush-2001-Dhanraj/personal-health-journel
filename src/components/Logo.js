import React from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip, Typography } from "@mui/material";

function Logo() {
  const navigate = useNavigate();

  const handleLogoClick = () => navigate("/");

  return (
    <>
      <Tooltip title="PurePath">
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
      </Tooltip>
    </>
  );
}

export default Logo;
