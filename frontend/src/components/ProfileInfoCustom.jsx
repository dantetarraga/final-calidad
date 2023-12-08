import React, { useState } from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import WcIcon from "@mui/icons-material/Wc";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import CakeIcon from "@mui/icons-material/Cake";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";

const ProfileInfoCustom = ({ foto_perfil }) => {
  const [dataUser, setDataUser] = useState({});
  const [imgUser, setImgUser] = useState({});

  const useNameAndPhoto = [
    {
      text: String(dataUser.nombre).concat(" ", dataUser.apellidos),
      icon: <Avatar src={String(imgUser)} alt="Foto de perfil" />,
    },
  ];
  const menuOptions = [
    { text: "Soltero", icon: <FavoriteIcon /> },
    { text: "sexo", icon: <WcIcon /> },
    { text: "fecha_registro", icon: <EditCalendarIcon /> },
    { text: "fecha_nacimiento", icon: <CakeIcon /> },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // Cambiado a "column" para mostrar elementos en columna
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "post.main",
        borderRadius: "12px",
        p: 3,
        width: "100%",
      }}
    >
      {/* Sección de la foto de perfil */}
      {useNameAndPhoto.map((option) => (
        <Avatar
          key={option.text}
          src={option.icon.props.src}
          alt={option.text}
          sx={{
            width: 300,
            height: 300,
          }}
        />
      ))}

      {/* Sección del nombre de usuario */}
      {useNameAndPhoto.map((option) => (
        <Box key={option.text} sx={{ textAlign: "center" }}>
          <ListItemText
            primary={option.text}
            sx={{ fontSize: "50px", fontWeight: "bold" }}
          />
        </Box>
      ))}

      {/* Sección de las opciones del menú mostradas en 3 columnas y 2 filas */}
      <List
        sx={{
          display: "flex",
          flexDirection: "row", // Cambiado a "row" para mostrar elementos en línea
          gap: 2, // Espaciado entre elementos
          flexWrap: "wrap", // Permite que los elementos se envuelvan en varias líneas
          justifyContent: "center", // Centra los elementos horizontalmente
        }}
      >
        {[...useNameAndPhoto, ...menuOptions].map((option) => (
          <ListItem key={option.text}>
            <ListItemButton
              sx={{
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.drawer.hover,
                },
              }}
            >
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primary={option.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Button color="secondary" variant="contained">
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        EDITAR PERFIL
      </Button>
    </Box>
  );
};

ProfileInfoCustom.propTypes = {
  foto_perfil: PropTypes.string,
};

export default ProfileInfoCustom;
