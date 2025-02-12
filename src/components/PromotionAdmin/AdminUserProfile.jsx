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
  Switch,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/system";
import { FiEdit2, FiUpload } from "react-icons/fi";
import { Breadcrumb, message, Popconfirm } from "antd";
import { useSelector } from "react-redux";
import MusicLoader from "../Loader/MusicLoader";
import { useNavigate, useParams } from "react-router";

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

const AdminUserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [formError, setFormError] = useState("");
  const [userStatus, setUserStatus] = useState(true); // Add user status state
  const [otp, setOtp] = useState("");
  const [otpToVer, setOtpToVer] = useState("");
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const id = useParams().id;
  const page = useParams().page;

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
    status: "",
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

  const handleStatusChange = async (event) => {
    const newStatus = event.target.checked;
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/user/update-status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            status: newStatus ? "active" : "closed",
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update user status.");
      }
      fetchUserProfile();
    } catch (error) {
      console.error("Error updating user status:", error);
      setFormError("Error updating user status");
    }
    setLoading(false);
  };

  const userId = useSelector((state) => state.userId);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      let response;
      if (page === "influencer") {
        response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/inf/user/get-user-inf`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
          }
        );
      } else {
        response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/inf/user/get-user-pro`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
          }
        );
      }

      const data = await response.json();

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
          status: user.status,
        });
        setUserStatus(user.status === "active" ? true : false); // Set user status
      } else {
        throw new Error(data.message || "Failed to fetch user profile.");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/user/delete-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to delete user.");
      }

      message.success("User deleted successfully.");
      navigate("/admin-admin-panel/users");
      // Optionally, you can navigate to another page or refresh the list
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Error deleting user.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    // Replace this with your OTP verification logic
    if (otp == otpToVer) {
      setOtpDialogOpen(false);
      handleDeleteUser();
    } else {
      message.error("Invalid OTP");
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      message.error("Please select a file.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("userId", id);
    formDataToSend.append("doc", selectedFile);

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/user/legal-doc`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to upload document.");
      }

      message.success("Document uploaded successfully.");
      fetchUserProfile();
      setUploadDialogOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading document:", error);
      message.error("Error uploading document.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

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
            <FormControlLabel
              control={
                <Switch
                  checked={userStatus}
                  onChange={handleStatusChange}
                  color="primary"
                />
              }
              label={userStatus ? "User : Active" : "User : Inactive"}
            />
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

            {page === "influencer" && (
              <>
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
                    onChange={(e) =>
                      handleInputChange("ifscCode", e.target.value)
                    }
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Bank Name"
                    value={formData.bankName}
                    onChange={(e) =>
                      handleInputChange("bankName", e.target.value)
                    }
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
                      <MenuItem value="Cinematographer">
                        Cinematographer
                      </MenuItem>
                      <MenuItem value="Poster Designer">
                        Poster Designer
                      </MenuItem>
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
              </>
            )}
          </Grid>
          <Box sx={{ mt: 3, textAlign: "right" }}>
            <Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={async () => {
                setLoading(true);
                try {
                  const response = await fetch(
                    `${process.env.REACT_APP_BASE_URL}/inf/user/send-otp-for-delete`
                  );

                  const data = await response.json();
                  console.log(data);

                  if (!response.ok) {
                    throw new Error(data.message || "Failed to send OTP.");
                  }

                  message.success("OTP sent successfully.");
                  setOtpToVer(data.otp);
                } catch (error) {
                  console.error("Error sending OTP:", error);
                  message.error("Error sending OTP.");
                  throw error;
                }
                setLoading(false);
                setOtpDialogOpen(true);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Delete Profile"}
              </Button>
            </Popconfirm>
            {page === "influencer" &&
              formData.status == "for admin approval" && (
                <Button
                  variant="contained"
                  disabled={loading}
                  style={{
                    marginLeft: "1rem",
                  }}
                  onClick={() => setUploadDialogOpen(true)}
                >
                  {loading ? <CircularProgress size={24} /> : "Upload document"}
                </Button>
              )}
            {page === "influencer" &&
              (formData.status == "active" || formData.status == "closed") && (
                <Button
                  variant="contained"
                  disabled={loading}
                  style={{
                    marginLeft: "1rem",
                  }}
                  onClick={() => setUploadDialogOpen(true)}
                >
                  {loading ? <CircularProgress size={24} /> : "Update document"}
                </Button>
              )}
          </Box>
        </StyledPaper>
      </Box>

      <Dialog open={otpDialogOpen} onClose={() => setOtpDialogOpen(false)}>
        <DialogTitle>Enter OTP</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the OTP sent to your registered email to confirm the
            deletion.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="OTP"
            type="text"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOtpDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleOtpSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
      >
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please upload the required document in PDF format.
          </DialogContentText>
          <input
            accept="application/pdf"
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleFileUpload} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminUserProfile;
