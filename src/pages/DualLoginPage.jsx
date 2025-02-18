import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaMicrophone, FaBullhorn } from "react-icons/fa";
import WebNav from "../components/Navbars/WebNav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";

const StyledSection = styled(Box)(({ theme, bgColor }) => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#ffffff",
  transition: "all 0.3s ease-in-out",
  padding: theme.spacing(4),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 0,
  },
}));

const StyledButton = styled(Button)(({ theme, variant }) => ({
  padding: theme.spacing(2, 6),
  fontSize: "1.2rem",
  marginTop: theme.spacing(3),
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  ...(variant === "music" && {
    borderRadius: "30px",
    background: `linear-gradient(45deg, #da1801 30%, #ff1f00 90%)`,
    color: "#ffffff",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 6px 20px rgba(218, 24, 1, 0.4)",
    },
  }),
  ...(variant === "brand" && {
    borderRadius: "4px",
    background: `linear-gradient(45deg, #da1801 30%, #ff1f00 90%)`,
    color: "#ffffff",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(218, 24, 1, 0.4)",
    },
  }),
}));

const IconWrapper = styled(Box)({
  fontSize: "3rem",
  marginBottom: "1rem",
  color: "black",
});

const DualLoginPage = () => {
  const [loading, setLoading] = useState({ music: false, brand: false });
  const navigate = useNavigate();
  const handleLogin = (type) => {
    if (type === "music") {
      navigate("/login");
    } else {
      navigate("/promotions/login");
    }
  };

  return (
    <>
      {" "}
      <WebNav />
      <Container maxWidth="xl" disableGutters>
        <Grid container sx={{}}>
          <Grid item xs={12} md={6}>
            <StyledSection>
              <IconWrapper>
                <FaMicrophone />
              </IconWrapper>
              <Typography
                variant="h4"
                component="h1"
                color="black"
                gutterBottom
                align="center"
                fontWeight={700}
              >
                Music Distribution
              </Typography>
              <Typography
                variant="body1"
                color="black"
                align="center"
                sx={{ opacity: 0.8, mb: 3 }}
              >
                Access your studio dashboard and create amazing music
              </Typography>
              <StyledButton
                variant="music"
                onClick={() => handleLogin("music")}
                disabled={loading.music}
                aria-label="Login to Music Production"
              >
                {loading.music ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Enter Studio"
                )}
              </StyledButton>
            </StyledSection>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledSection>
              <IconWrapper>
                <FaBullhorn />
              </IconWrapper>
              <Typography
                variant="h4"
                component="h1"
                color="black"
                gutterBottom
                align="center"
                fontWeight={700}
              >
                Brand Promotion
              </Typography>
              <Typography
                variant="body1"
                color="black"
                align="center"
                sx={{ opacity: 0.8, mb: 3 }}
              >
                Manage your brand campaigns and track performance
              </Typography>
              <StyledButton
                variant="brand"
                onClick={() => handleLogin("brand")}
                disabled={loading.brand}
                aria-label="Login to Brand Promotion"
              >
                {loading.brand ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Launch Dashboard"
                )}
              </StyledButton>
            </StyledSection>
          </Grid>
        </Grid>
      </Container>{" "}
      <Footer />
    </>
  );
};

export default DualLoginPage;
