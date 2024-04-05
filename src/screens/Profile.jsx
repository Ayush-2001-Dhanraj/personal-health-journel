import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import dayjs from "dayjs";

function Profile() {
  return (
    <Grid container spacing={2} mt={2}>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            width: { xs: 200, sm: 400 },
            height: { xs: 200, sm: 400 },
            border: "1px solid black",
          }}
        ></Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">Ayush Dhanraj</Typography>
        <Box>
          <Typography variant="caption">
            Joined: {dayjs("2022-04-17").format("DD/MM/YYYY")}
          </Typography>
          <Typography variant="caption" ml={1}>
            Last Entry on: {dayjs("2022-04-17").format("DD/MM/YYYY")}
          </Typography>
        </Box>
        <Typography variant="subtitle2" mb={1}>
          ayushdhanraj.work@gmail.com
        </Typography>
        <Button color="primary" variant="contained" size="small">
          Logout
        </Button>
      </Grid>
    </Grid>
  );
}

export default Profile;
