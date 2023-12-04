import {
  Avatar,
  Box,
  CssBaseline,
  Grid,
  Paper,
  Stack,
  ThemeProvider,
  Toolbar,
  createTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { arrayBufferToBase64 } from "../../utils/arrayBuffer";
import NavBar from "../components/NavBar";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import SideBar from "../components/SideBar";
import { getAllPosts } from "../services/post";
import { getDataUser, getImgPerfil } from "../services/user";

// const Search = styled("div")(({ theme }) => ({
//   borderRadius: theme.shape.borderRadius,
//   display: "flex",
//   flexGrow: 1,
//   marginLeft: theme.spacing(1),
//   backgroundColor: "#434557",
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   width: "100%",
// }));

const dataTest = Array.from({ length: 50 }, (_, index) => index + 1);

const MainContent = ({ foto_perfil, data }) => (
  <Grid item xs={12} md={8} style={{ overflow: "auto" }}>
    <Stack spacing={3}>
      <Paper style={{ minHeight: "200px", padding: "0 15%" }}>
        <PostForm foto_perfil={foto_perfil} />
      </Paper>
      <Paper style={{ minHeight: "200px", padding: "0 15%" }}>
        <Post data={data}></Post>
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
    <Stack
      spacing={5}
      sx={{ width: "100%", height: "calc(100vh - 150px)", position: "fixed" }}
    >
      <Paper
        style={{
          padding: "20px",
          height: "50%",
          width: "100%",
          overflow: "auto",
        }}
      >
        <h2>Sidebar</h2>
        {dataTest.map((item) => (
          <Avatar key={item}>{item}</Avatar>
        ))}
      </Paper>
      <Paper
        style={{
          padding: "20px",
          height: "50%",
          width: "100%",
        }}
      >
        {/* Contenido de la barra lateral */}
        <h2>Sidebar</h2>
        {/* Agrega más contenido según sea necesario */}
        {/* ... */}
      </Paper>
    </Stack>
  </Grid>
);

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(1)})`,
//     width: "100%",
//   },
// }));

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
    (async () => {
      const imageUrl = arrayBufferToBase64(await getImgPerfil(token));
      setDataUser((prevData) => ({ ...prevData, foto_perfil: imageUrl }));
    })();
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
              <NavBar />
            </Box>
            <Toolbar />
            {/* <Box
              component="main"
              sx={{
                flexGrow: 1,
                width: `calc(98% - ${drawerWidth}px)`,
                mt: 5,
              }}
            >
              <Box
                component="div"
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  component="div"
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                ></Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "post.main",
                  height: "147px",
                  borderRadius: "12px",
                  p: 3,
                }}
              >
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                    }}
                  />
                  <Search>
                    <StyledInputBase
                      sx={{ width: "100%" }}
                      placeholder="What's on your mind?"
                      inputProps={{ "aria-label": "What's on your mind?" }}
                    />
                  </Search>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <IconButton>
                    <AddPhotoAlternate />
                  </IconButton>
                  <IconButton>
                    <VideoLibrary />
                  </IconButton>
                  <IconButton>
                    <GifBoxRounded />
                  </IconButton>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button color="secondary" variant="contained">
                    Create a post
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: 2,
                  justifyContent: "space-between",
                  backgroundColor: "post.main",
                  height: "auto",
                  borderRadius: "12px",
                  marginTop: 3,
                  p: 3,
                }}
              >
                <Box sx={{ width: "100%", display: "flex", columnGap: 2 }}>
                  <Avatar alt="Small Avatar" sizes="large" />
                  <Box>
                    <Typography sx={{ fontSize: 16 }} color="text.primary">
                      Nombre Usuario
                    </Typography>
                    <Typography
                      sx={{ fontSize: "12px" }}
                      color="text.secondary"
                    >
                      Fecha
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography sx={{ fontSize: 14 }} color="text.pramary">
                    In the fast-paced world of corporate life, its crucial to
                    prioritize your mental peace. Take moments to breathe,
                    reflect, and recharge. Seek solace in small rituals, like
                    morning walks, deep breaths, or a quick meditation session
                    during breaks. #mentalpeace #corporatelife
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton>
                    <ThumbUpAltOutlined />
                  </IconButton>
                  <Typography
                    component="span"
                    color="text.pramary"
                    sx={{ fontSize: 14 }}
                  >
                    2.1k
                  </Typography>
                  <IconButton>
                    <ModeCommentOutlined />
                  </IconButton>
                  <Typography
                    component="span"
                    color="text.pramary"
                    sx={{ fontSize: 14 }}
                  >
                    6 comments
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                    }}
                  />
                  <Search>
                    <StyledInputBase
                      sx={{ width: "100%" }}
                      placeholder="What's on your mind?"
                      inputProps={{ "aria-label": "What's on your mind?" }}
                    />
                  </Search>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: 2,
                  justifyContent: "space-between",
                  backgroundColor: "post.main",
                  height: "auto",
                  borderRadius: "12px",
                  marginTop: 3,
                  p: 3,
                }}
              >
                <Box sx={{ width: "100%", display: "flex", columnGap: 2 }}>
                  <Avatar alt="Small Avatar" sizes="large" />
                  <Box>
                    <Typography sx={{ fontSize: 16 }} color="text.primary">
                      Nombre Usuario
                    </Typography>
                    <Typography
                      sx={{ fontSize: "12px" }}
                      color="text.secondary"
                    >
                      Fecha
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography sx={{ fontSize: 14 }} color="text.pramary">
                    In the fast-paced world of corporate life, its crucial to
                    prioritize your mental peace. Take moments to breathe,
                    reflect, and recharge. Seek solace in small rituals, like
                    morning walks, deep breaths, or a quick meditation session
                    during breaks. #mentalpeace #corporatelife
                  </Typography>
                </Box>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "history.main",
                  }}
                >
                  <img
                    src="data:image/jpeg;base64,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"
                    alt=""
                    style={{
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton>
                    <ThumbUpAltOutlined />
                  </IconButton>
                  <Typography
                    component="span"
                    color="text.pramary"
                    sx={{ fontSize: 14 }}
                  >
                    2.1k
                  </Typography>
                  <IconButton>
                    <ModeCommentOutlined />
                  </IconButton>
                  <Typography
                    component="span"
                    color="text.pramary"
                    sx={{ fontSize: 14 }}
                  >
                    6 comments
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                    }}
                  />
                  <Search>
                    <StyledInputBase
                      sx={{ width: "100%" }}
                      placeholder="What's on your mind?"
                      inputProps={{ "aria-label": "What's on your mind?" }}
                    />
                  </Search>
                </Box>
              </Box>
            </Box> */}
            <Grid container spacing={5}>
              <MainContent foto_perfil={dataUser.foto_perfil} data={posts} />
              <Sidebar />
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default HomePage;
