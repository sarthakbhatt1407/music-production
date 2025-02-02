import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Grid,
  Alert,
  Chip,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaUserCheck, FaSearch } from "react-icons/fa";
import { Breadcrumb, message } from "antd";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const OrderCreator = () => {
  const [selectedInfluencers, setSelectedInfluencers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    brandName: "",
    campaignName: "",
    collaborationId: "",
    campaignDescription: "",
    audioFile: null,
    videoFile: null,
    photos: [],
    campaignUrl: "",
  });
  const [submitted, setSubmitted] = useState(false);

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

  const filteredInfluencers = influencers.filter(
    (influencer) =>
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInfluencerSelect = (influencer) => {
    setSelectedInfluencers((prev) => {
      const isSelected = prev.some((i) => i.id === influencer.id);
      if (isSelected) {
        return prev.filter((i) => i.id !== influencer.id);
      } else {
        return [...prev, influencer];
      }
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "photos") {
      setFormData({
        ...formData,
        [name]: Array.from(files),
      });
    } else {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    }
  };

  const handleRemoveInfluencer = (influencerId) => {
    setSelectedInfluencers((prev) => prev.filter((i) => i.id !== influencerId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Prepare the form data to send
    const formDataToSubmit = new FormData();

    formDataToSubmit.append("brandName", formData.brandName);
    formDataToSubmit.append("campaignName", formData.campaignName);
    formDataToSubmit.append("userId", "12345");
    formDataToSubmit.append("campaignUrl", formData.campaignUrl);
    formDataToSubmit.append("collaborationId", formData.collaborationId);
    formDataToSubmit.append(
      "campaignDescription",
      formData.campaignDescription
    );
    formDataToSubmit.append("video", formData.videoFile);

    // Append photos if available
    formData.photos.forEach((photo, index) => {
      formDataToSubmit.append(`image`, photo);
    });
    let idArr = selectedInfluencers.map((influencer) => influencer.id);

    // Append selected influencers
    formDataToSubmit.append(
      "selectedInfluencers",
      JSON.stringify(selectedInfluencers)
    );
    formDataToSubmit.append("infIdArr", JSON.stringify(idArr));
    formDataToSubmit.append("file", formData.audioFile);

    console.log(`${process.env.REACT_APP_BASE_URL}/brand/new-order`);

    try {
      // Sending the form data to the API
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/brand/new-order`,
        {
          method: "POST",
          body: formDataToSubmit,
        }
      );

      // Check if the response is OK
      if (response.ok) {
        // Parse the response if needed
        const data = await response.json();

        // Show success message
        message.success("Campaign submitted successfully!");
        console.log(data); // Log the response data
      } else {
        throw new Error("Failed to submit campaign");
      }
    } catch (error) {
      // Show error message if submission fails
      message.error("Failed to submit the campaign. Please try again.");
      console.error(error);
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 1, maxHeight: "100%", overflow: "scroll" }}
    >
      <Typography variant="h5" gutterBottom sx={{ mb: 2, textAlign: "start" }}>
        Brand Promotion Campaign
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
            title: "Orders",
          },
        ]}
      />
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <StyledPaper>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                placeholder="Search by name or category"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <FaSearch style={{ marginRight: "8px" }} />,
                }}
              />
            </Box>

            <TableContainer
              sx={{ height: "auto", maxHeight: "100svh", overflow: "auto" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Influencer</TableCell>
                    <TableCell>Followers</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredInfluencers.map((influencer) => (
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
                      <TableCell align="center">
                        <StyledButton
                          variant="contained"
                          color={
                            selectedInfluencers.some(
                              (i) => i.id === influencer.id
                            )
                              ? "success"
                              : "primary"
                          }
                          onClick={() => handleInfluencerSelect(influencer)}
                          startIcon={<FaUserCheck />}
                        >
                          {selectedInfluencers.some(
                            (i) => i.id === influencer.id
                          )
                            ? "Selected"
                            : "Select"}
                        </StyledButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={5}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Campaign Details
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Brand Name"
                name="brandName"
                value={formData.brandName}
                onChange={handleInputChange}
                required
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Campaign Name"
                name="campaignName"
                value={formData.campaignName}
                onChange={handleInputChange}
                required
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Collaboration ID"
                name="collaborationId"
                value={formData.collaborationId}
                onChange={handleInputChange}
                required
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                label="Campaign URL"
                name="campaignUrl"
                value={formData.campaignUrl}
                onChange={handleInputChange}
                required
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Campaign Description"
                name="campaignDescription"
                value={formData.campaignDescription}
                onChange={handleInputChange}
                required
                multiline
                rows={4}
                sx={{ mb: 3 }}
              />

              <Typography variant="subtitle1" gutterBottom>
                Selected Influencers:
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ mb: 3, flexWrap: "wrap", gap: 1 }}
              >
                {selectedInfluencers.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No influencers selected
                  </Typography>
                ) : (
                  selectedInfluencers.map((influencer) => (
                    <Chip
                      key={influencer.id}
                      label={influencer.name}
                      onDelete={() => handleRemoveInfluencer(influencer.id)}
                      sx={{ mb: 1 }}
                    />
                  ))
                )}
              </Stack>
              <Typography variant="subtitle1" gutterBottom>
                Select Audio :
              </Typography>
              {/* Audio File Input */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  name="audioFile"
                  type="file"
                  onChange={handleFileChange}
                  inputProps={{ accept: ".mp3, .wav" }}
                  sx={{ mb: 3 }}
                />
              </Box>
              <Typography variant="subtitle1" gutterBottom>
                Select Video :
              </Typography>
              {/* Video File Input */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  name="videoFile"
                  type="file"
                  onChange={handleFileChange}
                  inputProps={{ accept: "video/mp4, video/avi, video/mov" }}
                  sx={{ mb: 3 }}
                />
              </Box>
              <Typography variant="subtitle1" gutterBottom>
                Select Photos :
              </Typography>
              {/* Photo Input */}
              <Box sx={{ mb: 3 }}>
                <input
                  type="file"
                  name="photos"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
                <Box sx={{ mt: 2 }}>
                  {formData.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(photo)}
                      alt={`photo-${index}`}
                      style={{
                        width: "80px",
                        height: "80px",
                        marginRight: "8px",
                        borderRadius: "8px",
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <StyledButton
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={
                  !formData.brandName ||
                  !formData.campaignUrl ||
                  !formData.campaignName ||
                  !formData.collaborationId ||
                  !formData.campaignDescription ||
                  selectedInfluencers.length === 0 ||
                  !formData.audioFile ||
                  !formData.videoFile ||
                  formData.photos.length === 0
                }
              >
                Submit Campaign
              </StyledButton>
            </form>

            {submitted && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Campaign submitted successfully!
              </Alert>
            )}
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderCreator;
