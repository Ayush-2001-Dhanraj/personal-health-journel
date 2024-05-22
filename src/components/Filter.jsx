import { Box, IconButton, Input, InputAdornment, Tooltip } from "@mui/material";
import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { setSearchTerm } from "../redux/entriesSlice";

function Filter() {
  const [query, setQuery] = useState("");

  const theme = useTheme();

  const dispatch = useDispatch();

  const handleQueryChange = (e) => setQuery(e.target.value);

  const handleConfirm = () => {
    dispatch(setSearchTerm(query));
  };

  const handleClear = () => {
    dispatch(setSearchTerm(""));
    setQuery("");
  };

  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: query ? 1 : 0.8,
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
          value={query}
          onChange={handleQueryChange}
          sx={{ color: theme.palette.primary.main }}
          fullWidth
          endAdornment={
            <InputAdornment position="end">
              {query && (
                <>
                  <Tooltip title="Search" placement="top">
                    <IconButton onClick={handleConfirm}>
                      <SearchIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Clear" placement="top">
                    <IconButton onClick={handleClear}>
                      <ClearIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </InputAdornment>
          }
        />
      </Box>
    </Box>
  );
}

export default Filter;
