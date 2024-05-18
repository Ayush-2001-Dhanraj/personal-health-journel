import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React from "react";

function EmptyEntries() {
  const theme = useTheme();

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", position: "relative" }}
      mt={2}
    >
      <Box
        p={1}
        sx={{ background: theme.palette.primary.main, width: "max-content" }}
        borderRadius={2}
      >
        <Typography
          variant="subtitle1"
          align="center"
          color={theme.palette.background.default}
        >
          Don't be shy add something....
        </Typography>
      </Box>
    </Box>
  );
}

export default EmptyEntries;
