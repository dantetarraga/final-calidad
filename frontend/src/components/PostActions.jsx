import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import { ListItem, ListItemButton, ListItemIcon, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useState } from "react";
import CustomDivider from "./CustomDivider"; // Asegúrate de importar tu componente CustomDivider desde la ubicación correcta

const PostActions = ({ reaction }) => {
  const [like, setLike] = useState(false);

  const handleReaction = () => {
    setLike(!like);
    reaction();
  };

  return (
    <Stack spacing={0.1}>
      <CustomDivider />
      <ListItem>
        <ListItemButton
          onClick={handleReaction}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ListItemIcon
            sx={{
              color: like ? "#1976D2" : "#fff",
            }}
          >
            <ThumbUpAltOutlined />
          </ListItemIcon>
          <Typography
            sx={{
              color: like ? "#1976D2" : "#fff",
            }}
          >
            Me gusta
          </Typography>
        </ListItemButton>
        <ListItemButton sx={{ display: "flex", justifyContent: "center" }}>
          <ListItemIcon>
            <ModeCommentOutlined />
          </ListItemIcon>
          <Typography>Compartir</Typography>
        </ListItemButton>
      </ListItem>
      <CustomDivider />
    </Stack>
  );
};

PostActions.propTypes = {
  reaction: PropTypes.func,
  postId: PropTypes.string,
};

export default PostActions;
