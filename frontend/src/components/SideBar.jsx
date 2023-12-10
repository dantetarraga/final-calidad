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
import { Link } from "react-router-dom";
import { getDataUser } from "../services/user";

const SideBar = ({ anchor }) => {
  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    (async () => setDataUser(await getDataUser(token)))();
  }, []);
  const drawerWidth = 282;

  const menuOptions = [
    {
      text: String(dataUser.nombre).concat(" ", dataUser.apellidos),
      icon: <Avatar src={dataUser.foto_perfil} alt="Foto de perfil" />,
    },
    { text: "inicio", icon: <Home />, navigate: "/home" },
    { text: "Mensajes", icon: <Forum /> },
    { text: "Perfil", icon: <AccountBox />, navigate: "/perfil" },
    { text: "Amigos", icon: <Group /> },
    { text: "Grupos", icon: <Groups /> },
  ];

  const list = () => {
    return (
      <List>
        {menuOptions.map((option) => (
          <ListItem key={option.text}>
            <ListItemButton
              component={Link}
              to={option.navigate}
              sx={{
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.drawer.hover,
                },
              }}
              onClick={() => {}}
            >
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primary={option.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  };

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
    </Drawer>
  );
};

SideBar.propTypes = {
  anchor: PropTypes.string.isRequired,
};

export default SideBar;
