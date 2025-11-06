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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
  ButtonBase,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import MusicLoader from "../Loader/MusicLoader";
import { useParams } from "react-router";
import { message, Popconfirm } from "antd";

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

const UserWallet = () => {
  const theme = useTheme();
  const id = useParams().id;
  console.log(id);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const userId = useSelector((state) => state.userId);
  const [loading, setLoading] = useState(true);
  const [walletData, setWalletdata] = useState([]);
  const [userData, setUserData] = useState(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [bonusDialogOpen, setBonusDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ amount: "", remark: "" });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
          body: JSON.stringify({ id: id }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch brand home data.");
      }
      setWalletdata([...data.wallet, ...data.bonusWallet]);
      setUserData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSubmit = async (action) => {
    if (action === "wallet") {
      if (formData.remark === "" || formData.amount === "") {
        message.error("Please enter all fields");
        return;
      }
    } else {
      if (formData.amount === "") {
        message.error("Please enter all fields");
        return;
      }
    }
    setLoading(true);
    if (action === "bonus") {
      formData.remark = "Bonus - " + formData.remark;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/brand/add-inf-wallet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ infId: id, ...formData, action }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to perform action.");
      }

      message.success("Wallet Updated Successfully");
      console.log(data);
      getInfHomeData();
    } catch (error) {
      console.error(error);
      message.error("Failed to perform action.");
    }
    setLoading(false);
    setPaymentDialogOpen(false);
    setBonusDialogOpen(false);
    setFormData({ amount: "", remark: "" });
  };

  useEffect(() => {
    getInfHomeData();
  }, [id]);

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
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
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
                    color="primary"
                    onClick={() => setPaymentDialogOpen(true)}
                    sx={{ mr: 2 }}
                  >
                    Add Payment
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setBonusDialogOpen(true)}
                  >
                    Add Bonus
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
                      <TableCell>Action</TableCell>
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
                          <TableCell>
                            <Popconfirm
                              title="Are you sure you want to delete this entry?"
                              okText="Yes"
                              cancelText="No"
                              onConfirm={async () => {
                                const action =
                                  transaction.description.toLowerCase();
                                const entryId = transaction.id;
                                setLoading(true);
                                console.log({ id: entryId, action, infId: id });

                                try {
                                  const response = await fetch(
                                    `${process.env.REACT_APP_BASE_URL}/brand/delete-inf-wallet`,
                                    {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        id: entryId,
                                        action,
                                        infId: id,
                                      }),
                                    }
                                  );

                                  const data = await response.json();
                                  console.log(data);

                                  if (!response.ok) {
                                    throw new Error(
                                      data.message ||
                                        "Failed to delete wallet entry."
                                    );
                                  }

                                  message.success(
                                    "Wallet entry deleted successfully."
                                  );
                                  getInfHomeData();
                                } catch (error) {
                                  console.error(
                                    "Error deleting wallet entry:",
                                    error
                                  );
                                  message.error("Error deleting wallet entry.");
                                  throw error;
                                }
                                setLoading(false);
                              }}
                            >
                              <ButtonBase
                                variant="contained"
                                disabled={loading}
                              >
                                Remove
                              </ButtonBase>
                            </Popconfirm>
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

      <Dialog
        open={paymentDialogOpen}
        onClose={() => setPaymentDialogOpen(false)}
      >
        <DialogTitle>Add Payment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the payment amount and remark.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            value={formData.amount}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="remark"
            label="Remark"
            type="text"
            fullWidth
            value={formData.remark}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => handleSubmit("wallet")}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={bonusDialogOpen} onClose={() => setBonusDialogOpen(false)}>
        <DialogTitle>Add Bonus</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the bonus amount.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            value={formData.amount}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="remark"
            label="Remark"
            type="text"
            fullWidth
            value={formData.remark}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBonusDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => handleSubmit("bonus")}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserWallet;
