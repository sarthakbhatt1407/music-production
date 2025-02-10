import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Modal,
  Tooltip,
  IconButton,
  Skeleton,
  useTheme,
  useMediaQuery,
  Button,
  Alert,
} from "@mui/material";
import { FiCopy } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import MusicLoader from "../Loader/MusicLoader";
import { Link } from "react-router-dom";
import { LinkOutlined } from "@mui/icons-material";

const Container = styled.div`
  padding: 0.5rem 1rem;
  max-width: 100%;
  max-height: 89svh;
`;

const Header = styled(Typography)`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const StyledPaper = styled.div`
  padding: 1.5rem;
  margin-bottom: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StyledDataGrid = styled(DataGrid)`
  .MuiDataGrid-row:hover {
    background-color: white;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  .MuiDataGrid-cell {
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: start; /* Horizontally center the content */
    align-items: center; /* Vertically center the content */
  }
`;

const ImageModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
`;

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

const InfOrdersHistory = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.userId);
  const [orders, setOrders] = useState([]);
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

  const fetchOrdersByUserID = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/get-order-by-user-id`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      console.log(data["orders"]);
      setOrders(data["orders"].reverse());
    } catch (error) {
      console.log("Error fetching orders:", error);
      return [];
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrdersByUserID();
    fetchUserProfile();
  }, [userId]);

  const handlePayClick = () => {
    // Redirect to payment page or initiate payment process
    navigate("/payment-page"); // Replace with your payment page route
  };

  const columns = [
    {
      field: "campaignImage",
      headerName: "Image",
      width: 70,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img
            src={`${process.env.REACT_APP_BASE_URL}/${
              params.row.images.split(",")[0]
            }`}
            alt="Campaign"
            style={{
              width: 40,
              height: 40,
              objectFit: "cover",
              borderRadius: 4,
            }}
            onClick={() => setSelectedImage(params.value)}
            onError={(e) => {
              e.target.src = `${process.env.REACT_APP_BASE_URL}/${
                params.images.split(",")[0]
              }`;
            }}
          />
        </div>
      ),
    },
    {
      field: "brandName",
      headerName: "Brand",
      width: 170,
      renderCell: (params) => <Typography>{params.row.brandName}</Typography>,
    },
    {
      field: "campaignName",
      headerName: "Campaign",
      width: 200,
      renderCell: (params) => (
        <Typography fontWeight="600">
          {params.value.length > 20
            ? `${params.value.substring(0, 20)}...`
            : params.value}
        </Typography>
      ),
    },
    // {
    //   field: "collaborationId",
    //   headerName: "Collaboration ID",
    //   width: 180,
    //   renderCell: (params) => (
    //     <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
    //       <Typography>{params.value}</Typography>
    //       <Tooltip title="Copy ID">
    //         <IconButton
    //           size="small"
    //           onClick={() => navigator.clipboard.writeText(params.value)}
    //         >
    //            <FiCopy />
    //         </IconButton>
    //       </Tooltip>
    //     </div>
    //   ),
    // },
    {
      field: "campaignDescription",
      headerName: "Description",
      width: 400,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography>
            {params.value.length > 50
              ? `${params.value.substring(0, 50)}...`
              : params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return (
          <Chip
            label={params.value.replace("_", " ").toUpperCase()}
            color={getStatusColor(params.value)}
            size="small"
          />
        );
      },
    },
    {
      field: "workLink",
      headerName: "Preview",
      width: 150,
      renderCell: (params) => {
        console.log("param", params);

        return (
          <Tooltip>
            {params.value.length > 0 ? (
              <Link to={params.value} target="_blank">
                <LinkOutlined />
              </Link>
            ) : (
              "-"
            )}
          </Tooltip>
        );
      },
    },
  ];

  const filteredData = orders.filter((item) => {
    const matchesSearch = Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      {loading && <MusicLoader />}
      <Container>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ mb: 2, textAlign: "start" }}
        >
          Campaign Orders History
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
              title: "Orders History",
            },
          ]}
        />

        {user && user.paymentStatus === "pending" && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Your payment is pending. Please complete the payment to access your
            orders.
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

        {user && user.paymentStatus !== "pending" && (
          <>
            <StyledPaper>
              <FilterContainer isMobile={isMobile}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <BiSearchAlt size={20} style={{ marginRight: 8 }} />
                    ),
                  }}
                />
                <FormControl sx={{ minWidth: 200 }}>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in process">In Process</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </FilterContainer>
              <div
                style={{
                  maxHeight: "60svh",
                  overflow: "scroll",
                }}
              >
                {loading ? (
                  <Skeleton variant="rectangular" height={300} />
                ) : (
                  <StyledDataGrid
                    rows={filteredData}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    autoHeight
                    disableSelectionOnClick
                    onRowClick={(row) => {
                      navigate(
                        `/influencer-admin-panel/order-details/${row.id}`
                      );
                    }}
                    onCellClick={(cell) => {
                      if (cell.field === "campaignImage") {
                        navigate(
                          `/influencer-admin-panel/order-details/${cell.id}`
                        );
                      } else {
                        console.log(cell);

                        navigate(
                          `/influencer-admin-panel/order-details/${cell.id}`
                        );
                      }
                    }}
                  />
                )}
              </div>
            </StyledPaper>

            <ImageModal
              open={!!selectedImage}
              onClose={() => setSelectedImage(null)}
            >
              <ImagePreview
                src={selectedImage}
                alt="Campaign Preview"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1557683316-973673baf926";
                }}
              />
            </ImageModal>
          </>
        )}
      </Container>
    </>
  );
};

export default InfOrdersHistory;
