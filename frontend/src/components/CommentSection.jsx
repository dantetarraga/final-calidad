import SendIcon from "@mui/icons-material/Send";
import { Avatar, Box, IconButton } from "@mui/material";
import PropsTypes from "prop-types";
import { useEffect, useState } from "react";
import { commentPost, getComments } from "../services/comment";
import Comment from "./Comment";
import { Input, StyledInputBase } from "./Input";

const CommentSection = ({ idPost, foto_perfil }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => setComments(await getComments(idPost)))();
  }, [idPost]);

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleSendComment = async (event) => {
    event.preventDefault();
    const newPost = await commentPost(comment, idPost);
    console.log(newPost);
    setComments((prevComments) => [...prevComments, newPost]);
  };

  return (
    <>
      {comments.map((comment, index) => {
        return <Comment key={index} comment={comment} />;
      })}
      <Box sx={{ flexGrow: 1, display: "flex" }}>
        <Avatar src={foto_perfil} />
        <Input>
          <StyledInputBase
            sx={{ width: "100%" }}
            placeholder="Escribe un comentario..."
            inputProps={{
              "aria-label": "Escribe un comentario...",
              name: "contenido",
              onChange: handleInputChange,
            }}
          />
          <IconButton onClick={handleSendComment}>
            <SendIcon
              sx={{
                cursor: "pointer",
                mr: 1,
                alignSelf: "center",
              }}
            />
          </IconButton>
        </Input>
      </Box>
    </>
  );
};

CommentSection.propTypes = {
  idPost: PropsTypes.string,
  foto_perfil: PropsTypes.string,
  idUser: PropsTypes.string,
};

export default CommentSection;
