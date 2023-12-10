import {
  Box,
  CssBaseline,
  Grid,
  Paper,
  ThemeProvider,
  Toolbar,
  createTheme,
} from "@mui/material";
import NavBar from "../components/NavBar";
import ProfileInfoCustom from "../components/ProfileInfoCustom";
import SideBar from "../components/SideBar";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ContactsSidebar from "../components/ContactsSideBar";
import ProfileInfo from "../components/ProfileInfo";
import { getDataUser } from "../services/user";

const MainContent2 = ({ foto_perfil, data }) => (
  <Grid item xs={12} md={8} style={{ overflow: "auto" }}>
    <Paper
      style={{
        minHeight: "10px",
        padding: "0 15%",
        background: "#171923",
      }}
    >
      <ProfileInfoCustom foto_perfil={foto_perfil} dataUser={data} />
    </Paper>
    <Paper
      style={{ minHeight: "10px", padding: "0 15%", background: "#171923" }}
    >
      <ProfileInfo data={data}></ProfileInfo>
    </Paper>
  </Grid>
);

MainContent2.propTypes = {
  foto_perfil: PropTypes.string,
  data: PropTypes.array,
};

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    (async () => setDataUser(await getDataUser(token)))();
    console.log(dataUser);
  }, []);

  const cardGeneral = {
    background: { default: "#171923" },
  };

  return (
    <div style={cardGeneral}>
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
                <NavBar />
              </Box>
              <Toolbar />
              {}
              <Grid container spacing={5}>
                <MainContent2
                  foto_perfil={dataUser.foto_perfil}
                  data={dataUser}
                />
                <ContactsSidebar />
                <Grid container spacing={0}></Grid>
              </Grid>
            </Box>
          </Box>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Perfil;
