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
import { useNavigate, useParams } from "react-router";
import MusicLoader from "../Loader/MusicLoader";
import { Divider, message, Popconfirm } from "antd";
import { DeleteOutline, Done, LinkOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

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
  const navigate = useNavigate();
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
  const handleCompleteOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/brand/complete-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId: id, action: "completed" }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to complete order.");
      }

      message.success(" Order completed successfully.");
      fetchOrderById();
      // Optionally, you can refresh the order list or redirect the user
    } catch (error) {
      message.error(" Error completing order.");
    }
    setLoading(false);
  };
  const handleDeleteOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/brand/delete-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId: id }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete order.");
      }

      message.success("Order deleted successfully.");
      navigate("/promotor-admin-panel/order-history");
      // Optionally, you can refresh the order list or redirect the user
    } catch (error) {
      console.error("Error deleting order:", error);
      message.error("Error deleting order.");
    }
    setLoading(false);
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
              remark: ord.remark,
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

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "in process":
        return "info";
      case "completed":
        return "success";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };
  const steps = ["Pending", "In Process", "Completed"];

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
    setLoading(true);
    const orderRes = await fetch(
      `${process.env.REACT_APP_BASE_URL}/payment/create-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: order.paymentAmount,
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

    setLoading(false);
    var options = {
      key: "rzp_test_gXfTe6otLGAN8Y", // Replace with your Razorpay test/live key
      amount: data.amount, // Amount from backend response
      currency: data.currency, // INR
      order_id: data.order_id, // ✅ Adding order ID here

      handler: async function (response) {
        setLoading(true);
        console.log("Payment Success:", response);

        // Send the payment details to your server for verification and capturing
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/payment/payment-verifier/${response.razorpay_order_id}`
        );
        const data = await res.json();
        console.log(data);

        if (data.paymentStatus == "completed") {
          fetchOrderById();
        } else {
          message.success(
            "Payment successfully completed. If payment is not updated kindly wait for a while."
          );
        }
        setLoading(false);
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
          {order.images.length > 2 && (
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
          )}
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
                </Typography>{" "}
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  style={{
                    display: "flex",
                    gap: "1rem",
                  }}
                >
                  Campaign Url:{" "}
                  <Link to={order.campaignUrl} target="_blank">
                    <LinkOutlined />
                  </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Collaboration ID: {order.collaborationId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description: {order.campaignDescription}
                </Typography>
                {/* Audio Section */}
                {order.audio.length > 2 && (
                  <>
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
                  </>
                )}
                {/* Video Section */}
                {order.video.length > 2 && (
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
                )}
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
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                Campaign Status{" "}
                {order.status == "rejected" && (
                  <Typography variant="h5" fontWeight="bold" color="red">
                    : Rejected
                  </Typography>
                )}
              </Typography>

              {order.status == "rejected" && (
                <Typography variant="subtitle1">
                  Remark: {order.remark}
                </Typography>
              )}
              {order.status != "rejected" && (
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
              )}
              {order.paymentStatus != "completed" &&
                order.paymentAmount != 0 && (
                  <>
                    <Typography variant="h6" gutterBottom color="#333">
                      Amount: ₹ {order.paymentAmount}
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
                        marginBottom: "1rem",
                        "&:hover": {
                          backgroundColor: "#574dcf",
                        },
                      }}
                    >
                      Pay Now
                    </Button>
                    <Typography variant="body2" color="#d65757">
                      (If paid, wait for a while to get the payment status
                      updated or refresh the page)
                    </Typography>
                  </>
                )}
              {order.paymentStatus != "completed" &&
                order.status != "rejected" &&
                order.paymentAmount == 0 && (
                  <>
                    <Typography variant="body1" gutterBottom color="#333">
                      Your order is currently under review by our admin team. We
                      appreciate your patience.
                    </Typography>
                  </>
                )}
            </Paper>
          </Grid>
          {order.status != "pending" && order.status != "rejected" && (
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
                        <TableCell>Category</TableCell>
                        <TableCell>Social Media </TableCell>
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
                          <TableCell>
                            <Link
                              to={influencer.socialMediaUrl}
                              target="_blank"
                            >
                              <LinkOutlined />
                            </Link>
                          </TableCell>
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
                            {influencer.status != "rejected" &&
                              (influencer.workLink.length > 0 ? (
                                <Link to={influencer.workLink} target="_blank">
                                  <LinkOutlined />
                                </Link>
                              ) : (
                                "-"
                              ))}
                            {influencer.status == "rejected" && (
                              <p
                                style={{
                                  textTransform: "capitalize",
                                }}
                              >
                                Remark : {influencer.remark}
                              </p>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          )}

          {(order.status == "pending" || order.status == "rejected") && (
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
                        <TableCell>Category</TableCell>
                        <TableCell>Social Media </TableCell>
                        <TableCell>Amount </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.selectedInfluencers.map((influencer) => (
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
                          <TableCell>
                            <Link
                              to={influencer.socialMediaUrl}
                              target="_blank"
                            >
                              <LinkOutlined />
                            </Link>
                          </TableCell>
                          <TableCell>₹ {influencer.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          )}
          {(order.status == "pending" || order.status == "rejected") && (
            <Popconfirm
              title="Are you sure you want to delete this order?"
              onConfirm={() => handleDeleteOrder()}
              okText="Yes"
              cancelText="No"
            >
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  width: "fit-content",
                  margin: "2rem auto",
                  borderRadius: "2rem",
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
            </Popconfirm>
          )}
          {order.status == "in process" && (
            <Popconfirm
              title="Are you sure you want to mark this order as completed?"
              onConfirm={() => handleCompleteOrder()}
              okText="Yes"
              cancelText="No"
            >
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  width: "fit-content",
                  margin: "2rem auto",
                  borderRadius: "2rem",
                  display: "block",
                  backgroundColor: "white",
                  color: "black",
                  fontWeight: 500,
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
                <Done /> Mark as Completed
              </Button>
            </Popconfirm>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default OrderDetailsPage;
