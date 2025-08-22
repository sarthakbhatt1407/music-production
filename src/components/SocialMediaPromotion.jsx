import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Chip,
  Rating,
  Stack,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import ishika from "../assets/Ishika.jpeg";
import akash from "../assets/Akash.jpg";
import himani from "../assets/Himani.jpeg";
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "#fff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: "linear-gradient(45deg, #D91A02 30%, #fff 90%)",
  padding: theme.spacing(15, 0),
  color: "#fff",
  textAlign: "center",
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s ease",
  borderRadius: "16px",
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 15px 45px 0 rgba(31, 38, 135, 0.25)",
  },
}));

const InfluencerCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const PricingCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s",
  backgroundColor: "#fff",
  borderRadius: "16px",
  position: "relative",
  overflow: "hidden",
  padding: "1rem",
  border: "1px solid rgba(0,0,0,0.08)",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 22px 45px 0 rgba(0,0,0,0.1)",
  },
}));

const SocialMediaPromotion = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tabValue, setTabValue] = useState(0);
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  const type = useSelector((state) => state.type);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const getAllPackages = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/brand/get-all-packages`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add new package.");
      }
      setPackages(data.packages);
      console.log(data);
    } catch (error) {
      console.error("Error adding new package:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllPackages();
  }, []);

  const services = [
    {
      name: "Instagram Growth",
      description:
        "AI-powered engagement strategy with targeted audience growth",
      price: "$299",
      reach: "100K+",
      icon: <FaInstagram size={30} />,
      features: [
        "Story Analytics",
        "Reels Optimization",
        "AI Content Planning",
      ],
    },
    {
      name: "Facebook Amplification",
      description: "Viral content strategy with trending sound integration",
      price: "$399",
      reach: "250K+",
      icon: <FaFacebook size={30} />,
      features: ["Trend Analysis", "Music Library Access", "Viral Predictions"],
    },
    {
      name: "YouTube Growth Lab",
      description: "Complete channel optimization with SEO-driven strategy",
      price: "$499",
      reach: "150K+",
      icon: <FaYoutube size={30} />,
      features: ["SEO Optimization", "Thumbnail Design", "Analytics Dashboard"],
    },
  ];

  const influencers = [
    {
      name: "Ishika Bisht",
      followers: "118K",
      expertise: "Lifestyle & Fashion",
      image: ishika,
      platforms: ["Instagram", "YouTube"],
    },
    {
      name: "Akash Negi Bunty",
      followers: "118K",
      expertise: "Music",
      image: akash,
      platforms: ["YouTube", "Instagram"],
    },
    {
      name: "Himani koranga",
      followers: "185K",
      expertise: "Music",
      image: himani,
      platforms: ["Instagram", "YouTube"],
    },
  ];

  return (
    <Box
      sx={{
        width: "80%",
        margin: "0 auto",
      }}
    >
      <HeroSection
        sx={{
          borderRadius: ".4rem",
        }}
        data-aos="fade-up"
      >
        <Container>
          <Typography variant="h2" gutterBottom>
            Boost Your Social Media Presence
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
            Professional promotion services that deliver real results
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#D91A02",
              color: "#fff",
              "&:hover": { backgroundColor: "#B01502" },
            }}
            onClick={() => {
              if (!isLoggedIn) {
                navigate("/promotions/login");
              } else {
                if (type === "promoter") {
                  navigate("/promotor-admin-panel/home");
                } else if (type == "promotion-admin") {
                  navigate("/admin-admin-panel/home");
                } else if (type == "influencer") {
                  navigate("/influencer-admin-panel/home");
                } else {
                  navigate("/promotions/login");
                }
              }
            }}
          >
            Get Started
          </Button>
        </Container>
      </HeroSection>

      <Container sx={{ py: 8 }}>
        {/* <Typography variant="h3" textAlign="center" gutterBottom>
          Our Services
        </Typography> */}
        <Grid container spacing={4} data-aos="fade-up">
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <ServiceCard>
                <CardContent sx={{ py: 4, px: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 3,
                      color: "#000000",
                    }}
                  >
                    {service.icon}
                    <Typography variant="h5" sx={{ ml: 2, fontWeight: 500 }}>
                      {service.name}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3, minHeight: 60 }}
                  >
                    {service.description}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                    <Chip
                      label={`${service.reach} Reach`}
                      sx={{
                        borderRadius: "8px",
                        fontWeight: 600,
                      }}
                    />
                  </Stack>
                  <Box sx={{ mt: 2 }}>
                    {service.features.map((feature, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        sx={{
                          py: 0.5,
                          display: "flex",
                          alignItems: "center",
                          color: "black",
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            bgcolor: "#DA1801",
                            mr: 1.5,
                          }}
                        />
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 3,
                      borderRadius: "8px",
                      py: 1.5,
                      textTransform: "none",
                      backgroundColor: "#DA1801",
                      fontSize: "1.1rem",
                    }}
                    onClick={() => {
                      if (!isLoggedIn) {
                        navigate("/promotions/login");
                      } else {
                        if (type === "promoter") {
                          navigate("/promotor-admin-panel/home");
                        } else if (type == "promotion-admin") {
                          navigate("/admin-admin-panel/home");
                        } else if (type == "influencer") {
                          navigate("/influencer-admin-panel/home");
                        } else {
                          navigate("/promotions/login");
                        }
                      }
                    }}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </ServiceCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: "#fff", py: 8 }} data-aos="fade-up">
        <Container>
          <Typography variant="h3" textAlign="center" gutterBottom>
            Our Top Influencers
          </Typography>
          <Grid container spacing={4}>
            {influencers.map((influencer, index) => (
              <Grid item xs={12} md={4} key={index}>
                <InfluencerCard>
                  <CardMedia
                    component="img"
                    height="300"
                    image={influencer.image}
                    alt={influencer.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{influencer.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {influencer.followers} Followers
                    </Typography>
                    <Typography variant="body2">
                      {influencer.expertise}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                      {influencer.platforms.map((platform, idx) => (
                        <Chip key={idx} label={platform} size="small" />
                      ))}
                    </Stack>
                  </CardContent>
                </InfluencerCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {packages.length > 0 && (
        <Container sx={{ py: 8 }} data-aos="fade-up">
          <Typography variant="h3" textAlign="center" gutterBottom>
            Pricing Plans
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Choose the perfect plan for your social media growth
          </Typography>

          <Grid container spacing={4}>
            {packages.map((tier, index) => (
              <Grid item xs={12} md={3} key={index}>
                <PricingCard
                  sx={{
                    transform: tier.highlighted ? "scale(1.05)" : "none",
                    zIndex: tier.highlighted ? 2 : 1,
                    boxShadow: tier.highlighted
                      ? "0 8px 45px rgba(0,0,0,0.15)"
                      : "none",
                  }}
                >
                  {tier.highlighted && (
                    <Chip
                      label="Most Popular"
                      sx={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        borderRadius: "16px",
                      }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                      {tier.name}
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "baseline", mb: 2 }}
                    >
                      <Typography
                        variant="h3"
                        component="span"
                        fontWeight="bold"
                      >
                        ₹{tier.discountedPrice}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          py: 1,
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            backgroundColor: "",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography variant="caption" color="primary.main">
                            ✓
                          </Typography>
                        </Box>
                        <Typography variant="body1" color="text.secondary">
                          {tier.selectedInf.length} Influencers
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          py: 1,
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            backgroundColor: "",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography variant="caption" color="primary.main">
                            ✓
                          </Typography>
                        </Box>
                        <Typography variant="body1" color="text.secondary">
                          Professional Influencers
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          py: 1,
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            backgroundColor: "",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography variant="caption" color="primary.main">
                            ✓
                          </Typography>
                        </Box>
                        <Typography variant="body1" color="text.secondary">
                          Dedicated Manager
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          py: 1,
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            backgroundColor: "",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography variant="caption" color="primary.main">
                            ✓
                          </Typography>
                        </Box>
                        <Typography variant="body1" color="text.secondary">
                          24/7 Support
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      variant={tier.highlighted ? "contained" : "outlined"}
                      fullWidth
                      size="large"
                      sx={{
                        mt: "auto",
                        py: 1.5,
                        borderRadius: "8px",
                        textTransform: "none",
                        fontSize: "1.1rem",
                        backgroundColor: "#DA1801",
                        color: "white",
                        borderWidth: 0,
                      }}
                      onClick={() => {
                        if (!isLoggedIn) {
                          navigate("/promotions/login");
                        } else {
                          if (type === "promoter") {
                            navigate("/promotor-admin-panel/home");
                          } else if (type == "promotion-admin") {
                            navigate("/admin-admin-panel/home");
                          } else if (type == "influencer") {
                            navigate("/influencer-admin-panel/home");
                          } else {
                            navigate("/promotions/login");
                          }
                        }
                      }}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </PricingCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      <IconButton
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "#D91A02",
          color: "white",
          "&:hover": { backgroundColor: "#B01502" },
        }}
      >
        <BsChatDotsFill size={24} />
      </IconButton>
    </Box>
  );
};

export default SocialMediaPromotion;
