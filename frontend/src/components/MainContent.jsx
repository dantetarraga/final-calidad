import { Grid, Paper, Stack } from "@mui/material";
import PropTypes from "prop-types";
import Post from "./Post";
import PostForm from "./PostForm";

const MainContent = ({ foto_perfil, data, user }) => {
  return (
    <Grid item xs={12} md={8} style={{ overflow: "auto" }}>
      <Stack spacing={3}>
        <Paper
          style={{
            minHeight: "200px",
            padding: "0 15%",
            background: "#171923",
          }}
        >
          <PostForm foto_perfil={foto_perfil} />
        </Paper>
        {data.map((post, index) => {
          return (
            <Paper
              style={{
                minHeight: "200px",
                padding: "0 15%",
                background: "#171923",
              }}
              key={index}
            >
              <Post post={post} foto_perfil={foto_perfil} idUser={user._id} />
            </Paper>
          );
        })}
      </Stack>
    </Grid>
  );
};

MainContent.propTypes = {
  foto_perfil: PropTypes.string,
  data: PropTypes.array,
  user: PropTypes.object,
};

export default MainContent;
