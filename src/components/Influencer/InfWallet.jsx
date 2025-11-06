import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TextField,
  Chip,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaSearch, FaDownload, FaSync } from "react-icons/fa";
import { useSelector } from "react-redux";
import MusicLoader from "../Loader/MusicLoader";

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const BalanceBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  textAlign: "center",
}));

const InfWallet = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const userId = useSelector((state) => state.userId);
  const [loading, setLoading] = useState(true);
  const [walletData, setWalletdata] = useState([]);
  const [userData, setUserData] = useState(null);
  // Payment request feature (copied from UserWalletView)
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

  const filteredTransactions = walletData.filter(
    (transaction) =>
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm)
  );
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
    setRequestFormData((prev) => ({ ...prev, [name]: value }));
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
        `${process.env.REACT_APP_BASE_URL}/user/req-payment-inf`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            amount: parseFloat(requestFormData.amount),
            remark: requestFormData.message || "Payment request",
          }),
        }
      );

      const data = await res.json();

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

  useEffect(() => {
    const getInfHomeData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/brand/get-inf-wallet`,
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
        setWalletdata([...data.wallet, ...data.bonusWallet]);
        setUserData(data);
        console.log(data);
      } catch (error) {}
      setLoading(false);
    };

    getInfHomeData();
  }, [userId]);

  return (
    <Container maxWidth="xl" sx={{ py: 4, height: "87vh", overflow: "scroll" }}>
      {loading && <MusicLoader />}
      {userData && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StyledCard>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <BalanceBox sx={{ bgcolor: theme.palette.grey[100] }}>
                    <Typography variant="h6">Total Earned</Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      ₹ {userData.paidOrders.toFixed(2)}
                    </Typography>
                  </BalanceBox>
                </Grid>
                <Grid item xs={12} md={3}>
                  <BalanceBox sx={{ bgcolor: theme.palette.success.light }}>
                    <Typography variant="h6">Total Balance Paid</Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      ₹ {userData.balancePaid.toFixed(2)}
                    </Typography>
                  </BalanceBox>
                </Grid>
                <Grid item xs={12} md={3}>
                  <BalanceBox sx={{ bgcolor: theme.palette.grey[100] }}>
                    <Typography variant="h6">Current Balance</Typography>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      ₹ {userData.currentBalance.toFixed(2)}
                    </Typography>
                  </BalanceBox>
                </Grid>
                <Grid item xs={12} md={3}>
                  <BalanceBox sx={{ bgcolor: theme.palette.primary.light }}>
                    <Typography variant="h6">Bonus</Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      ₹ {userData.bonus.toFixed(2)}
                    </Typography>
                  </BalanceBox>
                </Grid>
              </Grid>
            </StyledCard>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                  alignItems: "center",
                }}
              >
                <TextField
                  size="small"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <FaSearch style={{ marginRight: 8 }} />,
                  }}
                />
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => setPaymentRequestOpen(true)}
                    sx={{
                      background: "#ff9800",
                      color: "#fff",
                      "&:hover": { background: "#f57c00" },
                      textTransform: "none",
                      borderRadius: 1,
                      ml: 1,
                    }}
                  >
                    Request Payment
                  </Button>
                </Box>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Remark</TableCell>
                      <TableCell>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTransactions
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((transaction) => (
                        <TableRow
                          key={transaction.id}
                          hover
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.time}</TableCell>
                          <TableCell
                            style={{
                              textTransform: "capitalize",
                            }}
                          >
                            {transaction.description}
                          </TableCell>
                          <TableCell sx={{ color: theme.palette.success.main }}>
                            ₹ {Math.abs(transaction.amount).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                component="div"
                count={filteredTransactions.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
      {/* Payment Request Dialog */}
      <Dialog
        open={paymentRequestOpen}
        onClose={() => setPaymentRequestOpen(false)}
        PaperProps={{ sx: { borderRadius: 2, maxWidth: 500 } }}
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
          <TextField
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
          <TextField
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
              "&:hover": { bgcolor: "#f57c00" },
            }}
          >
            {loading ? "Sending..." : "Send Request"}
          </Button>
        </DialogActions>
      </Dialog>

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

export default InfWallet;
