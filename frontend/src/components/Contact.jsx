import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";

const Contact = ({ contacto }) => {
  const concatName = (nombre, apellido) => nombre.concat(" ", apellido);

  return (
    <ListItem sx={{ width: "25%" }} disablePadding>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar src={contacto.foto_perfil} />
        </ListItemAvatar>
        <ListItemText
          primary={concatName(contacto.nombre, contacto.apellidos)}
        />
      </ListItemButton>
    </ListItem>
  );
};

Contact.propTypes = {
  contacto: PropTypes.object,
};

export default Contact;
