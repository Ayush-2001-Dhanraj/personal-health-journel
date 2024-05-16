import React, { useState } from "react";
import { Grid, Box, Typography, Button, IconButton } from "@mui/material";
import dayjs from "dayjs";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ModelWrapper from "../components/ModalWrapper";
import userService from "../services/userService";
import { setUser } from "../redux/userSlice";

function Profile() {
  const [avatar, setAvatar] = useState("");

  const { signOut, getToken } = useAuth();
  const { user } = useSelector((state) => state.user);

  const [isChangeModelOpen, setIsChangeModelOpen] = useState(false);

  const dispatch = useDispatch();
  const { user: clerkUser } = useUser();

  const retrieveUserData = async () => {
    const authToken = await getToken();
    const res = await userService.getUser(
      authToken,
      clerkUser?.primaryEmailAddress?.emailAddress
    );
    dispatch(setUser(res));
  };

  const handleDeleteProfileImg = () => {
    console.log("Delete profile image clicked");
  };

  const handleOpenChangeModel = () => setIsChangeModelOpen(true);
  const handleCloseChangeModel = () => setIsChangeModelOpen(false);

  const handleChangeProfileImg = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleUploadNewProfileImage = async () => {
    const data = new FormData();
    data.append("avatar", avatar);

    const authToken = await getToken();

    const res = await userService.updateAvatar(authToken, user._id, data);

    if (res && !res.err) {
      handleCloseChangeModel();
      retrieveUserData();
    }
  };

  return (
    <>
      {/* Main section */}
      <Grid container spacing={2} mt={2}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              alt="Logo"
              src={user?.profileImg}
              sx={{
                width: { xs: 200, sm: 400 },
                border: "1px solid black",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
              p={1}
            >
              <IconButton
                sx={{ border: "1px solid" }}
                onClick={handleDeleteProfileImg}
              >
                <CloseIcon fontSize="5" />
              </IconButton>
              <IconButton
                sx={{ border: "1px solid" }}
                onClick={handleOpenChangeModel}
              >
                {user?.profileImg ? <EditIcon /> : <AddIcon />}
              </IconButton>
            </Box>
          </Box>
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

      {/* Change Profile Image model */}
      <ModelWrapper open={isChangeModelOpen}>
        <Button component="label" variant="outlined" fullWidth mb={1} mt={1}>
          {avatar ? avatar?.name : "Select new Profile Image"}
          <input
            type="file"
            name="avatar"
            onChange={handleChangeProfileImg}
            hidden
          />
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
          mt={1}
        >
          <Button variant="standard" onClick={handleCloseChangeModel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleUploadNewProfileImage}>
            Upload
          </Button>
        </Box>
      </ModelWrapper>
    </>
  );
}

export default Profile;
