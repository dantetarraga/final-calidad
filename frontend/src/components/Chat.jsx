import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Close as CloseIcon, ModeCommentOutlined, ThumbUpAltOutlined } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

import MessageInput from "./MessageInput"; // Asegúrate de tener tu componente de MessageInput creado

const Chat = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim() !== '') {
      // Puedes agregar la lógica de envío del mensaje aquí si es necesario, aunque no se conecte a un socket
      // Ejemplo: setMessages(prevMessages => [...prevMessages, { text: message, user: 'Usuario' }]);
      setMessage('');
    }
  };

  const chatStyle = {
    position: 'fixed',
    bottom: '16px',
    right: '16px',
    zIndex: 999,
    background: { default: "#171923" },
  };

  return (
    <Box className="chat-container" style={chatStyle}>
      <Box className="chat-header">
        <h2>Chat en Vivo</h2>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        {/* Botón de notificaciones */}
        <IconButton
          size="large"
          aria-label="show 4 new mails"
          color="inherit" 
        >
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
      </Box>
      <Box className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <p>{msg.text}</p>
            <span>{msg.user}</span>
          </div>
        ))}
      </Box>
      <MessageInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
      <Box className="chat-icons">
        <IconButton>
          <ModeCommentOutlined />
        </IconButton>
        <IconButton>
          <ThumbUpAltOutlined />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chat;
