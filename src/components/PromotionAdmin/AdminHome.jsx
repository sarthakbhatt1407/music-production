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
} from "@mui/material";
import { styled } from "@mui/system";
import {
  FiShoppingCart,
  FiCheckCircle,
  FiClock,
  FiRefreshCw,
  FiUser,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import { BiRupee } from "react-icons/bi";
import { useSelector } from "react-redux";

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
    </StyledCard>
  );
};

const AdminHome = () => {
  const theme = useTheme();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.userId);

  const colors = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.secondary.main,
  ];

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledColors = shuffleArray([...colors]);

  useEffect(() => {
    const getInfHomeData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/brand/get-admin-home-data`,
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
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

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
      <Typography variant="h6" gutterBottom sx={{ mb: 2, textAlign: "start" }}>
        Orders
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          marginBottom: "1rem",
        }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard
            title="Total Orders"
            value={metrics?.totalOrders}
            icon={FiShoppingCart}
            color={shuffledColors[0]}
            loading={loading}
            error={error}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <MetricCard
            title="Completed Orders"
            value={metrics?.completedOrders}
            icon={FiCheckCircle}
            color={shuffledColors[1]}
            loading={loading}
            error={error}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <MetricCard
            title="Pending Orders"
            value={metrics?.pendingOrders}
            icon={FiClock}
            color={shuffledColors[2]}
            loading={loading}
            error={error}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <MetricCard
            title="In-Process Orders"
            value={metrics?.inProcess}
            icon={FiRefreshCw}
            color={shuffledColors[3]}
            loading={loading}
            error={error}
          />
        </Grid>
      </Grid>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, textAlign: "start" }}>
        Users
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          marginBottom: "1rem",
        }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard
            title="Total Users"
            value={metrics?.totalUsers}
            icon={FiUser}
            color={shuffledColors[4]}
            loading={loading}
            error={error}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <MetricCard
            title="Promoters"
            value={metrics?.totalBrandUsers}
            icon={FiUser}
            color={shuffledColors[0]}
            loading={loading}
            error={error}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard
            title="Influencers"
            value={metrics?.totalInfUsers}
            icon={FiUser}
            color={shuffledColors[1]}
            loading={loading}
            error={error}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <MetricCard
            title="Active Influencers"
            value={metrics?.activeUsers}
            icon={FiUser}
            color={shuffledColors[2]}
            loading={loading}
            error={error}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard
            title="Inactive Influencers"
            value={metrics?.inactiveUsers}
            icon={FiUser}
            color={shuffledColors[3]}
            loading={loading}
            error={error}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard
            title="Influencers with pending payment"
            value={metrics?.initialUsers}
            icon={FiUser}
            color={shuffledColors[4]}
            loading={loading}
            error={error}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard
            title="Influencers with admin review pending"
            value={metrics?.adminApprovalUsers}
            icon={FiUser}
            color={shuffledColors[0]}
            loading={loading}
            error={error}
          />
        </Grid>
      </Grid>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, textAlign: "start" }}>
        Payment
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          marginBottom: "1rem",
        }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard
            title="Total Earned"
            value={metrics ? formatCurrency(metrics.paidOrders) : null}
            icon={BiRupee}
            color={shuffledColors[1]}
            loading={loading}
            error={error}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminHome;
