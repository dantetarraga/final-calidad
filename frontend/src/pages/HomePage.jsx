import {
  Box,
  CssBaseline,
  Grid,
  ThemeProvider,
  Toolbar,
  createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import ContactsSidebar from "../components/ContactsSideBar.jsx";
import MainContent from "../components/MainContent.jsx";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { getAllPosts } from "../services/post";
import { getDataUser } from "../services/user";

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

const HomePage = () => {
  const [dataUser, setDataUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    (async () => setDataUser(await getDataUser(token)))();
    (async () => setPosts(await getAllPosts()))();
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <SideBar anchor="left" />
          <Box
            sx={{
              flexGrow: 1,
              ml: 5,
            }}
          >
            <Box sx={{ mb: 7 }}>
              <NavBar
                user={dataUser}
                solicitudes={dataUser.solicitudes_amistad}
              />
            </Box>
            <Toolbar />
            <Grid container spacing={5}>
              <MainContent
                foto_perfil={dataUser.foto_perfil}
                data={posts}
                user={dataUser}
              />
              <ContactsSidebar />
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default HomePage;
