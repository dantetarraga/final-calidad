
import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import IconButton from "@mui/material/IconButton";
import { Close as CloseIcon } from "@mui/icons-material";
import io from "socket.io-client";

const socket = io("/");

const Chat = () => {
  const [message, setMessage] = useState('');
  const [socket] = useState(io("/")); // Socket.IO connection
  const socketRef = useRef();


  const handleSendMessage = () => {
    const messageData = {
      contenido: message,
      remitente: '6574a78d5968d60c58b47a7b',
      receptor: '6573a47b88f1c14e2c7d680e'
    };

    socket.emit('contenido', messageData);
    setMessage(''); // Limpiar el campo de mensaje después de enviar
  };

  return (
    <div>
      <h1>Chat de Prueba con Base de Datos</h1>
      <div>
        <input
          type="text"
          placeholder="Escribe un mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;
