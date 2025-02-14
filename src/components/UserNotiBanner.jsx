import React, { useState, useEffect } from "react";
import { Box, Typography, styled } from "@mui/material";
import { keyframes } from "@mui/system";

const slideAnimation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
`;

const NotificationContainer = styled(Box)(({ theme, bgcolor, speed }) => ({
  width: "100%",
  overflow: "hidden",
  backgroundColor: bgcolor || "#f5f5f5",
  padding: theme.spacing(1),
  position: "relative",
  "&:hover .sliding-text": {
    animationPlayState: "paused",
  },
  marginBottom: "1rem",
}));

const SlidingText = styled(Typography)(({ theme, textcolor, speed }) => ({
  whiteSpace: "nowrap",
  display: "inline-block",
  animation: `${slideAnimation} ${speed || 20}s linear infinite`,
  color: textcolor || "#333",
  "&.sliding-text": {
    position: "relative",
  },
}));

const UserNotiBanner = ({
  backgroundColor = "#f5f5f5",
  textColor = "#1a1a1a",
  speed = 20,
  pauseOnHover = true,
  text,
  ...props
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(props);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === text.length - 1 ? 0 : prevIndex + 1
      );
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [text.length, speed]);

  return (
    <NotificationContainer
      bgcolor={backgroundColor}
      speed={speed}
      role="alert"
      aria-live="polite"
    >
      <SlidingText
        className="sliding-text"
        variant="h6"
        textcolor={textColor}
        speed={speed}
      >
        {text}
      </SlidingText>
    </NotificationContainer>
  );
};

export default UserNotiBanner;
