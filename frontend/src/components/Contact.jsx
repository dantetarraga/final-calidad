import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import Chat from "./Chat";

const Contact = ({ contacto }) => {
  const concatName = (nombre, apellido) => nombre.concat(" ", apellido);

  const [showChat, setShowChat] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleChatWithFriend = (friend) => {
    setShowChat(true);
    setSelectedFriend(friend);
    console.log(`Iniciar chat con ${friend.name}`);
  };

  return (
    <ListItem sx={{ width: "25%" }} disablePadding>
      <ListItemButton onClick={() => handleChatWithFriend(contacto)}>
        <ListItemAvatar>
          <Avatar src={contacto.foto_perfil} />
        </ListItemAvatar>
        <ListItemText
          primary={concatName(contacto.nombre, contacto.apellidos)}
        />
      </ListItemButton>
      {showChat && selectedFriend && (
        <Chat onClose={() => setShowChat(false)} />
      )}
    </ListItem>
  );
};

Contact.propTypes = {
  contacto: PropTypes.object,
};

export default Contact;
