import { Favorite as FavoriteIcon } from "@mui/icons-material";
import CakeIcon from "@mui/icons-material/Cake";
import EditIcon from "@mui/icons-material/Edit";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import WcIcon from "@mui/icons-material/Wc";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";

const ProfileInfoCustom = ({ dataUser }) => {
  console.log(dataUser);

  const useNameAndPhoto = [
    {
      text: String(dataUser.nombre).concat(" ", dataUser.apellidos),
      icon: <Avatar src={dataUser.foto_perfil} alt="Foto de perfil" />,
    },
  ];
  const menuOptions = [
    { text: "Soltero", icon: <FavoriteIcon /> },
    { text: "sexo", icon: <WcIcon />, secondary: dataUser.sexo },
    {
      text: "fecha_registro",
      icon: <EditCalendarIcon />,
      secondary: dataUser.fecha_registro,
    },
    {
      text: "fecha_nacimiento",
      icon: <CakeIcon />,
      secondary: dataUser.fecha_nacimiento,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "post.main",
        borderRadius: "12px",
        p: 3,
        width: "100%",
      }}
    >
      {useNameAndPhoto.map((option) => (
        <Avatar
          key={option.text}
          src={option.icon.props.src}
          alt={option.text}
          sx={{
            width: 250,
            height: 250,
          }}
        />
      ))}

      {useNameAndPhoto.map((option) => (
        <Box key={option.text} sx={{ textAlign: "center" }}>
          <ListItemText
            primary={option.text}
            sx={{ fontSize: "50px", fontWeight: "bold" }}
          />
        </Box>
      ))}

      <List
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {[...menuOptions].map((option) => (
          <ListItem key={option.text}>
            <ListItemButton
              sx={{
                "&:hover": {
                  backgroundColor: "palette.drawer.hover",
                },
              }}
            >
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText
                primary={option.text}
                secondary={option.secondary}
              />
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
  dataUser: PropTypes.object,
};

export default ProfileInfoCustom;
