import { Avatar, ListItem, ListItemButton, Typography } from "@mui/material";
import PropTypes from "prop-types";

const Contact = ({ contacto }) => {
  const concatName = (nombre, apellido) => nombre.concat(" ", apellido);

  return (
    <ListItem sx={{ width: "100%", p: "10px 0" }}>
      <ListItemButton>
        <Avatar src={contacto.foto_perfil} sx={{ m: 0 }} />
        <Typography variant="subtitle1" sx={{ ml: 2, mt: 1 }}>
          {concatName(contacto.nombre, contacto.apellidos)}
        </Typography>
      </ListItemButton>
    </ListItem>
  );
};

Contact.propTypes = {
  contacto: PropTypes.object,
};

export default Contact;
