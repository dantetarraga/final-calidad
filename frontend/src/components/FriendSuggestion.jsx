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
import { useState } from "react";
import { addFriend } from "../services/friend";

const FriendSuggestion = ({ user }) => {
  const nombre = user.nombre.concat(" ", user.apellidos);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleAddFriend = async () => {
    await addFriend(user._id);
    setButtonClicked(true);
  };

  return (
    <ListItem
      sx={{ width: "25%" }}
      secondaryAction={
        <IconButton
          onClick={handleAddFriend}
          style={{ color: buttonClicked ? "#52b0fa" : "inherit" }}
        >
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
