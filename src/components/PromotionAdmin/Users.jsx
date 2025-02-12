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
    case "active":
      return "success";
    case "inactive":
      return "warning";
    case "banned":
      return "error";
    default:
      return "default";
  }
};

const Users = () => {
  const userId = useSelector((state) => state.userId);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchTerm, setSearchTerm] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/user/get-all-users`
      );

      if (!response.ok) {
        setLoading(false);
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.users);
      console.log("Users:", data.users);
    } catch (error) {
      console.log("Error fetching users:", error);
      return [];
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [userId]);

  const columns = [
    {
      field: "profileImage",
      headerName: "Image",
      width: 70,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img
            src={`${process.env.REACT_APP_BASE_URL}/${params.row.profileImage}`}
            alt="User"
            style={{
              width: 40,
              height: 40,
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        </div>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => (
        <Typography
          style={{
            textTransform: "capitalize",
          }}
        >
          {params.row.name}
        </Typography>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 270,
      renderCell: (params) => (
        <Typography fontWeight="600">{params.value}</Typography>
      ),
    },
    {
      field: "contactNum",
      headerName: "Contact Number",
      width: 150,
      renderCell: (params) => <Typography>{params.value}</Typography>,
    },
    {
      field: "userType",
      headerName: "User Type",
      width: 150,
      renderCell: (params) => (
        <Typography
          style={{
            textTransform: "capitalize",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "userSince",
      headerName: "User Since",
      width: 150,
      renderCell: (params) => (
        <Typography
          style={{
            textTransform: "capitalize",
          }}
        >
          {params.value}
        </Typography>
      ),
    },

    {
      field: "city",
      headerName: "City",
      width: 150,
      renderCell: (params) => <Typography>{params.value}</Typography>,
    },
    {
      field: "state",
      headerName: "State",
      width: 150,
      renderCell: (params) => <Typography>{params.value}</Typography>,
    },
  ];

  const filteredData = users.filter((item) => {
    if (!item) return false; // Ensure item is not undefined or null

    const matchesSearch = Object.values(item).some((value) =>
      value
        ? value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        : false
    );
    const matchesUserType =
      userTypeFilter === "all" || item.userType === userTypeFilter;
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesUserType && matchesStatus;
  });

  return (
    <Container>
      <Typography variant="h5" gutterBottom sx={{ mb: 2, textAlign: "start" }}>
        Users Management
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
            title: "Users Management",
          },
        ]}
      />

      <StyledPaper>
        <FilterContainer isMobile={isMobile}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search users..."
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
              value={userTypeFilter}
              onChange={(e) => setUserTypeFilter(e.target.value)}
            >
              <MenuItem value="all">All Users</MenuItem>
              <MenuItem value="promoter">Promoter</MenuItem>
              <MenuItem value="influencer">Influencer</MenuItem>
            </Select>
          </FormControl>
          {userTypeFilter === "influencer" && (
            <FormControl sx={{ minWidth: 200 }}>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
                <MenuItem value="for admin approval">
                  Pending for review
                </MenuItem>
                <MenuItem value="initial">Payment Pending</MenuItem>
              </Select>
            </FormControl>
          )}
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
              getRowId={(row) => row.id} // Ensure unique row IDs
              onRowClick={(row) => {
                navigate(`/admin-admin-panel/${row.row.userType}/${row.id}`);
              }}
              onCellClick={(cell) => {
                if (cell.field === "profileImage") {
                  navigate(
                    `/admin-admin-panel/${cell.row.userType}/${cell.id}`
                  );
                } else {
                  navigate(
                    `/admin-admin-panel/${cell.row.userType}/${cell.id}`
                  );
                }
              }}
            />
          )}
        </div>
      </StyledPaper>

      <ImageModal open={!!selectedImage} onClose={() => setSelectedImage(null)}>
        <ImagePreview
          src={selectedImage}
          alt="User Preview"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150";
          }}
        />
      </ImageModal>
    </Container>
  );
};

export default Users;
