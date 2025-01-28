import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  IconButton,
  Avatar,
  Tooltip,
  useTheme,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  //   boxShadow: theme.shadows[3],
}));

const ImageSlider = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "400px",
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
}));

const SliderImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "contain",
});

const OrderDetailsPage = () => {
  const theme = useTheme();
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
  ];

  const campaignData = {
    brandName: "SportFlex",
    campaignName: "Summer Athletic Collection 2024",
    collaborationId: "CLB-2024-001",
    description:
      "Premium athletic wear campaign focusing on comfort and style for active lifestyle enthusiasts.",
  };

  const steps = ["Pending", "In Process", "Completed"];
  const activeStep = 1;

  const columns = [
    { field: "name", headerName: "Influencer Name", flex: 1 },
    { field: "followers", headerName: "Follower Count", flex: 1 },
    { field: "platform", headerName: "Platform", flex: 1 },
    { field: "engagementRate", headerName: "Engagement Rate", flex: 1 },
    { field: "status", headerName: "Collaboration Status", flex: 1 },
  ];

  const rows = [
    {
      id: 1,
      name: "Sarah Johnson",
      followers: "500K",
      platform: "Instagram",
      engagementRate: "4.5%",
      status: "Active",
    },
    {
      id: 2,
      name: "Mike Williams",
      followers: "750K",
      platform: "TikTok",
      engagementRate: "5.2%",
      status: "Pending",
    },
    {
      id: 3,
      name: "Emma Davis",
      followers: "1.2M",
      platform: "YouTube",
      engagementRate: "3.8%",
      status: "Completed",
    },
  ];
  const influencers = [
    {
      id: 1,
      name: "Emma Johnson",
      followers: "1.2M",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
      id: 2,
      name: "David Chen",
      followers: "850K",
      category: "Tech",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
    {
      id: 3,
      name: "Sarah Williams",
      followers: "2.1M",
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    },
    {
      id: 4,
      name: "Michael Brown",
      followers: "920K",
      category: "Fitness",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    },
    {
      id: 5,
      name: "Jessica Lee",
      followers: "1.5M",
      category: "Travel",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
      id: 6,
      name: "Daniel Kim",
      followers: "800K",
      category: "Food",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
      id: 7,
      name: "Olivia Taylor",
      followers: "3.3M",
      category: "Beauty",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
      id: 8,
      name: "James Walker",
      followers: "1.8M",
      category: "Music",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
  ];

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 1, maxHeight: "88svh", overflow: "scroll" }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ImageSlider>
            <SliderImage
              src={images[currentImage]}
              alt={`Campaign Image ${currentImage + 1}`}
              loading="lazy"
            />
            <IconButton
              sx={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "background.paper",
              }}
              onClick={handlePrevImage}
            >
              <FiChevronLeft />
            </IconButton>
            <IconButton
              sx={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "background.paper",
              }}
              onClick={handleNextImage}
            >
              <FiChevronRight />
            </IconButton>
          </ImageSlider>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Campaign Information
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Brand: {campaignData.brandName}
              </Typography>
              <Typography variant="subtitle1">
                Campaign: {campaignData.campaignName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Collaboration ID: {campaignData.collaborationId}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {campaignData.description}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Campaign Status
            </Typography>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Influencer Details
            </Typography>
            <TableContainer
              sx={{ height: "auto", maxHeight: "100svh", overflow: "auto" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Influencer</TableCell>
                    <TableCell>Followers</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Preview</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {influencers.map((influencer) => (
                    <TableRow key={influencer.id}>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <img
                            src={influencer.image}
                            alt={influencer.name}
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                          {influencer.name}
                        </Box>
                      </TableCell>
                      <TableCell>{influencer.followers}</TableCell>
                      <TableCell>{influencer.category}</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>{influencer.category}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderDetailsPage;
