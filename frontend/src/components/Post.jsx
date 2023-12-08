import { Box, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getInfoUser } from "../services/user";
import CommentSection from "./CommentSection";
import PostActions from "./PostActions";
import PostHeader from "./PostHeader";

const Post = ({ post, foto_perfil, idUser }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    (async () => {
      const id = post.usuario;
      setUser(await getInfoUser(id));
    })();
  }, [post]);

  const getDatePost = () => post.fecha_publicacion.split(",")[0];

  return (
    <>
      <Box sx={{ backgroundColor: "post.main", p: 3 }}>
        <Stack spacing={3} sx={{ flexGrow: 1 }}>
          <PostHeader
            nombre={user.nombre}
            apellidos={user.apellidos}
            postDate={getDatePost()}
            userProfileImage={user.foto_perfil}
          />
          <Typography sx={{ fontSize: 14 }} color="text.pramary">
            {post.contenido}
          </Typography>
          {post.multimedia.map((multimedia, index) => {
            return multimedia.tipo === "imagen" || multimedia.tipo === "GIF" ? (
              <img
                key={index}
                src={multimedia.url}
                alt=""
                style={{
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "15px",
                }}
              />
            ) : (
              <video
                key={index}
                src={multimedia.url}
                style={{ width: "100%", borderRadius: "15px" }}
                alt="Preview"
                controls
              />
            );
          })}
          <PostActions />
          <CommentSection
            idPost={post._id}
            foto_perfil={foto_perfil}
            idUser={idUser}
          />
        </Stack>
      </Box>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  foto_perfil: PropTypes.string,
  idUser: PropTypes.string,
};

export default Post;
