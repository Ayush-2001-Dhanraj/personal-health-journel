import React from "react";

import { Box, Typography } from "@mui/material";

import styles from "./Record.module.css";

function Record({ r }) {
  return (
    <Box className={styles.container} p={1}>
      <Typography variant="caption">{r.testDate}</Typography>
      <Typography variant="h6">{r.title}</Typography>
      <Typography variant="subtitle2">{r.subtitle}</Typography>
      <Typography variant="body2" nowrap>
        {r.description.length > 150
          ? r.description.substring(0, 150) + "..."
          : r.description}
      </Typography>
      <Typography variant="caption">{r.type}</Typography>
    </Box>
  );
}

export default Record;
