import React from "react";
import { Box, Divider, IconButton, Tooltip, Typography } from "@mui/material";
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
      <Typography
        variant="subtitle2"
        onClick={() =>
          window.open("https://3d-portfolio-demo-delta.vercel.app/", "_blank")
        }
        sx={{ cursor: "pointer" }}
      >
        <Tooltip title="Developer">
          Ayush Dhanraj &copy; {new Date().getFullYear()}
        </Tooltip>
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
        <Tooltip title="Github">
          <GitHubIcon />
        </Tooltip>
      </IconButton>
      <IconButton
        size="small"
        onClick={() =>
          window.open("mailto:dhanrajaayush123@gmail.com", "_blank")
        }
      >
        <Tooltip title="Email Me!">
          <EmailIcon />
        </Tooltip>
      </IconButton>
      <IconButton
        size="small"
        onClick={() => window.open("https://x.com/_Ayush_Dhanraj", "_blank")}
      >
        <Tooltip title="Twitter aka X">
          <XIcon />
        </Tooltip>
      </IconButton>
    </Box>
  );
}

export default Footer;
