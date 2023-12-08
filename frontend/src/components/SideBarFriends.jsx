import { Avatar, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Chat from "./Chat";


const friendsList  = [
  {
    id: 1,
    name: "Amigo 1",
    profileImage: "url_de_la_imagen_1",
  },
  {
    id: 2,
    name: "Amigo 2",
    profileImage: "url_de_la_imagen_2",
  },
  {
    id: 3,
    name: "Amigo 3",
    profileImage: "url_de_la_imagen_3",
  },
  // Puedes seguir agregando más amigos aquí con el mismo formato
];

const SideBar = ({ anchor }) => {


  const [showChat, setShowChat] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null); // Estado para almacenar el amigo seleccionado


  const drawerWidth = 270;

  const list = () => (
    <List>
      {friendsList.map((friend, index) => (
        <ListItem key={friend.id}>
          <ListItemButton onClick={() => handleChatWithFriend(friend)}>
            <ListItemIcon>
              <Avatar src={friend.profileImage} alt={`Foto de perfil de ${friend.name}`} />
            </ListItemIcon>
            <ListItemText primary={friend.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  const handleChatWithFriend = (friend) => {
    setShowChat(true); // Mostrar el chat general
    setSelectedFriend(friend); // Almacenar el amigo seleccionado
    console.log(`Iniciar chat con ${friend.name}`);
    // Puedes implementar la lógica adicional aquí para iniciar el chat con el amigo seleccionado
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          height: "calc(100% - 100px)",
          top: 120,
          right: 0,
        },
      }}
      variant="permanent"
      anchor={anchor}
    >
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.drawer.main,
          height: "100%",
        }}
      >
    {list()}
      </Box>
      {showChat && selectedFriend && ( 
        <Chat
          onClose={() => setShowChat(false)}

          />
      )}
    </Drawer>
  );
};

SideBar.propTypes = {
  anchor: PropTypes.string.isRequired,
};

export default SideBar;
