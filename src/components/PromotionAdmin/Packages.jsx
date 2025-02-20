import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Tooltip,
  styled,
  Container,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import { FaCheck, FaTimes, FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LinkOutlined } from "@mui/icons-material";
import { message } from "antd";
import MusicLoader from "../Loader/MusicLoader";

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

// const packages = [
//   {
//     id: 1,
//     name: "Basic",
//     originalPrice: 29.99,
//     discountedPrice: 24.99,
//     discountPercentage: 17,
//     description: "Perfect for individuals and small projects",
//     features: [
//       { name: "5 Projects", included: true },
//       { name: "Basic Analytics", included: true },
//       { name: "24/7 Support", included: false },
//       { name: "Custom Domain", included: false },
//     ],
//   },
//   {
//     id: 2,
//     name: "Standard",
//     originalPrice: 49.99,
//     discountedPrice: 39.99,
//     discountPercentage: 20,
//     description: "Ideal for growing businesses",
//     features: [
//       { name: "15 Projects", included: true },
//       { name: "Advanced Analytics", included: true },
//       { name: "24/7 Support", included: true },
//       { name: "Custom Domain", included: false },
//     ],
//   },
//   {
//     id: 3,
//     name: "Premium",
//     originalPrice: 79.99,
//     discountedPrice: 59.99,
//     discountPercentage: 25,
//     description: "Best for professional teams",
//     features: [
//       { name: "Unlimited Projects", included: true },
//       { name: "Premium Analytics", included: true },
//       { name: "24/7 Priority Support", included: true },
//       { name: "Custom Domain", included: true },
//     ],
//   },
//   {
//     id: 4,
//     name: "Deluxe",
//     originalPrice: 149.99,
//     discountedPrice: 119.99,
//     discountPercentage: 20,
//     description: "Custom solutions for large organizations",
//     features: [
//       { name: "Unlimited Everything", included: true },
//       { name: "Enterprise Analytics", included: true },
//       { name: "Dedicated Support Team", included: true },
//       { name: "Multiple Domains", included: true },
//     ],
//   },
// ];

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [packages, setPackages] = useState([]);
  const [selectedInfluencers, setSelectedInfluencers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    discountedPrice: "",
    originalPrice: "",
    type: "",
  });
  const theme = useTheme();
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
  const filteredInfluencers = influencers.filter(
    (influencer) =>
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
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

      setInfluencers(data.users);
    } catch (err) {
    } finally {
    }
    setLoading(false);
  };

  const handlePackageSelect = (packageId) => {
    setSelectedPackage(packageId);
  };

  const handleContinue = () => {
    setDialogOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (selectedInfluencers.length === 0) {
      message.error("Please select at least one influencer");
      return;
    }
    if (
      !formData.name ||
      !formData.description ||
      !formData.discountedPrice ||
      !formData.originalPrice ||
      !formData.type
    ) {
      message.error("Please fill all the fields");
      return;
    }
    if (Number(formData.discountedPrice) > Number(formData.originalPrice)) {
      message.error("Discounted price should be less than original price");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/brand/add-package`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            selectedInf: selectedInfluencers,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add new package.");
      }

      setDialogOpen(false);
      setFormData({
        name: "",
        description: "",
        discountedPrice: "",
        originalPrice: "",
        type: "",
      });
      setSelectedInfluencers([]);
      getAllPackages();
      message.success(data.message);
    } catch (error) {
      console.error("Error adding new package:", error);
      message.error("Error adding new package.");
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

  useEffect(() => {
    fetchUsers();
    getAllPackages();
  }, []);
  return (
    <Box
      sx={{
        backgroundColor: "#f8f9fa",
        height: "88vh",
        py: 8,
        overflow: "scroll",
      }}
    >
      <Container maxWidth="xl">
        {loading && <MusicLoader />}
        <Typography
          variant="h2"
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
          variant="h5"
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

        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleContinue}
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              "&:hover": {
                boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
              },
            }}
          >
            Add new package
          </Button>
        </Box>
      </Container>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add New Package</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details for the new package.
          </DialogContentText>
          <div
            style={{
              height: "fit-content",
              maxHeight: "40vh",

              overflow: "scroll",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Influencer</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Social Media </TableCell>
                  <TableCell>Amount </TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{}}>
                {filteredInfluencers.map((influencer) => (
                  <TableRow key={influencer.id}>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
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
                    <TableCell align="center">
                      <Link to={influencer.socialMediaUrl} target="_blank">
                        <LinkOutlined />
                      </Link>
                    </TableCell>
                    <TableCell align="center">₹ {influencer.price}</TableCell>
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
                        {selectedInfluencers.some((i) => i.id === influencer.id)
                          ? "Selected"
                          : "Select"}
                      </StyledButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={formData.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="originalPrice"
            label="Original Price"
            type="number"
            fullWidth
            value={formData.originalPrice}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="discountedPrice"
            label="Discounted Price"
            type="number"
            fullWidth
            value={formData.discountedPrice}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="type"
            label="Type"
            select
            fullWidth
            value={formData.type}
            onChange={handleInputChange}
          >
            <MenuItem value="Basic">Basic</MenuItem>
            <MenuItem value="Standard">Standard</MenuItem>
            <MenuItem value="Premium">Premium</MenuItem>
            <MenuItem value="Deluxe">Deluxe</MenuItem>
            <MenuItem value="BasicPlus">Basic Plus</MenuItem>
            <MenuItem value="StandardPlus">Standard Plus</MenuItem>
            <MenuItem value="Premium Plus">Premium Plus</MenuItem>
            <MenuItem value="Deluxe Plus">Deluxe Plus</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Packages;
