import { Avatar, Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getInfoUser } from "../services/user";

const Comment = ({ comment }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const id = comment.usuario;
      setUser(await getInfoUser(id));
    })();
  }, [comment]);

  const concatName = () => `${user.nombre} ${user.apellidos}`;

  return (
    <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
      <Avatar src={user.foto_perfil} alt="" />
      <Box
        sx={{
          background: "#3A3B3C",
          p: "5px 13px",
          borderRadius: "12px",
          minWidth: 0,
          height: "auto",
        }}
      >
        <Typography variant="subtitle1" sx={{ cursor: "pointer" }}>
          {concatName()}
        </Typography>
        <Typography variant="subtitle1">{comment.contenido}</Typography>
      </Box>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
};

export default Comment;
