import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";
import { FiEdit2, FiUpload } from "react-icons/fi";
import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import MusicLoader from "../Loader/MusicLoader";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  margin: "0 auto",
  cursor: "pointer",
  transition: "opacity 0.3s",
  "& img": {
    objectFit: "contain",
  },
  "&:hover": {
    opacity: 0.7,
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const InfProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    profileImage: "",
    userSince: "",
    role: "",
    socialMediaUrl: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    profession: "",
    price: "", // Add price field
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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", userId);
      formDataToSend.append("name", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("fullAddress", formData.address);
      formDataToSend.append("pinCode", formData.postalCode);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("state", formData.state);

      formDataToSend.append("socialMediaUrl", formData.socialMediaUrl);
      formDataToSend.append("accountNumber", formData.accountNumber);
      formDataToSend.append("ifscCode", formData.ifscCode);
      formDataToSend.append("bankName", formData.bankName);
      formDataToSend.append("profession", formData.profession);
      formDataToSend.append("price", formData.price); // Include price field
      if (previewImage) {
        const fileInput = document.getElementById("image-upload");
        const file = fileInput.files[0];
        formDataToSend.append("userPic", file);
      }

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/user/editInfUser`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok && data.success) {
        setFormData((prev) => ({
          ...prev,
          profileImage: previewImage || formData.profileImage,
        }));
        setEditMode(false);
      } else {
        throw new Error(data.message || "Failed to update user profile.");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      setFormError("Error updating user profile");
    } finally {
      setLoading(false);
    }
  };

  const userId = useSelector((state) => state.userId);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/user/get-user-inf`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userId }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok && data.status) {
        setLoading(false);
        const user = data.user;
        setFormData({
          fullName: user.name,
          email: user.email,
          phone: user.contactNum,
          address: user.fullAddress,
          city: user.city || "",
          state: user.state || "",
          postalCode: user.pinCode,
          profileImage: user.profileImage,
          userSince: user.userSince || "",
          role: user.userType || "",
          socialMediaUrl: user.socialMediaUrl || "",
          accountNumber: user.accountNumber || "",
          ifscCode: user.ifscCode || "",
          bankName: user.bankName || "",
          profession: user.profession || "",
          price: user.price || "", // Set price field
        });
      } else {
        throw new Error(data.message || "Failed to fetch user profile.");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  return (
    <Container maxWidth="xl" sx={{ height: "88vh", overflow: "scroll" }}>
      {loading && <MusicLoader />}
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
                src={
                  previewImage ||
                  `${process.env.REACT_APP_BASE_URL}/${formData.profileImage}`
                }
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
                disabled={true}
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
              <TextField
                fullWidth
                label="State"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                disabled={!editMode}
              />
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
                label="Social Media URL"
                value={formData.socialMediaUrl}
                onChange={(e) =>
                  handleInputChange("socialMediaUrl", e.target.value)
                }
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Account Number"
                value={formData.accountNumber}
                onChange={(e) =>
                  handleInputChange("accountNumber", e.target.value)
                }
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="IFSC Code"
                value={formData.ifscCode}
                onChange={(e) => handleInputChange("ifscCode", e.target.value)}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bank Name"
                value={formData.bankName}
                onChange={(e) => handleInputChange("bankName", e.target.value)}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="profession-label">Profession</InputLabel>
                <Select
                  labelId="profession-label"
                  id="profession"
                  value={formData.profession}
                  onChange={(e) =>
                    handleInputChange("profession", e.target.value)
                  }
                  disabled={!editMode}
                >
                  <MenuItem value="Model">Model</MenuItem>
                  <MenuItem value="Creator">Creator</MenuItem>
                  <MenuItem value="Non-Creator">Non-Creator</MenuItem>
                  <MenuItem value="Neno-Creator">Neno-Creator</MenuItem>
                  <MenuItem value="Singer">Singer</MenuItem>
                  <MenuItem value="Actor">Actor</MenuItem>
                  <MenuItem value="Music Director">Music Director</MenuItem>
                  <MenuItem value="Lyricist">Lyricist</MenuItem>
                  <MenuItem value="Comedian">Comedian</MenuItem>
                  <MenuItem value="Editor">Editor</MenuItem>
                  <MenuItem value="Cinematographer">Cinematographer</MenuItem>
                  <MenuItem value="Poster Designer">Poster Designer</MenuItem>
                  <MenuItem value="Script Writer">Script Writer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                disabled={!editMode}
                type="number"
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

export default InfProfilePage;
