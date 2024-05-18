import { Box, IconButton, Input, InputAdornment } from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useTheme } from "@emotion/react";

function Filter() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "60%" },
          background: theme.palette.secondary.main,
          color: theme.palette.primary.main,
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
        pl={4}
        pr={4}
        pt={1}
        pb={1}
        borderRadius={8}
      >
        <Input
          sx={{ color: theme.palette.primary.main }}
          fullWidth
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <CheckIcon color="primary" />
              </IconButton>
              <IconButton>
                <ClearIcon color="primary" />
              </IconButton>
            </InputAdornment>
          }
        />
      </Box>
    </Box>
  );
}

export default Filter;
