import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  InputAdornment,
  Link,
  Snackbar,
  Alert,
  CircularProgress,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../assets/images/logo/ready.png";
// Styled Components
const LoginContainer = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  background: "#f9f9f9",
  justifyContent: "center",
  alignItems: "center",
});

const LoginCard = styled(Paper)(({ theme }) => ({
  padding: "2.5rem 2rem",
  borderRadius: "12px",
  width: "83%",
  backgroundColor: "#ffffff",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "72svh",
  position: "relative",
  border: "1px solid rgb(201, 202, 206)",
  // Responsive styles
  [theme.breakpoints.down("sm")]: {
    padding: "1rem",
    width: "90%",
    height: "60svh",
  },
  [theme.breakpoints.down("xs")]: {
    padding: "1.2rem",
    width: "98%",
  },
}));

const Logo = styled("img")({
  width: "60px",
  height: "60px",
  marginBottom: "1rem",
  // Responsive styles
  "@media (max-width: 600px)": {
    width: "50px",
    height: "50px",
    marginBottom: "0.7rem",
  },
});

const LogoPlaceholder = styled(Box)(({ theme }) => ({
  width: "50px",
  height: "50px",

  borderRadius: "8px",
  marginBottom: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  // Responsive styles
  [theme.breakpoints.down("sm")]: {
    width: "50px",
    height: "50px",
    marginBottom: "0.7rem",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "30px",
  marginBottom: "0.5rem",
  // Responsive styles
  [theme.breakpoints.down("sm")]: {
    fontSize: "24px",
    marginBottom: "0.3rem",
  },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 400,
  color: "#666",
  marginBottom: "2rem",
  // Responsive styles
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    marginBottom: "1.5rem",
  },
}));

const PhoneInputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  marginBottom: "1.5rem",
  gap: "10px",
  // Responsive styles
  [theme.breakpoints.down("sm")]: {
    marginBottom: "1.2rem",
  },
}));

const CountryCode = styled(FormControl)(({ theme }) => ({
  width: "80px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    height: "55px",
  },
  // Responsive styles
  [theme.breakpoints.down("sm")]: {
    width: "90px",
    "& .MuiOutlinedInput-root": {
      height: "50px",
    },
  },
}));

const PhoneInput = styled(TextField)(({ theme }) => ({
  flex: 1,
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    height: "55px",
  },
  // Responsive styles
  [theme.breakpoints.down("sm")]: {
    "& .MuiOutlinedInput-root": {
      height: "50px",
    },
  },
}));

const ContinueButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: "50px",
  borderRadius: "8px",
  backgroundColor: "#6c8cff",
  color: "white",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: "#5a75d6",
  },
  "&.Mui-disabled": {
    backgroundColor: "#a0afed",
    color: "white",
  },
  // Responsive styles
  [theme.breakpoints.down("sm")]: {
    height: "45px",
    fontSize: "15px",
  },
}));

const OtpContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: "2rem",
  // Responsive styles
  [theme.breakpoints.down("sm")]: {
    marginBottom: "1.5rem",
  },
}));

const OtpInput = styled(TextField)(({ theme }) => ({
  width: "60px",
  "& .MuiOutlinedInput-root": {
    height: "56px",
    borderRadius: "8px",
    fontSize: "1.5rem",
    fontWeight: "600",
    "& input": {
      textAlign: "center",
      padding: "8px",
    },
  },
  "& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  // Responsive styles
  [theme.breakpoints.down("sm")]: {
    width: "50px",
    "& .MuiOutlinedInput-root": {
      height: "50px",
      fontSize: "1.3rem",
      "& input": {
        padding: "6px",
      },
    },
  },
  [theme.breakpoints.down("xs")]: {
    width: "45px",
    "& .MuiOutlinedInput-root": {
      height: "45px",
      fontSize: "1.2rem",
    },
  },
}));

const FooterText = styled(Typography)(({ theme }) => ({
  fontSize: "13px",
  color: "#666",
  textAlign: "center",
  marginTop: "2rem",
  position: "absolute",
  bottom: "6%",
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  // Responsive styles
  [theme.breakpoints.down("sm")]: {
    fontSize: "13px",
    marginTop: "1.5rem",
    bottom: "4%",
  },
}));

const DemoText = styled(Box)(({ theme }) => ({
  margin: "12px 0",
  padding: "12px",
  background: "#f0f4ff",
  borderLeft: "3px solid #6c8cff",
  borderRadius: "4px",
  width: "100%",
  // Responsive styles
  [theme.breakpoints.down("sm")]: {
    margin: "10px 0",
    padding: "10px",
    fontSize: "13px",
  },
}));

const TimerText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: "#666",
  fontSize: "14px",
  margin: "16px 0",
  // Responsive styles
  [theme.breakpoints.down("sm")]: {
    fontSize: "13px",
    margin: "12px 0",
  },
}));

const MobileOtpLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // States
  const [step, setStep] = useState(1); // 1: Mobile input, 2: OTP verification
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(0);

  // Demo OTP is 1234
  const DEMO_OTP = "1234";

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Timer effect for OTP resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  // Handle mobile input change
  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setMobile(value);
      setMobileError("");
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setOtpError("");

      // Auto-focus next input field
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  // Handle mobile submit - just for demo
  const handleMobileSubmit = () => {
    if (mobile.length !== 10) {
      setMobileError("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setStep(2);
      setTimer(60);
      setNotification({
        open: true,
        message: "OTP sent successfully",
        severity: "success",
      });
      setLoading(false);
    }, 1000);
  };

  // Handle OTP verification - just for demo
  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 4) {
      setOtpError("Please enter a valid 4-digit OTP");
      return;
    }

    setLoading(true);

    if (otpValue === DEMO_OTP) {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/check-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contactNum: mobile,
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.exists) {
        const loginRes = await fetch(
          `${process.env.REACT_APP_BASE_URL}/user/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone: mobile,
            }),
          }
        );
        const loginData = await loginRes.json();
        console.log(loginData);

        // 9927321330
        if (loginData.isloggedIn) {
          setTimeout(() => {
            if (!loginData.user.isAdmin) {
              dispatch({
                type: "log in",
                data: { ...loginData, type: "music-user" },
              });
              navigate("/user-panel/home");
            }
            if (loginData.user.isAdmin) {
              dispatch({
                type: "log in",
                data: { ...loginData, type: "music-admin" },
              });
              navigate("/admin-panel/orders");
            }
          }, 1000);
        }
      } else {
        navigate("/register", {
          state: {
            contactNum: mobile,
          },
        });
      }
      setNotification({
        open: true,
        message: "Login successful!",
        severity: "success",
      });
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
    setLoading(false);
  };

  // Handle OTP resend - just for demo
  const handleResendOtp = () => {
    setLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setTimer(60);
      setNotification({
        open: true,
        message: "OTP resent successfully",
        severity: "success",
      });
      setLoading(false);
    }, 1000);
  };

  // Handle notification close
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  return (
    <LoginContainer>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <Container maxWidth="xs" sx={{ py: 4 }}>
        <LoginCard elevation={1}>
          {/* Logo */}
          <LogoPlaceholder>
            <img
              src={logo}
              alt="Rivaaz Films Logo"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </LogoPlaceholder>

          {/* Title */}
          <Title>Rivaaz Films</Title>
          <SubTitle>{step === 1 ? "Let's Sign In" : "Verify OTP"}</SubTitle>

          {/* Form */}
          {step === 1 ? (
            <>
              <PhoneInputContainer>
                <CountryCode variant="outlined">
                  <Select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    displayEmpty
                    inputProps={{ "aria-label": "Country Code" }}
                  >
                    <MenuItem value="+91">+91</MenuItem>
                    <MenuItem value="+1">+1</MenuItem>
                    <MenuItem value="+44">+44</MenuItem>
                  </Select>
                </CountryCode>
                <PhoneInput
                  placeholder="Enter phone"
                  variant="outlined"
                  value={mobile}
                  onChange={handleMobileChange}
                  error={Boolean(mobileError)}
                  helperText={mobileError}
                  inputProps={{ maxLength: 10 }}
                  type="tel"
                />
              </PhoneInputContainer>

              <ContinueButton
                onClick={handleMobileSubmit}
                disabled={mobile.length !== 10 || loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Continue"
                )}
              </ContinueButton>

              <FooterText>
                By signing in, you agree to <Link href="#">Terms</Link> and{" "}
                <Link href="#">policy</Link>
              </FooterText>
            </>
          ) : (
            <>
              <Typography sx={{ width: "100%", mb: 1 }}>
                Enter the OTP sent to {countryCode} {mobile}
              </Typography>

              <OtpContainer>
                {otp.map((digit, index) => (
                  <OtpInput
                    key={index}
                    id={`otp-${index}`}
                    type="number"
                    variant="outlined"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    inputProps={{ maxLength: 1 }}
                    onKeyDown={(e) => {
                      // Allow backspace to move to previous input
                      if (e.key === "Backspace" && !digit && index > 0) {
                        document.getElementById(`otp-${index - 1}`).focus();
                      }
                    }}
                    autoFocus={index === 0}
                  />
                ))}
              </OtpContainer>

              {otpError && (
                <Typography
                  color="error"
                  variant="body2"
                  sx={{ width: "100%", mb: 2, textAlign: "center" }}
                >
                  {otpError}
                </Typography>
              )}

              <ContinueButton
                onClick={handleVerifyOtp}
                disabled={otp.some((digit) => !digit) || loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Verify"
                )}
              </ContinueButton>

              <TimerText>
                {timer > 0 ? (
                  `Resend OTP in ${timer} seconds`
                ) : (
                  <Link
                    component="button"
                    variant="body2"
                    onClick={handleResendOtp}
                    disabled={loading}
                    sx={{
                      textDecoration: "none",
                      fontWeight: 600,
                      "&:hover": { textDecoration: "underline" },
                      "&.Mui-disabled": {
                        color: "#aaa",
                      },
                    }}
                  >
                    Resend OTP
                  </Link>
                )}
              </TimerText>

              <Box sx={{ textAlign: "center", width: "100%" }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setStep(1)}
                  sx={{
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Change phone number
                </Link>
              </Box>
            </>
          )}
        </LoginCard>
      </Container>
    </LoginContainer>
  );
};

export default MobileOtpLogin;
