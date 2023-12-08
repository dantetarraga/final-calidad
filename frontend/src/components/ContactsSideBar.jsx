import {
  Grid,
  List,
  ListSubheader,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getFriends } from "../services/friend";
import Contact from "./Contact";

const ContactsSidebar = () => {
  const [contacts, setCotacts] = useState([]);

  useEffect(() => {
    (async () => {
      setCotacts(await getFriends());
    })();
  }, []);

  return (
    <Grid item xs={12} md={4} sx={{ position: "sticky" }}>
      <Stack spacing={5} sx={{ width: "100%", height: "calc(100vh - 150px)" }}>
        <Paper
          sx={{
            padding: "20px",
            height: "50%",
            width: "100%",
            overflow: "auto",
            background: "#212330",
          }}
        >
          <List
            sx={{
              position: "relative",
              overflow: "auto",
              "& ul": { padding: 0 },
            }}
            subheader={
              <ListSubheader
                sx={{
                  background: "#212330",
                  color: "#fff",
                  position: "relative",
                }}
                component="div"
                id="list-header"
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  Contactos
                </Typography>
              </ListSubheader>
            }
          >
            {contacts.map((contact) => (
              <Contact key={contact.id} contacto={contact} />
            ))}
          </List>
        </Paper>
        <Paper
          style={{
            padding: "20px",
            height: "50%",
            width: "100%",
            background: "#212330",
          }}
        >
          {/* Contenido de la barra lateral */}
          <h2>Sidebar</h2>
          {/* Agrega más contenido según sea necesario */}
          {/* ... */}
        </Paper>
      </Stack>
    </Grid>
  );
};

export default ContactsSidebar;
