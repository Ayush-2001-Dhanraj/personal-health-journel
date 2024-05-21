import React from "react";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import XIcon from "@mui/icons-material/X";

function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Typography variant="subtitle2">
        PurePath Journal &copy; {new Date().getFullYear()}
      </Typography>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ borderRightWidth: 3 }}
      />
      <IconButton
        size="small"
        onClick={() =>
          window.open("https://github.com/Ayush-2001-Dhanraj", "_blank")
        }
      >
        <GitHubIcon />
      </IconButton>
      <IconButton
        size="small"
        onClick={() =>
          window.open("mailto:dhanrajaayush123@gmail.com", "_blank")
        }
      >
        <EmailIcon />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => window.open("https://x.com/_Ayush_Dhanraj", "_blank")}
      >
        <XIcon />
      </IconButton>
    </Box>
  );
}

export default Footer;
