import { ModeCommentOutlined, ThumbUpAltOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import PropTypes from "prop-types";

const Post = ({ data }) => {
  console.log(data);

  return (
    <>
      {data.map((post, index) => (
        <Box key={index} sx={{ backgroundColor: "post.main" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ fontSize: 14 }} color="text.pramary">
              {post.contenido}
            </Typography>
            <img
              src={post.multimedia[0].url}
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
        </Box>
      ))}
    </>
  );
};

Post.propTypes = {
  data: PropTypes.array,
};

export default Post;
