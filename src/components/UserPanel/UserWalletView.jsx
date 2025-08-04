import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Card,
  CardContent,
  Chip,
  Avatar,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  AccountBalanceWallet as WalletIcon,
  Payments as PaymentsIcon,
  TrendingUp as TrendingUpIcon,
  CardGiftcard as BonusIcon,
  Search as SearchIcon,
  Event as EventIcon,
  AccessTime as TimeIcon,
  Description as NoteIcon,
} from "@mui/icons-material";
import { Breadcrumb } from "antd";
import { useParams } from "react-router";
import MusicLoader from "../Loader/MusicLoader";
import { useSelector } from "react-redux";

const StyledCard = styled(Card)({
  borderRadius: 16,
  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)",
  marginBottom: 24,
  overflow: "hidden",
});

const GradientHeader = styled(Box)(({ bgColor }) => ({
  background: bgColor || "linear-gradient(90deg, #2c3e50 0%, #4c669f 100%)",
  padding: "16px 24px",
  display: "flex",
  alignItems: "center",
  color: "white",
}));

const BalanceBox = styled(Box)(({ bgColor }) => ({
  padding: 24,
  borderRadius: 12,
  background: bgColor || "#f5f5f5",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
}));

const StyledTableContainer = styled(TableContainer)({
  boxShadow: "none",
  "& .MuiTableCell-head": {
    backgroundColor: "#f8f9fa",
    fontWeight: 600,
    color: "#495057",
  },
  "& .MuiTableRow-root:last-child .MuiTableCell-body": {
    borderBottom: "none",
  },
  "& .MuiTableRow-root:hover": {
    backgroundColor: "#f8faff",
  },
});

const AmountText = styled(Typography)(({ type }) => ({
  fontWeight: "bold",
  color: type === "bonus" ? "#9c27b0" : "#2e7d32",
}));

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
    "& fieldset": {
      borderColor: "#e0e0e0",
    },
    "&:hover fieldset": {
      borderColor: "#b0b0b0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3f51b5",
    },
  },
});

const PageHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 32,
});

const IconWithLabel = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: 4,
  "& .MuiSvgIcon-root": {
    marginRight: 8,
    fontSize: 18,
    color: "#757575",
  },
});

