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
} from "@mui/material";
import { FiCopy } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";

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

const OrdersHistory = () => {
  const userId = useSelector((state) => state.userId);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [orders, setOrders] = useState([]);
  const fetchOrdersByUserID = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/brand/get-order-by-user-id`,
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
  }, [userId]);

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
    {
      field: "collaborationId",
      headerName: "Collaboration ID",
      width: 180,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Typography>{params.value}</Typography>
          <Tooltip title="Copy ID">
            <IconButton
              size="small"
              onClick={() => navigator.clipboard.writeText(params.value)}
            >
              <FiCopy />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
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
    <Container>
      <Typography variant="h5" gutterBottom sx={{ mb: 2, textAlign: "start" }}>
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
                navigate(`/promotor-admin-panel/order-details/${row.id}`);
              }}
              onCellClick={(cell) => {
                if (cell.field === "campaignImage") {
                  navigate(`/promotor-admin-panel/order-details/${cell.id}`);
                } else {
                  console.log(cell);

                  navigate(`/promotor-admin-panel/order-details/${cell.id}`);
                }
              }}
            />
          )}
        </div>
      </StyledPaper>

      <ImageModal open={!!selectedImage} onClose={() => setSelectedImage(null)}>
        <ImagePreview
          src={selectedImage}
          alt="Campaign Preview"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1557683316-973673baf926";
          }}
        />
      </ImageModal>
    </Container>
  );
};

export default OrdersHistory;
