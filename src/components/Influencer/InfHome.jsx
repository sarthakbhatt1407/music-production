import React from "react";
import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  useTheme,
  CircularProgress,
  Paper,
  Button,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  FiShoppingCart,
  FiCheckCircle,
  FiClock,
  FiRefreshCw,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import { BiRupee } from "react-icons/bi";
import { useSelector } from "react-redux";
import MusicLoader from "../Loader/MusicLoader";

const StyledCard = styled(Card)(({ theme, color }) => ({
  padding: "28px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s ease-in-out",
  borderRadius: "12px",
  position: "relative",
  overflow: "hidden",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
    zIndex: -1,
  },
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
  },
  backgroundColor: color,
  color: "#fff",
}));

const IconWrapper = styled(Box)({
  fontSize: "3rem",
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255,255,255,0.1)",
  borderRadius: "50%",
  padding: "16px",
  width: "70px",
  height: "70px",
});

const MetricCard = ({
  title,
  value,
  icon: Icon,
  color,
  trend,
  loading,
  error,
}) => {
  if (loading)
    return (
      <Paper
        sx={{
          p: 3,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Paper>
    );

  if (error)
    return (
      <Paper
        sx={{
          p: 3,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Paper>
    );

  return (
    <StyledCard color={color}>
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 500, opacity: 0.9 }}
      >
        {title}
      </Typography>
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        {value}
      </Typography>
      {/* {trend && (
        <Typography
          variant="body2"
          sx={{
            mt: "auto",
            pt: 2,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% from last month
        </Typography>
      )} */}
    </StyledCard>
  );
};

const InfHome = () => {
  const theme = useTheme();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.userId);
  const [user, setUser] = useState(null);
  const updatePayment = async (paymentOrderId) => {
    setLoading(true);
    const resPay = await fetch(
      `${process.env.REACT_APP_BASE_URL}/payment/payment-verifier-inf/${paymentOrderId}`
    );
    const dataPay = await resPay.json();
    console.log(dataPay);
    if (dataPay.paymentStatus == "completed") {
      fetchUserProfile();
    }
    setLoading(true);
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

  const updatePaymentOrderId = async (id, paymentOrderId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/update-payment-id`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, paymentOrderId }),
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
          amount: 999,
          currency: "INR",
        }),
      }
    );

    const data = await orderRes.json();
    console.log(data);

    if (!data || !data.order_id) {
      alert("Failed to create order. Please try again.");
      return;
    }
    updatePaymentOrderId(userId, data.order_id);

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
          `${process.env.REACT_APP_BASE_URL}/payment/payment-verifier-inf/${response.razorpay_order_id}`
        );
        const data = await res.json();
        console.log(data);
        fetchUserProfile();

        setLoading(false);
      },

      theme: {
        color: "#32a86d",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const fetchUserProfile = async () => {
    setUser(null);
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
        setUser(data.user);
        if (
          data.user.paymentOrderId.length > 0 &&
          data.user.paymentStatus == "pending"
        ) {
          updatePayment(data.user.paymentOrderId);
        }
      } else {
        throw new Error(data.message || "Failed to fetch user profile.");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getInfHomeData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/brand/get-inf-home-data`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: userId }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch brand home data.");
        }
        console.log(data);
        setMetrics({ ...data });
      } catch (error) {}
      setLoading(false);
    };
    fetchUserProfile();
    getInfHomeData();
  }, [userId]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 1,
        maxHeight: "88svh",

        overflow: "scroll",
      }}
    >
      {loading && <MusicLoader />}
      <Typography variant="h5" gutterBottom sx={{ mb: 2, textAlign: "start" }}>
        Dashboard
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
            title: "Home",
          },
        ]}
      />

      {user && user.paymentStatus != "completed" && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Your payment is pending. Please complete the payment to access your
          orders. If you have already paid, please wait for 10 minutes for the
          payment to be processed.
          <Button
            variant="contained"
            color="primary"
            onClick={displayRazorpayPaymentSdk}
            sx={{ ml: 2 }}
          >
            Pay Now
          </Button>
        </Alert>
      )}
      {user &&
        user.paymentStatus == "completed" &&
        user.legalDoc.length < 2 && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Your profile is currently under review by the admin team. Please
            check after some time.
          </Alert>
        )}

      {user &&
        user.paymentStatus == "completed" &&
        user.legalDoc.length > 1 && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <MetricCard
                title="Total Orders"
                value={metrics?.totalOrders}
                icon={FiShoppingCart}
                color={theme.palette.primary.main}
                loading={loading}
                error={error}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <MetricCard
                title="Completed Orders"
                value={metrics?.completedOrders}
                icon={FiCheckCircle}
                color={theme.palette.success.main}
                loading={loading}
                error={error}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <MetricCard
                title="Pending Orders"
                value={metrics?.pendingOrders}
                icon={FiClock}
                color={theme.palette.warning.main}
                loading={loading}
                error={error}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <MetricCard
                title="In-Process Orders"
                value={metrics?.inProcess}
                icon={FiRefreshCw}
                color={theme.palette.info.main}
                loading={loading}
                error={error}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <MetricCard
                title="Total Earned"
                value={metrics ? formatCurrency(metrics.paidOrders) : null}
                icon={BiRupee}
                color={theme.palette.secondary.main}
                loading={loading}
                error={error}
              />
            </Grid>
          </Grid>
        )}
    </Container>
  );
};

export default InfHome;
