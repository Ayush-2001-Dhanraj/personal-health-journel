import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Logo from "./Logo";
import Clock from "./Clock";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleClickUserName = () => {
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
        <Typography variant="caption">{user?.name}</Typography>
      </Box>
    </Box>
  );
}

export default Header;
