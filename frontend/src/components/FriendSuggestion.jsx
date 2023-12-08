import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";

const FriendSuggestion = ({ user }) => {
  const nombre = user.nombre.concat(" ", user.apellidos);

  return (
    <ListItem
      sx={{ width: "25%" }}
      secondaryAction={
        <IconButton>
          <PersonAddIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton>
        <ListItemAvatar>
          <Avatar alt={`Foto de perfil`} src={user.foto_perfil} />
        </ListItemAvatar>
        <ListItemText primary={nombre} />
      </ListItemButton>
    </ListItem>
  );
};

FriendSuggestion.propTypes = {
  user: PropTypes.object,
};

export default FriendSuggestion;
