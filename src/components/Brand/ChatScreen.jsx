import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Avatar,
  styled,
  useTheme,
} from "@mui/material";
import { IoSend } from "react-icons/io5";
import { BsCheckAll, BsCheck } from "react-icons/bs";
import { Breadcrumb } from "antd";

const ChatContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "74vh",
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.background.default
      : theme.palette.grey[100],
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[700]
        : theme.palette.grey[300],
    borderRadius: "3px",
  },
}));

const MessageBubble = styled(Paper)(({ theme, isOwn }) => ({
  maxWidth: "70%",
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  marginLeft: isOwn ? "auto" : 0,
  marginRight: isOwn ? 0 : "auto",
  backgroundColor: isOwn
    ? theme.palette.primary.main
    : theme.palette.background.paper,
  color: isOwn
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
  borderRadius: theme.spacing(2),
  position: "relative",
}));

const InputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! How are you?",
      sender: "other",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: "seen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
      id: 2,
      text: "I'm doing great! How about you?",
      sender: "self",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      status: "seen",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const theme = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    const trimmedMessage = inputMessage.trim();
    if (trimmedMessage) {
      const newMessage = {
        id: Date.now(),
        text: trimmedMessage,
        sender: "self",
        timestamp: new Date().toISOString(),
        status: "sent",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const MessageStatus = ({ status }) => {
    if (status === "sent") return <BsCheck size={16} />;
    if (status === "delivered") return <BsCheckAll size={16} />;
    if (status === "seen")
      return <BsCheckAll size={16} color={theme.palette.primary.main} />;
    return null;
  };

  return (
    <>
      <div style={{ paddingLeft: "1rem", paddingTop: ".5rem" }}>
        {" "}
        <Typography
          variant="h5"
          gutterBottom
          sx={{ mb: 2, textAlign: "start" }}
        >
          Chat
        </Typography>
        <Breadcrumb
          style={{
            margin: "1rem 0",
          }}
          items={[
            {
              title: "Admin Panel",
            },
            {
              title: "Chat",
            },
          ]}
        />
      </div>
      <ChatContainer>
        <MessagesContainer>
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems:
                  message.sender === "self" ? "flex-end" : "flex-start",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-end", mb: 0.5 }}>
                {message.sender !== "self" && (
                  <Avatar
                    src={message.avatar}
                    alt="User Avatar"
                    sx={{ width: 24, height: 24, mr: 1 }}
                  />
                )}
                <MessageBubble isOwn={message.sender === "self"}>
                  <Typography variant="body1">{message.text}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      mt: 0.5,
                      opacity: 0.7,
                      fontSize: "0.75rem",
                    }}
                  >
                    {formatTime(message.timestamp)}
                    {message.sender === "self" && (
                      <Box sx={{ ml: 0.5 }}>
                        <MessageStatus status={message.status} />
                      </Box>
                    )}
                  </Box>
                </MessageBubble>
                {message.sender === "self" && (
                  <Avatar
                    src={message.avatar}
                    alt="User Avatar"
                    sx={{ width: 24, height: 24, ml: 1 }}
                  />
                )}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </MessagesContainer>

        <InputContainer>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={inputMessage}
              onChange={(e) => {
                setInputMessage(e.target.value);
                setIsTyping(e.target.value.length > 0);
              }}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              variant="outlined"
              size="small"
              sx={{ mr: 1 }}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              aria-label="Send message"
            >
              <IoSend />
            </IconButton>
          </Box>
        </InputContainer>
      </ChatContainer>
    </>
  );
};

export default ChatScreen;
