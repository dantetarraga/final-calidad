import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Close as CloseIcon, ModeCommentOutlined, ThumbUpAltOutlined } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

import MessageInput from "./MessageInput"; // Asegúrate de tener tu componente de MessageInput creado


//const ENDPOINT = 'https://localhost:3000/';

const Chat = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socket = io(ENDPOINT);

  useEffect(() => {
    socket.on('message', newMessage => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <Box className="chat-container">
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
