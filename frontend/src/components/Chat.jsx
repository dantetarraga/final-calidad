
import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import IconButton from "@mui/material/IconButton";
import { Close as CloseIcon } from "@mui/icons-material";
import io from "socket.io-client";

const socket = io("/");

const MessageInput = ({ message, setMessage, sendMessage }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('message', message);
    sendMessage();
  };

  useEffect(() => {
    socket.on('message', message => {
      console.log("MUESTRA MENSAJE");

      console.log(message);
    });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" alignItems="center" gap={2}>
        <TextField
          fullWidth
          label="Escribe tu mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button color="secondary" variant="contained" type="submit">
          <SendIcon />
        </Button>
      </Box>
    </form>
  );
};

const Chat = ({ onClose, appBarBackgroundColor }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io("/");
    socketRef.current.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      scrollToBottom();
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        contenido: message, // Define el contenido del mensaje
        remitente: '6574a78d5968d60c58b47a7b', // Define el ID del remitente
        receptor: '6573a47b88f1c14e2c7d680e' // Define el ID del receptor
      };
  
      socketRef.current.emit("message", newMessage); // Envia el mensaje al servidor
      setMessage('');
    }
  };

  return (
    <Box
      style={{
        border: `2px solid`,
        borderRadius: '10px',
        position: 'fixed',
        bottom: '3px',
        right: '300px',
        zIndex: 999,
        backgroundColor: appBarBackgroundColor,
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        style={{
          flex: 1,
          overflowY: 'scroll',
          padding: '16px',
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              backgroundColor: msg.user === 'Usuario' ? '#3b5998' : '#000',
              color: msg.user === 'Usuario' ? '#fff' : '#000',
              padding: '8px 12px',
              borderRadius: '20px',
              marginBottom: '8px',
              maxWidth: '70%',
              alignSelf: msg.user === 'Usuario' ? 'flex-end' : 'flex-start',
            }}
          >
            {msg.text && <span>{msg.user}</span>}
            {msg.text && <p>{msg.text}</p>}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 20px',
          borderTop: '1px solid #ccc',
        }}
      >
        <MessageInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chat;
