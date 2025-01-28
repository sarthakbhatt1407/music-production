import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  Tooltip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import { FiEdit2, FiUpload } from "react-icons/fi";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { Breadcrumb } from "antd";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  margin: "0 auto",
  cursor: "pointer",
  transition: "opacity 0.3s",
  "&:hover": {
    opacity: 0.7,
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    dateOfBirth: "1990-01-01",
    address: "123 Main Street",
    city: "New York",
    country: "USA",
    postalCode: "10001",
    profileImage:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormError("File size should not exceed 5MB");
        return;
      }
      if (!file.type.match(/image\/(jpg|jpeg|png)/)) {
        setFormError("Only JPG, JPEG, and PNG files are allowed");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      if (previewImage) {
        setFormData((prev) => ({ ...prev, profileImage: previewImage }));
      }
      setEditMode(false);
      setLoading(false);
    }, 1500);
  };

  const countries = ["USA", "Canada", "UK", "Australia", "Germany", "France"];

  return (
    <Container maxWidth="xl" sx={{ height: "88vh", overflow: "scroll" }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 2, textAlign: "start" }}>
        Profile
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
            title: "Profile",
          },
        ]}
      />
      <Box sx={{ position: "relative" }}>
        <StyledPaper elevation={3}>
          <Box sx={{ position: "relative", mb: 4, textAlign: "center" }}>
            <input
              accept="image/*"
              type="file"
              id="image-upload"
              style={{ display: "none" }}
              onChange={handleImageUpload}
              disabled={!editMode}
            />
            <label htmlFor="image-upload">
              <StyledAvatar
                src={previewImage || formData.profileImage}
                alt={formData.fullName}
              />
              {editMode && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <FiUpload size={24} />
                </Box>
              )}
            </label>
          </Box>

          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          )}

          <Box sx={{ mb: 2, textAlign: "right" }}>
            <Button
              startIcon={editMode ? null : <FiEdit2 />}
              variant={editMode ? "contained" : "outlined"}
              onClick={() => setEditMode(!editMode)}
              color={editMode ? "error" : "primary"}
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  handleInputChange("dateOfBirth", e.target.value)
                }
                disabled={!editMode}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={3}
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  value={formData.country}
                  label="Country"
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  disabled={!editMode}
                >
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postal Code"
                value={formData.postalCode}
                onChange={(e) =>
                  handleInputChange("postalCode", e.target.value)
                }
                disabled={!editMode}
              />
            </Grid>
          </Grid>

          {editMode && (
            <Box sx={{ mt: 3, textAlign: "right" }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Save Changes"}
              </Button>
            </Box>
          )}
        </StyledPaper>
      </Box>
    </Container>
  );
};

export default ProfilePage;
