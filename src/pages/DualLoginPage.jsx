import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  CircularProgress,
  Paper,
  useTheme,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  FaMicrophone,
  FaBullhorn,
  FaArrowRight,
  FaChevronDown,
} from "react-icons/fa";
import WebNav from "../components/Navbars/WebNav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

// Animated components with framer-motion
const MotionBox = styled(motion.div)({
  width: "100%",
});

const StyledSection = styled(Paper)(({ theme }) => ({
  height: "100%",
  minHeight: "500px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#ffffff",
  transition: "all 0.3s ease-in-out",
  padding: theme.spacing(6),
  position: "relative",
  overflow: "hidden",
  borderRadius: 16,
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
  "&:hover": {
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.12)",
  },
  [theme.breakpoints.down("md")]: {
    minHeight: "auto", // Remove fixed min-height
    padding: theme.spacing(4, 3),
  },
}));

const StyledButton = styled(Button)(({ theme, variant }) => ({
  padding: theme.spacing(1.5, 5),
  fontSize: "1rem",
  marginTop: theme.spacing(4),
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  textTransform: "none",
  fontWeight: 600,
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
    borderRadius: "30px", // Make both buttons consistent
    background: `linear-gradient(45deg, #da1801 30%, #ff1f00 90%)`,
    color: "#ffffff",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 6px 20px rgba(218, 24, 1, 0.4)",
    },
  }),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    fontSize: "0.9rem",
    padding: theme.spacing(1.2, 3),
    marginTop: theme.spacing(2), // Less margin on mobile
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  fontSize: "3.5rem",
  marginBottom: "1.5rem",
  color: "#da1801",
  background: "rgba(218, 24, 1, 0.08)",
  padding: theme.spacing(3),
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
    padding: theme.spacing(1.5),
    marginBottom: "0.75rem",
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  "&:after": {
    content: '""',
    position: "absolute",
    width: "40%",
    height: "4px",
    background: "linear-gradient(45deg, #da1801 30%, #ff1f00 90%)",
    bottom: "-8px",
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: "2px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem", // Smaller title on mobile
    "&:after": {
      bottom: "-5px", // Adjust underline position
      height: "3px", // Thinner underline
    },
  },
}));

// Mobile scroll indicator - fixed position between cards
const ScrollIndicator = styled(motion.div)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "#da1801",
  margin: "8px 0",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const DualLoginPage = () => {
  const [loading, setLoading] = useState({ music: false, brand: false });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const handleLogin = (type) => {
    setLoading((prev) => ({ ...prev, [type]: true }));

    // Simulate loading for better UX
    setTimeout(() => {
      if (type === "music") {
        navigate("/login");
      } else {
        navigate("/promotions/login");
      }
      setLoading((prev) => ({ ...prev, [type]: false }));
    }, 600);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Animation for scroll indicator
  const bounceAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop",
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f7f9fc",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <WebNav />

      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 4, md: 8 },
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Typography
            variant="h3"
            component="h1"
            color="textPrimary"
            gutterBottom
            align="center"
            fontWeight={700}
            sx={{
              mb: { xs: 3, md: 5 },
              fontSize: { xs: "1.75rem", md: "2.5rem" },
            }}
          ></Typography>
          {isMobile && (
            <Grid item xs={12} style={{ marginBottom: 40 }}>
              <ScrollIndicator>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500 }}
                ></Typography>
                {/* <FaChevronDown /> */}
              </ScrollIndicator>
            </Grid>
          )}

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <MotionBox variants={itemVariants}>
                <StyledSection elevation={3}>
                  <IconWrapper>
                    <FaMicrophone />
                  </IconWrapper>
                  <SectionTitle
                    variant="h4"
                    component="h2"
                    color="textPrimary"
                    gutterBottom
                    align="center"
                    fontWeight={700}
                    sx={{ mb: { xs: 1.5, md: 3 } }}
                  >
                    Music Distribution
                  </SectionTitle>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                    sx={{
                      opacity: 0.8,
                      mb: { xs: 1.5, md: 3 },
                      maxWidth: "90%",
                      lineHeight: 1.5,
                      fontSize: { xs: "0.9rem", md: "1rem" },
                    }}
                  >
                    Access your studio dashboard, distribute and manage your
                    music across global platforms.
                  </Typography>
                  <StyledButton
                    variant="music"
                    onClick={() => handleLogin("music")}
                    disabled={loading.music}
                    aria-label="Login to Music Production"
                    endIcon={!loading.music && <FaArrowRight />}
                  >
                    {loading.music ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Enter Studio"
                    )}
                  </StyledButton>
                </StyledSection>
              </MotionBox>
            </Grid>

            <Grid item xs={12} md={6}>
              <MotionBox variants={itemVariants}>
                <StyledSection elevation={3}>
                  <IconWrapper>
                    <FaBullhorn />
                  </IconWrapper>
                  <SectionTitle
                    variant="h4"
                    component="h2"
                    color="textPrimary"
                    gutterBottom
                    align="center"
                    fontWeight={700}
                    sx={{ mb: { xs: 1.5, md: 3 } }}
                  >
                    Brand Promotion
                  </SectionTitle>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                    sx={{
                      opacity: 0.8,
                      mb: { xs: 1.5, md: 3 },
                      maxWidth: "90%",
                      lineHeight: 1.5,
                      fontSize: { xs: "0.9rem", md: "1rem" },
                    }}
                  >
                    Boost your brand with targeted campaigns, connect with
                    influencers, and track performance analytics.
                  </Typography>
                  <StyledButton
                    variant="brand"
                    onClick={() => handleLogin("brand")}
                    disabled={loading.brand}
                    aria-label="Login to Brand Promotion"
                    endIcon={!loading.brand && <FaArrowRight />}
                  >
                    {loading.brand ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Launch Dashboard"
                    )}
                  </StyledButton>
                </StyledSection>
              </MotionBox>
            </Grid>
          </Grid>
        </MotionBox>
      </Container>

      {/* Add extra space before footer on mobile */}
      {isMobile && <Box sx={{ height: 40 }} />}

      <Footer />
    </Box>
  );
};

export default DualLoginPage;
