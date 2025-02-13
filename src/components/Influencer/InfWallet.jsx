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
                {/* <Box>
                <IconButton title="Refresh">
                  <FaSync />
                </IconButton>
                <IconButton title="Export">
                  <FaDownload />
                </IconButton>
              </Box> */}
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
    </Container>
  );
};

export default InfWallet;
