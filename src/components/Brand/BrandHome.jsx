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
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import { BiRupee } from "react-icons/bi";
import { useSelector } from "react-redux";
import UserNotiBanner from "../UserNotiBanner";

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

const BrandHome = () => {
  const theme = useTheme();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.userId);

  const [noti, setNoti] = useState(null);
  const fetcher = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/brand/get-all-notification`
    );
    const data = await res.json();

    if (res.ok) {
      console.log(data.notifications);
      setNoti(data.notifications[0]);
    }
  };

  useEffect(() => {
    fetcher();

    return () => {};
  }, []);
  useEffect(() => {
    const getBrandHomeData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/brand/get-brand-home-data`,
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

    getBrandHomeData();
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
      {noti && <UserNotiBanner text={noti.des} />}
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
        {/* 
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard
            title="Total Spent"
            value={metrics ? formatCurrency(metrics.paidOrders) : null}
            icon={BiRupee}
            color={theme.palette.secondary.main}
            loading={loading}
            error={error}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default BrandHome;
