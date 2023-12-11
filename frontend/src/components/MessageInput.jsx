import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SendIcon from '@mui/icons-material/Send';

const MessageInput = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="message-input">
      <Box display="flex" alignItems="center" gap={2}>
        <TextField
          fullWidth
          label="Escribe tu mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button color="secondary" variant="contained" onClick={sendMessage}>
          <SendIcon />
        </Button>
      </Box>
    </div>
  );
};

export default MessageInput;