const UserWalletView = () => {
  const id = useSelector((state) => state.userId);
  const [userData, setUserData] = useState({
    userName: "User",
    userAvatar: "https://i.pravatar.cc/150?img=37",
    paidOrders: 0,
    balancePaid: 0,
    currentBalance: 0,
    bonus: 0,
  });
  const [walletData, setWalletData] = useState([]);
  const [bonusData, setBonusData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch wallet and bonus data
  const fetchWalletData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/get-wallet`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setWalletData(data.wallet || []);
        setBonusData(data.bonusWallet || []);
        let paidOrders = 0;
        let balancePaid = 0;
        let bonus = 0;
        data.wallet?.forEach((t) => {
          paidOrders += t.amount;
        });
        data.bonusWallet?.forEach((t) => {
          bonus += t.amount;
        });
        balancePaid = paidOrders;
        setUserData((prev) => ({
          ...prev,
          paidOrders: Number.parseInt(data.totalEarn),
          balancePaid: Number.parseInt(data.totalPaid),
          currentBalance:
            Number.parseInt(data.totalEarn) - Number.parseInt(data.totalPaid),
          bonus,
          userName: data.name,
          userAvatar: data.img,
        }));
      }
    } catch (err) {}
    setLoading(false);
  };

  useEffect(() => {
    fetchWalletData();
    // eslint-disable-next-line
  }, [id]);

  // Merge wallet and bonus transactions into one array
  const mergedTransactions = [
    ...walletData.map((t) => ({ ...t, type: "payment" })),
    ...bonusData.map((t) => ({ ...t, type: "bonus" })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Filter transactions based on search term
  const filteredTransactions = mergedTransactions.filter(
    (transaction) =>
      transaction.description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.amount?.toString().includes(searchTerm)
  );

  // UI handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, height: "87vh", overflow: "auto" }}>
      {loading && <MusicLoader />}
      <Breadcrumb
        items={[{ title: "User Panel" }, { title: "Wallet" }]}
        style={{ marginBottom: "1rem" }}
      />

      <PageHeader>
        <Box display="flex" alignItems="center">
          <img
            src={userData.userAvatar}
            alt={`${userData.userName}'s avatar`}
            style={{
              width: 56,
              height: 56,
              marginRight: 16,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <Box>
            <Typography variant="h4" fontWeight={600} sx={{ color: "#333333" }}>
              {userData.userName}'s Wallet
            </Typography>
            <Typography variant="body1" sx={{ color: "#757575" }}>
              Your earning overview and transaction history
            </Typography>
          </Box>
        </Box>
      </PageHeader>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <BalanceBox bgColor="linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)">
            <WalletIcon
              sx={{ fontSize: 48, mb: 2, color: "white", opacity: 0.8 }}
            />
            <Typography
              variant="h6"
              fontWeight={500}
              sx={{ mb: 1, color: "white" }}
            >
              Total Earned
            </Typography>
            <Typography variant="h3" fontWeight={700} sx={{ color: "white" }}>
              ₹{userData.paidOrders.toLocaleString("en-IN")}
            </Typography>
          </BalanceBox>
        </Grid>
        <Grid item xs={12} md={3}>
          <BalanceBox bgColor="linear-gradient(135deg, #0BA360 0%, #3CBA92 100%)">
            <PaymentsIcon
              sx={{ fontSize: 48, mb: 2, color: "white", opacity: 0.8 }}
            />
            <Typography
              variant="h6"
              fontWeight={500}
              sx={{ mb: 1, color: "white" }}
            >
              Total Paid
            </Typography>
            <Typography variant="h3" fontWeight={700} sx={{ color: "white" }}>
              ₹{userData.balancePaid.toLocaleString("en-IN")}
            </Typography>
          </BalanceBox>
        </Grid>
        <Grid item xs={12} md={3}>
          <BalanceBox bgColor="linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)">
            <TrendingUpIcon
              sx={{ fontSize: 48, mb: 2, color: "white", opacity: 0.8 }}
            />
            <Typography
              variant="h6"
              fontWeight={500}
              sx={{ mb: 1, color: "white" }}
            >
              Balance Due
            </Typography>
            <Typography variant="h3" fontWeight={700} sx={{ color: "white" }}>
              ₹{userData.currentBalance.toLocaleString("en-IN")}
            </Typography>
          </BalanceBox>
        </Grid>
        <Grid item xs={12} md={3}>
          <BalanceBox bgColor="linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)">
            <BonusIcon
              sx={{ fontSize: 48, mb: 2, color: "white", opacity: 0.8 }}
            />
            <Typography
              variant="h6"
              fontWeight={500}
              sx={{ mb: 1, color: "white" }}
            >
              Bonus
            </Typography>
            <Typography variant="h3" fontWeight={700} sx={{ color: "white" }}>
              ₹{userData.bonus.toLocaleString("en-IN")}
            </Typography>
          </BalanceBox>
        </Grid>

        <Grid item xs={12}>
          <StyledCard>
            <GradientHeader bgColor="linear-gradient(90deg, #2c3e50 0%, #4c669f 100%)">
              <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                Transaction History
              </Typography>
            </GradientHeader>

            <CardContent sx={{ p: 0 }}>
              <Box sx={{ p: 3 }}>
                <StyledTextField
                  fullWidth
                  size="small"
                  placeholder="Search by description or amount..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <SearchIcon sx={{ color: "#757575", mr: 1 }} />
                    ),
                  }}
                  sx={{ maxWidth: 400 }}
                />
              </Box>

              <Divider />

              <StyledTableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date & Time</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell align="center">Type</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTransactions
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((transaction) => (
                        <TableRow key={transaction.id} hover>
                          <TableCell>
                            <IconWithLabel>
                              <EventIcon fontSize="small" />
                              {transaction.date}
                            </IconWithLabel>
                            <IconWithLabel>
                              <TimeIcon fontSize="small" />
                              {transaction.time}
                            </IconWithLabel>
                          </TableCell>
                          <TableCell>
                            <IconWithLabel>
                              <NoteIcon fontSize="small" />
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 500,
                                  textTransform: "capitalize",
                                  color: "#333333",
                                }}
                              >
                                {transaction.description}
                              </Typography>
                            </IconWithLabel>
                          </TableCell>
                          <TableCell>
                            <AmountText
                              variant="body1"
                              type={transaction.type}
                              sx={{ fontWeight: 700 }}
                            >
                              ₹{transaction.amount.toLocaleString("en-IN")}
                            </AmountText>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={
                                transaction.type === "bonus"
                                  ? "Bonus"
                                  : "Payment"
                              }
                              sx={{
                                color:
                                  transaction.type === "bonus"
                                    ? "#9c27b0"
                                    : "#1976d2",
                                borderColor:
                                  transaction.type === "bonus"
                                    ? "#9c27b0"
                                    : "#1976d2",
                              }}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    {filteredTransactions.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                          <Typography sx={{ color: "#757575" }}>
                            No transactions found
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </StyledTableContainer>

              <Divider />

              <TablePagination
                component="div"
                count={filteredTransactions.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                sx={{ px: 2 }}
              />
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserWalletView;
