import React, { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Paper,
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useParams } from "react-router";
import MusicLoader from "../Loader/MusicLoader";
import { Popconfirm } from "antd";
import { DeleteOutline } from "@mui/icons-material";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
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

const InfOrderDetailsPage = () => {
  const id = useParams().id;
  const [currentImage, setCurrentImage] = useState(0);
  const [order, setOrder] = useState(null);
  const [brandOrder, setBrandOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [openCompleteModal, setOpenCompleteModal] = useState(false);
  const [remark, setRemark] = useState("");
  const [link, setLink] = useState("");

  const fetchBrandOrderById = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/brand/get-order-by-id`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId: id }),
        }
      );

      if (!response.ok) {
        throw new Error("Order not found or an error occurred.");
      }

      const dataOrder = await response.json();
      const data = dataOrder.order;

      setBrandOrder(data);
      console.log(data);
    } catch (error) {
      console.log("Error fetching order:", error);
    }

    setLoading(false);
  };

  const fetchOrderById = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/get-order-by-id`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId: id }),
        }
      );

      if (!response.ok) {
        throw new Error("Order not found or an error occurred.");
      }

      const dataOrder = await response.json();
      const data = dataOrder.order;

      setOrder(data);
      fetchBrandOrderById(data.brandOrderId);
    } catch (error) {
      console.log("Error fetching order:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrderById();
  }, [id]);

  const handleNextImage = () => {
    if (order.images.split(",").length > 1) {
      setCurrentImage((prev) => (prev + 1) % order.images.split(",").length);
    }
  };

  const handlePrevImage = () => {
    if (order.images.split(",").length > 1) {
      setCurrentImage(
        (prev) =>
          (prev - 1 + order.images.split(",").length) %
          order.images.split(",").length
      );
    }
  };

  const handleAccept = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/edit-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId: id, action: "accept" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to accept order.");
      }

      const data = await response.json();
      console.log(data);
      setOrder(null);
      fetchOrderById();
      console.log("Order accepted:", data.order);
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleConfirmReject = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/edit-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId: id, action: "reject", remark }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to reject order.");
      }

      const data = await response.json();
      console.log(data);

      setOrder(null);
      fetchOrderById();
      console.log("Order rejected with remark:", data.order);
      setOpenRejectModal(false);
    } catch (error) {
      console.error("Error rejecting order:", error);
    }
  };

  const handleReject = () => {
    setOpenRejectModal(true);
  };

  const handleCloseRejectModal = () => {
    setOpenRejectModal(false);
  };

  const handleComplete = () => {
    setOpenCompleteModal(true);
  };

  const handleCloseCompleteModal = () => {
    setOpenCompleteModal(false);
  };

  const handleConfirmComplete = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/edit-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId: id, action: "completed", link }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order.");
      }

      const data = await response.json();
      console.log(data);

      setOrder(null);
      fetchOrderById();
      console.log(data.order);
      setOpenCompleteModal(false);
    } catch (error) {}
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 1, maxHeight: "88svh", overflow: "scroll" }}
    >
      {loading && <MusicLoader />}
      {order && brandOrder && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ImageSlider>
              <SliderImage
                src={`${process.env.REACT_APP_BASE_URL}/${
                  order.images.split(", ")[currentImage]
                }`}
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
                  Brand: {order.brandName}
                </Typography>
                <Typography variant="subtitle1">
                  Campaign: {order.campaignName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Collaboration ID: {brandOrder.collaborationId}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Description: {order.campaignDescription}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 4,
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                color="#333"
              >
                Campaign Files
              </Typography>

              {/* Audio Section */}
              <Typography
                variant="subtitle1"
                color="text.secondary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "1rem 0",
                  gap: "1rem",
                }}
              >
                Audio :
                <AudioPlayer
                  src={`${process.env.REACT_APP_BASE_URL}/${brandOrder.audio}`}
                  onPlay={(e) => console.log("onPlay")}
                  style={{ width: "80%", borderRadius: "8px" }}
                />
              </Typography>
              <Divider />
              {/* Video Section */}
              <Typography
                variant="subtitle1"
                color="text.secondary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "1rem 0",
                  gap: "1rem",
                }}
              >
                Video :
                <video
                  src={`${process.env.REACT_APP_BASE_URL}/${brandOrder.video}`}
                  controls
                  style={{
                    width: "80%",
                    borderRadius: "8px",
                    height: "10rem",
                    margin: "1rem 0 ",
                  }}
                />
              </Typography>
            </Paper>
          </Grid>

          {order.status === "pending" && (
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
                gap: 2,
                alignItems: "center",
                width: "100%",
                marginTop: "2rem",
                marginBottom: "1rem",
              }}
            >
              <Popconfirm
                title="Are you sure you want to accept this order?"
                onConfirm={handleAccept}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    fontWeight: 700,
                    fontSize: "17px",
                    padding: "5px 10px",
                    textTransform: "capitalize",
                    backgroundColor: "#4caf50",
                    "&:hover": {
                      backgroundColor: "#45a049",
                    },
                  }}
                >
                  Accept
                </Button>
              </Popconfirm>
              <Button
                variant="contained"
                color="error"
                onClick={handleReject}
                sx={{
                  fontWeight: 700,
                  fontSize: "17px",
                  padding: "5px 10px",
                  textTransform: "capitalize",
                }}
              >
                Reject
              </Button>
            </Box>
          )}

          {order.status === "in process" && (
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
                gap: 2,
                alignItems: "center",
                width: "100%",
                marginTop: "2rem",
                marginBottom: "1rem",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleComplete}
                sx={{
                  fontWeight: 700,
                  fontSize: "17px",
                  padding: "5px 10px",
                  textTransform: "capitalize",
                }}
              >
                Complete
              </Button>
            </Box>
          )}
        </Grid>
      )}

      <Dialog open={openRejectModal} onClose={handleCloseRejectModal}>
        <DialogTitle>Reject Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a remark for rejecting the order.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Remark"
            type="text"
            fullWidth
            variant="outlined"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRejectModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmReject} color="error">
            Reject
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openCompleteModal} onClose={handleCloseCompleteModal}>
        <DialogTitle>Complete Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide the link for completing the order.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Link"
            type="text"
            fullWidth
            variant="outlined"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCompleteModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmComplete} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InfOrderDetailsPage;
