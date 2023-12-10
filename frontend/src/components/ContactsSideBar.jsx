import { Grid, List, ListSubheader, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getFriends, suggestFriends } from "../services/friend";
import Contact from "./Contact";
import FriendSuggestion from "./FriendSuggestion";

const ContactsSidebar = () => {
  const [contacts, setCotacts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    (async () => setCotacts(await getFriends()))();
    (async () => setSuggestions(await suggestFriends()))();
  }, []);

  return (
    <Grid item xs={12} md={4}>
      <Stack
        spacing={5}
        sx={{
          width: "100%",
          height: "calc(100vh - 150px)",
          position: "fixed",
        }}
      >
        <List
          sx={{
            width: "100%",
            height: "50%",
            bgcolor: "#212330",
            position: "relative",
            overflow: "auto",
            p: "0 10px",
          }}
          subheader={
            <ListSubheader
              sx={{
                background: "#212330",
                color: "#fff",
              }}
              component="div"
              id="list-header"
            >
              <Typography
                variant="h6"
                sx={{
                  display: "inline-block",
                  fontWeight: 700,
                  p: "10px 0",
                }}
              >
                Contactos
              </Typography>
            </ListSubheader>
          }
        >
          {contacts.map((contact) => (
            <Contact key={contact._id} contacto={contact} />
          ))}
        </List>
        <List
          sx={{
            width: "100%",
            height: "50%",
            bgcolor: "#212330",
            position: "relative",
            overflow: "auto",
            p: "0 10px",
          }}
          subheader={
            <ListSubheader
              sx={{
                background: "#212330",
                color: "#fff",
                m: 0,
              }}
              component="div"
              id="list-header"
            >
              <Typography
                variant="h6"
                sx={{ display: "inline-block", fontWeight: 700, p: "10px 0" }}
              >
                Sugerencias de amistad
              </Typography>
            </ListSubheader>
          }
        >
          {suggestions.map((user) => (
            <FriendSuggestion key={user._id} user={user} />
          ))}
        </List>
      </Stack>
    </Grid>
  );
};

export default ContactsSidebar;
