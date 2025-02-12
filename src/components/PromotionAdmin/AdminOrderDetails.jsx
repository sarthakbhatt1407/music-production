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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FaUserCheck, FaSearch } from "react-icons/fa";
import { styled } from "@mui/system";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import moment from "moment";
import { useNavigate, useParams } from "react-router";
import MusicLoader from "../Loader/MusicLoader";
import { Divider, message, Popconfirm } from "antd";
import { DeleteOutline, LinkOutlined } from "@mui/icons-material";
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
const StyledButton = styled(Button)(({ theme }) => ({
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const AdminOrderDetails = () => {
  const id = useParams().id;
  const theme = useTheme();
  const [selectedInfluencers, setSelectedInfluencers] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [order, setOrder] = useState(null);
  const [selInfluencers, setSelInf] = useState([]);
  const [loading, setLoading] = useState(false);
  const [influencers, setInfluencers] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openInfModal, setOpenInfModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [remark, setRemark] = useState("");
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
  const handleCloseRejectModal = () => {
    setOpenRejectModal(false);
  };
  const handleConfirmReject = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/brand/reject-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId: id, remark }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to reject order.");
      }

      const data = await response.json();
      console.log(data);

      setOrder(null);
      fetchOrderById();

      setOpenRejectModal(false);
    } catch (error) {
      console.error("Error rejecting order:", error);
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
      console.log(dataOrder);

      setOrder(data);
      if (dataOrder.infOrders) {
        const selectedIndOrders = dataOrder.infOrders.map((ord) => {
          const findObj = data.selectedInfluencers.find((item) => {
            return ord.infId == item.id;
          });
          console.log(findObj);

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

      const uniqueUsers = data.users.filter((user) => {
        return !order.selectedInfluencers.some((inf) => inf.id === user.id);
      });

      setInfluencers(uniqueUsers);
    } catch (err) {
    } finally {
    }
    setLoading(false);
  };
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

  const handleOpenPaymentModal = () => {
    setOpenPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setOpenPaymentModal(false);
  };
  const handleReject = () => {
    setOpenRejectModal(true);
  };

  const handleConfirmPayment = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/brand/update-payment-amount`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId: id, paymentAmount }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update payment amount.");
      }

      console.log("Order updated successfully:", data.order);
      message.success("Payment amount updated successfully.");
      fetchOrderById();
    } catch (error) {
      console.error("Error updating order payment amount:", error);
      message.error(error.message || "Failed to update payment amount.");
      throw error;
    }
    setLoading(true);
    setOpenPaymentModal(false);
  };
  const deleteInfFromOrder = async (orderId, infId) => {
    console.log(orderId, infId);

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/brand/delete-inf-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId, infId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete influencer from order."
        );
      }

      message.success("Influencer deleted from order successfully.");
      console.log(data);
      fetchOrderById();
    } catch (error) {
      console.error("Error deleting influencer from order:", error);
      message.error("Error deleting influencer from order.");
      throw error;
    }
    setLoading(false);
  };
  const navigate = useNavigate();

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
      navigate("/admin-admin-panel/orders");
      // Optionally, you can refresh the order list or redirect the user
    } catch (error) {
      console.error("Error deleting order:", error);
      message.error("Error deleting order.");
    }
    setLoading(false);
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

              {order.paymentAmount < 1 && order.status != "rejected" && (
                <>
                  {" "}
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    style={{
                      margin: "1rem 0 ",
                    }}
                  >
                    Influencers Amount: ₹ {order.influencersAmount}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenPaymentModal}
                    sx={{
                      fontWeight: 700,
                      fontSize: "17px",
                      padding: "5px 10px",
                      textTransform: "capitalize",
                    }}
                  >
                    Add Payment Amount
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleReject}
                    sx={{
                      fontWeight: 700,
                      fontSize: "17px",
                      padding: "5px 10px",
                      textTransform: "capitalize",
                      marginLeft: "15px",
                    }}
                  >
                    Reject
                  </Button>
                </>
              )}
              {order.paymentAmount > 0 && (
                <>
                  {" "}
                  <Typography variant="body1" color="text.secondary" style={{}}>
                    Influencers Amount: ₹ {order.influencersAmount}
                  </Typography>
                  <Typography variant="h6">
                    Order Amount: ₹ {order.paymentAmount}
                  </Typography>
                </>
              )}
            </Paper>
          </Grid>
          {order && order.status != "pending" && order.status != "rejected" && (
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Influencer Details
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      fetchUsers();
                      setOpenInfModal(true);
                    }}
                    sx={{
                      fontWeight: 700,
                      fontSize: "17px",
                      padding: "5px 10px",
                      textTransform: "capitalize",
                    }}
                  >
                    Add Influencers
                  </Button>
                </Box>
                <TableContainer
                  sx={{ height: "auto", maxHeight: "100svh", overflow: "auto" }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Influencer</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Social Media </TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Preview</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedInfluencers &&
                        selInfluencers.map((influencer) => (
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
                                  <Link
                                    to={influencer.workLink}
                                    target="_blank"
                                  >
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
                            <TableCell>
                              <Popconfirm
                                title="Are you sure you want to delete this influencer?"
                                onConfirm={() =>
                                  deleteInfFromOrder(id, influencer.id)
                                }
                                okText="Yes"
                                cancelText="No"
                              >
                                <Button>
                                  <DeleteOutline />
                                </Button>
                              </Popconfirm>
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
        </Grid>
      )}

      <Dialog open={openPaymentModal} onClose={handleClosePaymentModal}>
        <DialogTitle>Add Payment Amount</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the payment amount for this order.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Payment Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePaymentModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmPayment} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openInfModal}
        onClose={() => {
          setOpenInfModal(false);
        }}
      >
        <DialogTitle>Select Influencers</DialogTitle>
        <DialogContent>
          <TableContainer
            sx={{
              height: "auto",
              maxHeight: "80svh",
              overflow: "auto",
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
              <TableBody>
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
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenInfModal(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              console.log(selectedInfluencers);
              setLoading(true);
              try {
                const response = await fetch(
                  `${process.env.REACT_APP_BASE_URL}/brand/add-inf-order`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ orderId: id, selectedInfluencers }),
                  }
                );

                const data = await response.json();

                if (!response.ok) {
                  throw new Error(
                    data.message || "Failed to add influencers to order."
                  );
                }

                message.success("Influencers added to order successfully.");
              } catch (error) {
                message.error("Error adding influencers to order.");
              }
              setOpenInfModal(false);
              setLoading(false);
              fetchOrderById();
            }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

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
    </Container>
  );
};

export default AdminOrderDetails;
