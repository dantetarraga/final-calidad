import { AccountBox, Forum, Group, Groups, Home } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { arrayBufferToBase64 } from "../../utils/arrayBuffer";
import { getDataUser, getImgPerfil } from "../services/user";

const SideBarFriends = ({ anchor }) => {
  const [dataUser, setDataUser] = useState({});
  const [imgUser, setImgUser] = useState({});

  const handleChatWithFriend = (friend) => {
    // Aquí puedes implementar la lógica para iniciar un chat con el amigo seleccionado
    // Por ejemplo, podrías abrir el chat correspondiente utilizando su información
    console.log(`Iniciar chat con ${friend.nombre}`);
    // Lógica para iniciar el chat con el amigo seleccionado...
  };

 

  useEffect(() => {
    const token = localStorage.getItem("token");

    (async () => setDataUser(await getDataUser(token)))();
    (async () => {
      const imageUrl = arrayBufferToBase64(await getImgPerfil(token));
      setImgUser(imageUrl);
    })();
  }, []);
  const drawerWidth = 282;

  const menuOptions = [
    {
      text: String(dataUser.nombre).concat(" ", dataUser.apellidos),
      icon: <Avatar src={String(imgUser)} alt="Foto de perfil" />,
    },
    { text: "inicio", icon: <Home /> },
    { text: "Mensajes", icon: <Forum /> },
    { text: "Perfil", icon: <AccountBox /> },
    { text: "Amigos", icon: <Group /> },
    { text: "Grupos", icon: <Groups /> },
  ];

  const list = () => (
    <List>
      {menuOptions.map((option, index) => (
        <ListItem key={option.text}>
          <ListItemButton
            onClick={() => {
              // Ignoramos los primeros elementos, ya que no son los amigos
              if (index > 4) {
                handleChatWithFriend(option.text);
              }
            }}
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
  );

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor={anchor} // Asegúrate de pasar "right" como valor de anchor
    >
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.drawer.main,
          height: "100%",
        }}
      >
        {list()}
      </Box>
    </Drawer>
  );
};

SideBarFriends.propTypes = {
  anchor: PropTypes.string.isRequired,
};

export default SideBarFriends;
