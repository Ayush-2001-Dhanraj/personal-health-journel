import React from "react";

import { Box, Typography } from "@mui/material";

import styles from "./Entry.module.css";

function Entry({ r, onClick }) {
  return (
    <Box className={styles.container} p={1} onClick={() => onClick(r)}>
      <Typography variant="caption">{r.testDate}</Typography>
      <Typography variant="h6">{r.title}</Typography>
      <Typography variant="subtitle2">{r.subtitle}</Typography>
      <Typography variant="body2">
        {r.description.length > 150
          ? r.description.substring(0, 150) + "..."
          : r.description}
      </Typography>
      <Typography variant="caption">{r.type}</Typography>
    </Box>
  );
}

export default Entry;
