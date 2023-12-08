import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import { ListItem, ListItemButton, ListItemIcon, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import CustomDivider from "./CustomDivider"; // Asegúrate de importar tu componente CustomDivider desde la ubicación correcta

const PostActions = () => {
  return (
    <Stack spacing={0.1}>
      <CustomDivider />
      <ListItem>
        <ListItemButton sx={{ display: "flex", justifyContent: "center" }}>
          <ListItemIcon>
            <ThumbUpAltOutlined />
          </ListItemIcon>
          <Typography>Me gusta</Typography>
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

export default PostActions;
