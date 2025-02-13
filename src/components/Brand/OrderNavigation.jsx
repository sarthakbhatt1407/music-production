import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { BsBox, BsPencilSquare } from "react-icons/bs";
import { useNavigate } from "react-router";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "300px",
  cursor: "pointer",
  transition: "all 0.3s ease-in-out",
  background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
  },
}));

const IconWrapper = styled(Box)({
  fontSize: "3rem",
  marginBottom: "1rem",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
  },
});

const AnimatedContainer = styled(Container)({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  padding: "2rem",
});

const OrderNavigation = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const handleCardClick = (option) => {
    if (option.id === "packages") {
      navigate("/promotor-admin-panel/new-order-with-packages");
    } else {
      navigate("/promotor-admin-panel/new-order-without-packages");
    }
  };

  const options = [
    {
      id: "packages",
      title: "Available Packages",
      subtitle: "Browse our pre-designed package options",
      icon: <BsBox />,
      ariaLabel: "Navigate to Available Packages section",
    },
    {
      id: "custom",
      title: "Custom Order",
      subtitle: "Create your own customized order",
      icon: <BsPencilSquare />,
      ariaLabel: "Navigate to Custom Order section",
    },
  ];

  return (
    <AnimatedContainer maxWidth="lg">
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {options.map((option) => (
          <Grid item xs={12} sm={6} md={5} key={option.id}>
            <StyledCard
              onClick={() => handleCardClick(option)}
              role="button"
              aria-label={option.ariaLabel}
              tabIndex={0}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  textAlign: "center",
                  padding: "2rem",
                }}
              >
                <IconWrapper>
                  <IconButton
                    aria-label={option.ariaLabel}
                    size="large"
                    color="primary"
                    sx={{ fontSize: "inherit" }}
                  >
                    {option.icon}
                  </IconButton>
                </IconWrapper>
                <Typography
                  variant="h4"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {option.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ maxWidth: "80%", margin: "0 auto" }}
                >
                  {option.subtitle}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </AnimatedContainer>
  );
};

export default OrderNavigation;
