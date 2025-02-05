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
import MusicLoader from "../Loader/MusicLoader";

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
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchChats = async (brandId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/user/get-chats`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ brandId: "67a33c48d9f27471b3bd6eba" }),
        }
      );

      const data = await response.json();

      if (data.success) {
        if (messages.length == data.chats.length) {
        } else {
          setMessages(data.chats);
        }
      } else {
        throw new Error("Failed to load chats.");
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
    setLoading(false);
  };
  const sendChats = async (brandId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/user/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            brandId: "67a33c48d9f27471b3bd6eba",
            message: inputMessage,
            from: "67a33c48d9f27471b3bd6eba",
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setInputMessage("");
      } else {
        throw new Error("Failed to load chats.");
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const theme = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setLoading(true);

    const interval = setInterval(() => {
      fetchChats();
    }, 1000); // Fetch every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && inputMessage.trim()) {
      e.preventDefault();
      sendChats();
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
        {loading && <MusicLoader />}
        <MessagesContainer>
          {messages.length > 0 &&
            messages.map((message) => (
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
              onClick={sendChats}
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
