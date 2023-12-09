import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  ThemeProvider,
  Avatar,
  CssBaseline,
  Stack,
  Toolbar,
  createTheme,
} from "@mui/material";
import Post from "../components/Post";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import SideBarFriends from "../components/SideBarFriends";
import PostForm from "../components/PostForm";
import ProfileInfo from "../components/ProfileInfo";
import ProfileInfoCustom from "../components/ProfileInfoCustom";

import PropTypes from "prop-types";
import { getDataUser, getImgPerfil } from "../services/user";

const MainContent2 = ({ foto_perfil, data }) => (
  <Grid item xs={12} md={8} style={{ overflow: "auto", marginTop: "70px" }}>
    <Stack spacing={3}>
      <Paper style={{ minHeight: "200px", padding: "0 5% " }}>
        <ProfileInfoCustom foto_perfil={foto_perfil} />
      </Paper>
    </Stack>
  </Grid>
);

MainContent2.propTypes = {
  foto_perfil: PropTypes.string,
  data: PropTypes.array,
};

const MainContent = ({ foto_perfil, data }) => (
  <Grid item xs={12} md={8} style={{ overflow: "auto", marginTop: "0px" }}>
    <Stack spacing={3}>
      <Paper style={{ minHeight: "200px", padding: "0 5% " }}>
      <PostForm foto_perfil={foto_perfil} />
      <Post data={data} />

      </Paper>
    </Stack>
  </Grid>
);


MainContent.propTypes = {
  foto_perfil: PropTypes.string,
  data: PropTypes.array,
};
const Sidebar = () => (
  <Grid item xs={12} md={4}>
    <Box>
      <h2>Sidebar</h2>
      {/* Add your sidebar content here */}
    </Box>
  </Grid>
);

const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#171923" },
    primary: {
      main: "#212330",
    },
    secondary: {
      main: "#4361EE",
    },
    body: {
      main: "#171923",
    },
    appBar: {
      main: "#212330",
    },
    drawer: {
      main: "#212330",
      hover: "#303343",
    },
    history: {
      main: "#4D526D",
    },
    post: {
      main: "#212330",
    },
  },
});

const Perfil = () => {
  const [dataUser, setDataUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    (async () => setDataUser(await getDataUser(token)))();
    (async () => {
      const imageUrl = arrayBufferToBase64(await getImgPerfil(token));
      setDataUser((prevData) => ({ ...prevData, foto_perfil: imageUrl }));
    })();
    (async () => setPosts(await getAllPosts()))();
  }, []);

  const cardGeneral = {
    // padding:"45px",
    background: { default: "#171923" },
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <SideBar anchor="left" />

          <Box sx={{ flexGrow: 1, ml: 5 }}>
            <Box sx={{ mb: 7 }}>
              <NavBar />
            </Box>
            <Grid container spacing={5}>
              
              <MainContent2 foto_perfil={dataUser.foto_perfil} data={posts} />
              <MainContent foto_perfil={dataUser.foto_perfil} data={posts} />

              <SideBarFriends anchor="right" />

            </Grid>
          </Box>
        </Box>
        <Box></Box>

      </ThemeProvider>
    </div>
  );
};


export default Perfil;