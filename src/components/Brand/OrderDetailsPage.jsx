import React, { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
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
  Button,
  Chip,
} from "@mui/material";
import { styled } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import moment from "moment";
import { useParams } from "react-router";
import MusicLoader from "../Loader/MusicLoader";
import { Divider } from "antd";
import { DeleteOutline } from "@mui/icons-material";

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
  const id = useParams().id;
  const theme = useTheme();
  const [currentImage, setCurrentImage] = useState(0);
  const [order, setOrder] = useState(null);
  const [selInfluencers, setSelInf] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const updatePayment = async (paymentOrderId) => {
    const resPay = await fetch(
      `${process.env.REACT_APP_BASE_URL}/payment/payment-verifier/${paymentOrderId}`
    );
    const dataPay = await resPay.json();
    console.log(dataPay);
    if (dataPay.paymentStatus == "completed") {
      fetchOrderById();
    }
  };
  const fetchOrderById = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/brand/get-order-by-id`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId: id }), // Sending ID in the request body
        }
      );

      if (!response.ok) {
        throw new Error("Order not found or an error occurred.");
      }

      const dataOrder = await response.json();
      const data = dataOrder.order;

      setOrder(data);
      if (dataOrder.infOrders) {
        const selectedIndOrders = dataOrder.infOrders.map((ord) => {
          const findObj = data.selectedInfluencers.find((item) => {
            return ord.infId == item.id;
          });
          let obj;
          if (findObj) {
            obj = {
              ...findObj,
              workLink: ord.workLink,
              status: ord.status,
            };
          }
          if (obj) {
            return obj;
          }
        });
        console.log(selectedIndOrders);
        setSelInf(selectedIndOrders);
      }

      if (
        data.paymentOrderId.length > 0 &&
        (data.paymentStatus == "failed" || data.paymentStatus == "pending")
      ) {
        updatePayment(data.paymentOrderId);
      }

      if (data.status == "pending") {
        setActiveStep(0);
      } else if (data.status == "in process") {
        setActiveStep(1);
      } else {
        setActiveStep(2);
      }
    } catch (error) {
      console.log("Error fetching order:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrderById();
  }, [id]);
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

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "in process":
        return "info";
      case "completed":
        return "success";
      default:
        return "default";
    }
  };
  const steps = ["Pending", "In Process", "Completed"];

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
    if (order.images.split(",").length > 1) {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }
  };

  const handlePrevImage = () => {
    if (order.images.split(",").length > 1) {
      setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const updatePaymentOrderId = async (orderId, paymentOrderId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/brand/update-payment-id`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId, paymentOrderId }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to update payment order ID");
      }

      console.log("Payment Order ID updated successfully:", data);
      return data;
    } catch (error) {
      console.error("Error updating payment order ID:", error);
      return { error: error.message };
    }
  };

  const displayRazorpayPaymentSdk = async () => {
    const res = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert(
        "Razorpay SDK failed to load. Please check your internet connection."
      );
      return;
    }

    const orderRes = await fetch(
      `${process.env.REACT_APP_BASE_URL}/payment/create-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 20,
          currency: "INR",
        }),
      }
    );

    const data = await orderRes.json();
    console.log(data);

    updatePaymentOrderId(id, data.order_id);
    if (!data || !data.order_id) {
      alert("Failed to create order. Please try again.");
      return;
    }

    var options = {
      key: "rzp_test_gXfTe6otLGAN8Y", // Replace with your Razorpay test/live key
      amount: data.amount, // Amount from backend response
      currency: data.currency, // INR
      order_id: data.order_id, // ✅ Adding order ID here

      handler: async function (response) {
        console.log("Payment Success:", response);

        // Send the payment details to your server for verification and capturing
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/payment/payment-verifier/${response.razorpay_order_id}`
        );
        const data = await res.json();
        console.log(data);
        fetchOrderById();
        if (data.paymentStatus == "completed") {
        }
      },

      theme: {
        color: "#32a86d",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 1, maxHeight: "88svh", overflow: "scroll" }}
    >
      {loading && <MusicLoader />}
      {order && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ImageSlider>
              <SliderImage
                src={`${process.env.REACT_APP_BASE_URL}/${
                  order.images.split(",")[currentImage]
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
                <Typography variant="body2" color="text.secondary">
                  Collaboration ID: {order.collaborationId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description: {order.campaignDescription}
                </Typography>

                {/* Audio Section */}
                <Typography
                  variant="body2"
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
                    src={`${process.env.REACT_APP_BASE_URL}/${order.audio}`}
                    onPlay={(e) => console.log("onPlay")}
                    style={{ width: "80%", borderRadius: "8px" }}
                  />
                </Typography>
                <Divider />
                {/* Video Section */}
                <Typography
                  variant="body2"
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
                    src={`${process.env.REACT_APP_BASE_URL}/${order.video}`}
                    controls
                    style={{
                      width: "80%",
                      borderRadius: "8px",
                      height: "10rem",
                      margin: "1rem 0 ",
                    }}
                  />
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
                Campaign Status
              </Typography>

              <Stepper
                activeStep={activeStep}
                alternativeLabel
                sx={{ mt: 2, mb: 3 }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {order.paymentStatus != "completed" && (
                <>
                  <Typography variant="h6" gutterBottom color="#333">
                    Amount: ₹ 499
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={displayRazorpayPaymentSdk}
                    sx={{
                      mt: 2,
                      backgroundColor: "#1677FF",
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      padding: "10px 20px",
                      "&:hover": {
                        backgroundColor: "#574dcf",
                      },
                    }}
                  >
                    Pay Now
                  </Button>
                </>
              )}
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
                      <TableCell>Category</TableCell>{" "}
                      <TableCell>Status</TableCell>
                      <TableCell>Preview</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selInfluencers.map((influencer) => (
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

                        <TableCell>
                          <Chip
                            label={influencer.status
                              .replace("_", " ")
                              .toUpperCase()}
                            color={getStatusColor(influencer.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {influencer.workLink.length > 0
                            ? influencer.workLink
                            : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          {order.status == "pending" && (
            <Button
              variant="contained"
              sx={{
                mt: 2,
                width: "fit-content", // Corrected this to use string value
                margin: "2rem auto", // Corrected this to use string value
                borderRadius: "2rem", // Corrected syntax here
                display: "block",
                backgroundColor: "white",
                color: "black",
                fontWeight: 700,
                fontSize: "17px",
                padding: "10px 12px 10px",
                transition: "0.3s",
                border: "1px solid #d7d7d7",
                gap: ".5rem",
                textTransform: "capitalize",
                "&:hover": {
                  opacity: 0.9,
                  backgroundColor: "#1677ff",
                  color: "white",
                  border: "1px solid #1677ff",
                },
                display: "flex",
                alignItems: "center",
              }}
            >
              <DeleteOutline /> Delete
            </Button>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default OrderDetailsPage;
