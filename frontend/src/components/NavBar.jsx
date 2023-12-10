import { Chat } from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Avatar,
  Button,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import { alpha, styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { acceptFriendRequest } from "../services/friend";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#434557",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

const NavBar = ({ user, solicitudes }) => {
  const [notifications, setNotifications] = useState(0);
  const [solicitudesAmistad, setSolicitudesAmistad] = useState([]);
  const [notificationMenu, setNotificationMenu] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const handleChatToggle = () => {
    setShowChat(!showChat);
  };
  const drawerWidth = 282;

  const handleAcceptFriendRequest = async (solicitud) => {
    await acceptFriendRequest(solicitud._id);
  };

  useEffect(() => {
    const notificationsLength = user.solicitudes_amistad
      ? user.solicitudes_amistad.length
      : 0;

    const solicitudesAmistad = user.solicitudes_amistad
      ? user.solicitudes_amistad
      : [];

    setSolicitudesAmistad(solicitudesAmistad);
    setNotifications(notificationsLength);
  }, [solicitudes, user]);

  const handleNotificationMenuOpen = (event) => {
    setNotificationMenu(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationMenu(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        borderRadius: "12px",
        width: `calc(98% - ${drawerWidth}px)`,
        background: (theme) => theme.palette.appBar.main,
      }}
    >
      <Toolbar sx={{ height: 90 }}>
        <Button color="secondary" variant="contained" sx={{ mr: 2 }}>
          Only Students
        </Button>
        {/* <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search> */}
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex", columnGap: 10 } }}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            onClick={handleChatToggle}
          >
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={handleNotificationMenuOpen}
          >
            <Badge badgeContent={notifications} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            sx={{
              width: 48,
              height: 48,
            }}
          >
            <Avatar alt={user.nombre} src={user.foto_perfil} />
          </IconButton>
        </Box>
        <Menu
          anchorEl={notificationMenu}
          open={Boolean(notificationMenu)}
          onClose={handleNotificationMenuClose}
        >
          {solicitudesAmistad.map((solicitud) => {
            return (
              <MenuItem
                key={solicitud._id}
                onClick={handleNotificationMenuClose}
              >
                <ListItemText primary={solicitud.usuario} />
                <ListItemButton onClick={handleAcceptFriendRequest}>
                  <Button variant="contained" color="success">
                    Aceptar
                  </Button>
                </ListItemButton>
              </MenuItem>
            );
          })}
        </Menu>
      </Toolbar>
      {showChat && <Chat onClose={handleChatToggle} />}
    </AppBar>
  );
};

NavBar.propTypes = {
  user: PropTypes.object,
  solicitudes: PropTypes.array,
};

export default NavBar;
