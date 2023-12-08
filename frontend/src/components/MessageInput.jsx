import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const MessageInput = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="message-input">
      <TextField
        fullWidth
        variant="outlined"
        label="Escribe tu mensaje"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={sendMessage}
      >
        Enviar
      </Button>
    </div>
  );
};

export default MessageInput;
