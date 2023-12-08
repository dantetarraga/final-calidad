import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Close as CloseIcon, ThumbUpAltOutlined } from "@mui/icons-material";

import MessageInput from "./MessageInput"; // Asegúrate de tener tu componente de MessageInput creado

const Chat = ({ onClose, appBarBackgroundColor }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
    
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: message, user: 'Usuario' }
      ]);
      setMessage('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
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
            <span>{msg.user}: </span>
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Box className="message-input" style={messageInputContainerStyle}>
        <MessageInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          onKeyDown={handleKeyDown}
          style={{ flex: 1 }}
        />
      </Box>
    </Box>
  );
};

export default Chat;