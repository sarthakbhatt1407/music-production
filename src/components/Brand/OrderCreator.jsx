import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Tooltip,
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
  CardContent,
  Stack,
  useTheme,
  Card,
  styled,
} from "@mui/material";
import { FaCheck } from "react-icons/fa";

import { FaUserCheck, FaSearch } from "react-icons/fa";
import { Breadcrumb, message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LinkOutlined, LinkSharp, LinkTwoTone } from "@mui/icons-material";
import MusicLoader from "../Loader/MusicLoader";
import { useSelector } from "react-redux";

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
const StyledCard = styled(Card)(({ theme, isSelected }) => ({
  height: "100%",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  position: "relative",
  backgroundColor: theme.palette.background.paper,
  border: isSelected
    ? `2px solid ${theme.palette.primary.main}`
    : "1px solid ${theme.palette.divider}",
  borderRadius: theme.shape.borderRadius * 2,
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
  },
}));
const OrderCreator = () => {
  const [loading, setLoading] = useState(false);
  const page = useParams().page;
  console.log(page);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const userid = useSelector((state) => state.userId);
  const [selectedInfluencers, setSelectedInfluencers] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    brandName: "",
    campaignName: "",
    collaborationId: "",
    campaignDescription: "",
    audioFile: "",
    videoFile: "null",
    photos: [],
    campaignUrl: "",
  });
  const theme = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [influencers, setInfluencers] = useState([]);

  const filteredInfluencers = influencers.filter(
    (influencer) =>
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.profession.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handlePackageSelect = (packageId) => {
    setSelectedPackage(packageId);
    const pkg = packages.find((pkg) => pkg.id === packageId);
    setSelectedInfluencers(pkg.selectedInf);
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
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/inf/user/get-all-inf`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setInfluencers(data.users);
      } catch (err) {
      } finally {
      }
      setLoading(false);
    };

    fetchUsers();
    getAllPackages();
  }, []);
  const handleRemoveInfluencer = (influencerId) => {
    setSelectedInfluencers((prev) => prev.filter((i) => i.id !== influencerId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("brandName", formData.brandName);
    formDataToSubmit.append("campaignName", formData.campaignName);
    formDataToSubmit.append("userId", userid);
    formDataToSubmit.append("campaignUrl", formData.campaignUrl);
    formDataToSubmit.append("collaborationId", formData.collaborationId);

    formDataToSubmit.append(
      "campaignDescription",
      formData.campaignDescription
    );
    formDataToSubmit.append("video", formData.videoFile);
    formDataToSubmit.append("file", formData.audioFile);

    formData.photos.forEach((photo, index) => {
      formDataToSubmit.append(`image`, photo);
    });

    if (page === "new-order-without-packages") {
      let idArr = selectedInfluencers.map((influencer) => influencer.id);
      const influencersAmount = selectedInfluencers.reduce(
        (acc, influencer) => {
          return acc + influencer.price;
        },
        0
      );

      // Append selected influencers
      formDataToSubmit.append(
        "selectedInfluencers",
        JSON.stringify(selectedInfluencers)
      );
      formDataToSubmit.append("infIdArr", JSON.stringify(idArr));

      formDataToSubmit.append("influencersAmount", influencersAmount);
    } else {
      const pkg = packages.find((pkg) => pkg.id === selectedPackage);
      let idArr = pkg.selectedInf.map((influencer) => influencer.id);
      const influencersAmount = pkg.selectedInf.reduce((acc, influencer) => {
        return acc + influencer.price;
      }, 0);

      // Append selected influencers
      formDataToSubmit.append(
        "selectedInfluencers",
        JSON.stringify(pkg.selectedInf)
      );
      formDataToSubmit.append("infIdArr", JSON.stringify(idArr));

      formDataToSubmit.append("influencersAmount", influencersAmount);
      formDataToSubmit.append("paymentAmount", pkg.discountedPrice);
    }

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
        navigate("/promotor-admin-panel/order-history");

        console.log(data); // Log the response data
      } else {
        throw new Error("Failed to submit campaign");
      }
    } catch (error) {
      // Show error message if submission fails
      message.error("Failed to submit the campaign. Please try again.");
      console.error(error);
    }
    setLoading(false);
  };
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
  return (
    <Container
      maxWidth="xl"
      sx={{ py: 1, maxHeight: "100%", overflow: "scroll" }}
    >
      {loading && <MusicLoader />}
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
      {page == "new-order-without-packages" && (
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
                      <TableCell>Category</TableCell>
                      <TableCell>State</TableCell>
                      <TableCell>Social Media </TableCell>

                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredInfluencers.map((influencer) => (
                      <TableRow key={influencer.id}>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <img
                              src={`${process.env.REACT_APP_BASE_URL}/${influencer.profileImage}`}
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
                        <TableCell>{influencer.profession}</TableCell>{" "}
                        <TableCell>{influencer.state}</TableCell>{" "}
                        <TableCell align="center">
                          <Link to={influencer.socialMediaUrl} target="_blank">
                            <LinkOutlined />
                          </Link>
                        </TableCell>
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
                    selectedInfluencers.length === 0
                    // !formData.audioFile ||
                    // !formData.videoFile ||
                    // formData.photos.length === 0
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
      )}
      {page == "new-order-with-packages" && (
        <Grid container spacing={4}>
          <Container maxWidth="xl">
            {loading && <MusicLoader />}
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
              }}
            >
              Packages
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              sx={{
                mb: 6,
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Add new packages to your platform
            </Typography>

            <Grid container spacing={4}>
              {packages.length > 0 &&
                packages.map((pkg) => (
                  <Grid item xs={12} sm={6} md={3} key={pkg.id}>
                    <StyledCard
                      isSelected={selectedPackage === pkg.id}
                      onClick={() => handlePackageSelect(pkg.id)}
                      tabIndex={0}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") handlePackageSelect(pkg.id);
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Typography
                          variant="h5"
                          gutterBottom
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                          }}
                        >
                          {pkg.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 3,
                            minHeight: 48,
                          }}
                        >
                          {pkg.description}
                        </Typography>
                        <Box sx={{ mb: 3 }}>
                          <Typography
                            variant="body1"
                            sx={{
                              textDecoration: "line-through",
                              color: "text.secondary",
                              fontSize: "0.9rem",
                            }}
                          >
                            ₹{pkg.originalPrice}/month
                          </Typography>
                          <Typography
                            variant="h5"
                            color="primary"
                            sx={{
                              fontWeight: 700,
                              my: 1,
                            }}
                          >
                            ₹{pkg.discountedPrice}
                          </Typography>
                          <Chip
                            label={`Save ${Number.parseInt(
                              (pkg.discountedPrice / pkg.originalPrice) * 100
                            )}%`}
                            color="primary"
                            size="small"
                            sx={{
                              borderRadius: 1,
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                        <Box sx={{ mt: 3 }}>
                          <Tooltip key={1} title={"Included"}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                my: 1.5,
                                opacity: 1,
                                transition: "opacity 0.3s ease",
                              }}
                            >
                              <FaCheck
                                style={{ color: theme.palette.success.main }}
                              />

                              <Typography sx={{ ml: 1.5, fontSize: "0.95rem" }}>
                                {pkg.selectedInf.length} Selected Influencers
                              </Typography>
                            </Box>
                          </Tooltip>
                        </Box>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))}
            </Grid>
          </Container>

          <Grid item xs={12} md={12}>
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

                {page == "new-order-without-packages" && (
                  <>
                    {" "}
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
                            onDelete={() =>
                              handleRemoveInfluencer(influencer.id)
                            }
                            sx={{ mb: 1 }}
                          />
                        ))
                      )}
                    </Stack>
                  </>
                )}

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
                    selectedInfluencers.length === 0
                    // !formData.audioFile ||
                    // !formData.videoFile ||
                    // formData.photos.length === 0
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
      )}
    </Container>
  );
};

export default OrderCreator;
