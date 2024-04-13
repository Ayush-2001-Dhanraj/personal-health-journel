import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import dayjs from "dayjs";
import { useAuth } from "@clerk/clerk-react";
import { useSelector } from "react-redux";

function Profile() {
  const { signOut } = useAuth();
  const { user } = useSelector((state) => state.global);

  return (
    <Grid container spacing={2} mt={2}>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          component="img"
          alt="Logo"
          src={user?.profileImg}
          sx={{
            width: { xs: 200, sm: 400 },
            height: { xs: 200, sm: 400 },
            border: "1px solid black",
          }}
        ></Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">{user?.name}</Typography>
        <Box>
          <Typography variant="caption">
            Joined: {dayjs(user?.createdAt).format("DD/MM/YYYY")}
          </Typography>
          <Typography variant="caption" ml={1}>
            Last Entry on: {dayjs(user?.lastUpdate).format("DD/MM/YYYY")}
          </Typography>
        </Box>
        <Typography variant="subtitle2" mb={1}>
          {user?.email}
        </Typography>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={signOut}
        >
          Logout
        </Button>
      </Grid>
    </Grid>
  );
}

export default Profile;
