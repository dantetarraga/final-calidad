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
    console.log(message);
    socket.emit('message', message);
    sendMessage();
  };

  useEffect(() => {
    socket.on('message', message => {
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
      const newMessage = { text: message, user: 'Usuario' };
      socketRef.current.emit("sendMessage", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 16px',
    borderBottom: '1px solid #ccc',
  };

  const closeButtonStyle = {
    marginLeft: 'auto',
  };

  const chatContentStyle = {
    flex: 1,
    overflowY: 'scroll',
    padding: '16px',
  };

  const messageInputContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 20px',
    borderTop: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
  };

  const messageStyle = {
    backgroundColor: '#3b5998',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '20px',
    marginBottom: '8px',
    maxWidth: '70%',
  };

  const chatStyle = {
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
  };

  return (
    <Box className="chat-container" style={chatStyle}>
      <Box className="chat-header" style={headerStyle}>
        <h2>Chat en Vivo</h2>
        <IconButton onClick={onClose} style={closeButtonStyle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box className="chat-messages" style={chatContentStyle}>
  {messages.map((msg, index) => (
    <div key={index} className="message" style={messageStyle}>
      {msg.text && <span>{msg.user}</span>}
      {msg.text && <p>{msg.text}</p>}
    </div>
  ))}
  <div ref={messagesEndRef} />
</Box>
      <Box className="message-input" style={messageInputContainerStyle}>
        <MessageInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </Box>
    </Box>
  );
};

export default Chat;


