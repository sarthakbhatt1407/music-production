import React, { useEffect, useState } from "react";
import {
  Modal as AntdModal,
  Select as AntdSelect,
  Button as AntdButton,
} from "antd";

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
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
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
  AttachMoney as MoneyIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import { Breadcrumb, Select } from "antd";
import { useSelector } from "react-redux";
import { FaIndianRupeeSign } from "react-icons/fa6";
import MusicLoader from "../Loader/MusicLoader";

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

const ActionButton = styled(Button)({
  borderRadius: 8,
  textTransform: "none",
  fontWeight: 600,
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  marginLeft: 16,
});

const monthOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const yearOptions = [
  new Date().getFullYear() - 2,
  new Date().getFullYear() - 1,
  new Date().getFullYear(),
];

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

  // Payment request feature
  const [paymentRequestOpen, setPaymentRequestOpen] = useState(false);
  const [requestFormData, setRequestFormData] = useState({
    amount: "",
    message: "",
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    severity: "success",
    message: "",
  });

  // Download report modal state
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(
    monthOptions[new Date().getMonth()]
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [downloading, setDownloading] = useState(false);

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
    } catch (err) {
      console.error("Error fetching wallet data:", err);
    }
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

  // Payment request handlers
  const handleRequestChange = (e) => {
    const { name, value } = e.target;
    setRequestFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRequestSubmit = async () => {
    if (
      !requestFormData.amount ||
      isNaN(parseFloat(requestFormData.amount)) ||
      parseFloat(requestFormData.amount) <= 0
    ) {
      setAlertInfo({
        severity: "error",
        message: "Please enter a valid amount",
      });
      setAlertOpen(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/req-payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: id,
            amount: parseFloat(requestFormData.amount),
            remark: requestFormData.message || "Payment request",
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.sent) {
        setAlertInfo({
          severity: "success",
          message: "Payment request sent successfully to admin!",
        });
        setRequestFormData({ amount: "", message: "" });
        setPaymentRequestOpen(false);
      } else {
        setAlertInfo({
          severity: "error",
          message: data.message || "Failed to send payment request",
        });
      }
    } catch (err) {
      console.error("Error sending payment request:", err);
      setAlertInfo({
        severity: "error",
        message: "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
      setAlertOpen(true);
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  // Download report handler
  const handleDownloadReport = async () => {
    // setDownloading(true);
    const win = window.open(
      `${process.env.REACT_APP_BASE_URL}/user/get-report/${userData.userName}/${selectedMonth}/${selectedYear}`
    );
    setTimeout(() => {
      if (win) win.close();
      setDownloading(false);
    }, 10000);
    setDownloadModalOpen(false);
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
          <Box>
            <Typography variant="h4" fontWeight={600} sx={{ color: "#333333" }}>
              {userData.userName}'s Wallet
            </Typography>
            <Typography variant="body1" sx={{ color: "#757575" }}>
              Your earning overview and transaction history
            </Typography>
          </Box>
        </Box>
        <Box>
          <ActionButton
            variant="contained"
            color="primary"
            startIcon={<FaIndianRupeeSign />}
            onClick={() => setPaymentRequestOpen(true)}
            sx={{
              bgcolor: "#ff9800",
              "&:hover": { bgcolor: "#f57c00" },
            }}
          >
            Request Payment
          </ActionButton>
          <ActionButton
            variant="contained"
            color="secondary"
            startIcon={<DownloadIcon />}
            onClick={() => setDownloadModalOpen(true)}
            sx={{
              bgcolor: "#1976d2",
              "&:hover": { bgcolor: "#1565c0" },
              marginLeft: 2,
            }}
          >
            Download Report
          </ActionButton>
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

      {/* Payment Request Dialog */}
      <Dialog
        open={paymentRequestOpen}
        onClose={() => setPaymentRequestOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxWidth: 500,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" fontWeight={600} sx={{ color: "#333333" }}>
            Request Payment
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3, color: "#757575" }}>
            Please specify the amount you would like to request and add a
            message for the admin.
          </DialogContentText>
          <StyledTextField
            autoFocus
            margin="dense"
            name="amount"
            label="Amount (₹)"
            type="number"
            fullWidth
            value={requestFormData.amount}
            onChange={handleRequestChange}
            sx={{ mb: 3 }}
          />
          <StyledTextField
            margin="dense"
            name="message"
            label="Message to Admin"
            type="text"
            fullWidth
            value={requestFormData.message}
            onChange={handleRequestChange}
            placeholder="Please include any relevant details about your payment request"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setPaymentRequestOpen(false)}
            variant="outlined"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              borderColor: "#ff9800",
              color: "#ff9800",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRequestSubmit}
            variant="contained"
            disabled={loading}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 3,
              bgcolor: "#ff9800",
              "&:hover": {
                bgcolor: "#f57c00",
              },
            }}
          >
            {loading ? "Sending..." : "Send Request"}
          </Button>
        </DialogActions>
      </Dialog>

      <AntdModal
        title="Download Label Report"
        open={downloadModalOpen}
        onCancel={() => setDownloadModalOpen(false)}
        footer={[
          <AntdButton key="cancel" onClick={() => setDownloadModalOpen(false)}>
            Cancel
          </AntdButton>,
          <AntdButton
            key="download"
            type="primary"
            loading={downloading}
            onClick={handleDownloadReport}
          >
            Download
          </AntdButton>,
        ]}
      >
        <div style={{ marginBottom: 16 }}>
          <label style={{ marginBottom: 8, display: "block" }}>Month</label>
          <AntdSelect
            style={{ width: "100%" }}
            value={selectedMonth}
            onChange={setSelectedMonth}
          >
            {monthOptions.map((m) => (
              <AntdSelect.Option key={m} value={m}>
                {m}
              </AntdSelect.Option>
            ))}
          </AntdSelect>
        </div>
        <div>
          <label style={{ marginBottom: 8, display: "block" }}>Year</label>
          <AntdSelect
            style={{ width: "100%" }}
            value={selectedYear}
            onChange={setSelectedYear}
          >
            {yearOptions.map((y) => (
              <AntdSelect.Option key={y} value={y}>
                {y}
              </AntdSelect.Option>
            ))}
          </AntdSelect>
        </div>
      </AntdModal>

      {/* Alert Snackbar */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertInfo.severity}
          sx={{ width: "100%" }}
        >
          {alertInfo.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserWalletView;
