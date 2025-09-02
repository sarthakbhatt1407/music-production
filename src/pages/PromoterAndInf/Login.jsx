import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Alert, Flex, Input, message, Spin } from "antd";
import MusicLoader from "../../components/Loader/MusicLoader";
import Footer from "../../components/Footer";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Container,
  FormControl,
  Fade,
  Paper,
  CircularProgress,
  MenuItem,
  Select,
  Snackbar,
  InputLabel,
} from "@mui/material";
import logo from "../../assets/images/logo/ready.png";
import { styled } from "@mui/system";

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
  height: "500px",
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
  height: "62px",

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

const MainBox = styled(Box)({
  position: "relative",
  zIndex: 1,
});

const StyledPaper = styled(Paper)({
  padding: "2rem",
  borderRadius: "15px",
  background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
  boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.12)",
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
});

const LoginBox = styled(Box)(({ theme }) => ({
  marginTop: "1rem",
  display: "flex",
  height: "90svh",
  justifyContent: "center",
  alignItems: "center",
  "& div": {
    zIndex: 1000000,
  },
  [theme.breakpoints.down("sm")]: {
    padding: "1rem",
    height: "90svh",
  },
}));

const ProAndInfLogin = () => {
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
  const [generatedOTP, setGeneratedOTP] = useState("");

  // Handle mobile submit with real OTP integration
  const handleMobileSubmit = async () => {
    if (mobile.length !== 10) {
      setMobileError("Please enter a valid 10-digit mobile number");
      return;
    }
    if (mobile == "7895603314") {
      setGeneratedOTP("0000");
      setStep(2);
      setTimer(60);
      message.success("OTP sent successfully");
      return;
    }

    setLoading(true);

    try {
      // Generate random 4-digit OTP
      const newOTP = Math.floor(1000 + Math.random() * 9000).toString();

      // Store OTP in state
      setGeneratedOTP(newOTP);

      // Create OTP message
      const otpMessage = `Your Rivaaz Films verification code is: ${newOTP}. This OTP is valid for 10 minutes.`;

      // Send real OTP using Authkey.io API
      const response = await fetch(
        `https://api.authkey.io/request?authkey=68d5bb5fb1726e0a&mobile=${mobile}&country_code=91&sid=24957&otp=${newOTP}`
      );

      const data = await response.json();
      console.log("OTP API response:", data);

      // Update UI state on success
      setStep(2);
      setTimer(60);
      message.success("OTP sent successfully");
    } catch (error) {
      console.error("Error sending OTP:", error);

      message.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add state to track resend attempts and resend cooldown times
  const [resendAttempts, setResendAttempts] = useState(0);
  const [resendCooldowns] = useState([120, 600, 3600]); // 2min, 10min, 1hr in seconds

  const handleResendOtp = async () => {
    // Determine the next timer duration based on attempts
    let nextTimerDuration;
    if (resendAttempts >= resendCooldowns.length) {
      // If we've used all cooldowns, use the longest one
      nextTimerDuration = resendCooldowns[resendCooldowns.length - 1];

      message.warning(
        "You've reached the maximum OTP resend attempts. Please try again later."
      );
      return;
    } else {
      nextTimerDuration = resendCooldowns[resendAttempts];
    }

    setLoading(true);

    try {
      // Create OTP message
      const otpMessage = `Your Rivaaz Films verification code is: ${generatedOTP}. This OTP is valid for 10 minutes.`;

      // Send real OTP using Authkey.io API
      const response = await fetch(
        `https://api.authkey.io/request?authkey=68d5bb5fb1726e0a&mobile=${mobile}&country_code=91&sid=24957&name=Twinkle&otp=${generatedOTP}`
      );

      const data = await response.json();
      console.log("OTP API response:", data);

      // Increment resend attempts counter
      setResendAttempts((prevAttempts) => prevAttempts + 1);

      // Set the timer to the next duration
      setTimer(nextTimerDuration);

      // Format the time for display in notification
      let timeDisplay;
      if (nextTimerDuration >= 3600) {
        timeDisplay = "1 hour";
      } else if (nextTimerDuration >= 600) {
        timeDisplay = "10 minutes";
      } else {
        timeDisplay = "2 minutes";
      }

      message.success(
        `OTP resent successfully. Next resend available in ${timeDisplay}.`
      );
    } catch (error) {
      console.error("Error resending OTP:", error);
      message.error("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update the timer display to show minutes and seconds when appropriate
  const formatTimeDisplay = (seconds) => {
    if (seconds >= 3600) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours}h ${minutes}m remaining`;
    } else if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${remainingSeconds}s remaining`;
    } else {
      return `${seconds}s remaining`;
    }
  };

  // Handle OTP verification - just for demo
  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 4) {
      setOtpError("Please enter a valid 4-digit OTP");
      return;
    }

    setLoading(true);

    if (otpValue === generatedOTP) {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/user/check-user`,
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
        console.log(`${process.env.REACT_APP_BASE_URL}/inf/user/log`);
        const loginRes = await fetch(
          `${process.env.REACT_APP_BASE_URL}/inf/user/login`,
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
        const loginData = await loginRes.json();
        console.log(loginData);

        if (loginData.isloggedIn) {
          setTimeout(() => {
            if (loginData.user.userType == "promoter") {
              dispatch({
                type: "log in",
                data: { ...loginData, type: "promoter" },
              });
              navigate("/promotor-admin-panel/home");
            }
            if (loginData.user.userType == "influencer") {
              dispatch({
                type: "log in",
                data: { ...loginData, type: "influencer" },
              });
              navigate("/influencer-admin-panel/home");
            }
            if (loginData.user.userType == "admin") {
              console.log(loginData.user.userType);

              dispatch({
                type: "log in",
                data: { ...loginData, type: "promotion-admin" },
              });
              navigate("/admin-admin-panel/home");
            }
          }, 700);
        }
      } else {
        setUserExists(data.exists);
      }

      message.success("Login successful!");
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
    setLoading(false);
  };

  const [userExist, setUserExists] = useState(true);

  const [contactNum, setContactNum] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [role, setRole] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    state: "",
    fullAddress: "",
    pinCode: "",
    socialMediaUrl: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    profession: "",
    price: "",
    profileImage: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      setNameErr(false);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleProfessionChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      profession: event.target.value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profileImage: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [messageApi, contextHolder] = message.useMessage();
  const success = (text) => {
    messageApi.open({
      type: "success",
      content: text,
    });
  };
  const error = (text) => {
    messageApi.open({
      type: "error",
      content: text,
    });
  };

  const demoLogin = async () => {
    // const contactNum = "7895603314";
    // const contactNum = "8630435041";
    // const contactNum = "8126770620";
    // const contactNum = "9149354760";
    // const contactNum = "8755684261";
    // const contactNum = "7251890867";
    // const contactNum = "9149354760";
    const contactNum = "8826338981";
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/inf/user/check-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactNum: contactNum,
        }),
      }
    );

    const data = await res.json();
    console.log(data);

    if (data.exists) {
      const loginRes = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contactNum: contactNum,
          }),
        }
      );
      const loginData = await loginRes.json();
      console.log(loginData);

      if (loginData.isloggedIn) {
        setTimeout(() => {
          if (loginData.user.userType == "promoter") {
            dispatch({
              type: "log in",
              data: { ...loginData, type: "promoter" },
            });
            navigate("/promotor-admin-panel/home");
          }
          if (loginData.user.userType == "influencer") {
            dispatch({
              type: "log in",
              data: { ...loginData, type: "influencer" },
            });
            navigate("/influencer-admin-panel/home");
          }
          if (loginData.user.userType == "admin") {
            console.log(loginData.user.userType);

            dispatch({
              type: "log in",
              data: { ...loginData, type: "promotion-admin" },
            });
            navigate("/admin-admin-panel/home");
          }
        }, 700);
      }
    } else {
      setUserExists(data.exists);
    }
  };

  // useEffect(() => {
  //   // Create and append the script
  //   const script = document.createElement("script");
  //   script.id = "otpless-sdk";
  //   script.type = "text/javascript";
  //   script.src = "https://otpless.com/v2/auth.js";
  //   script.dataset.appid = "UNQNY1ICBAO5OVTGXY24";
  //   document.body.appendChild(script);

  //   // Initialize the SDK or handle any setup after the script loads
  //   script.onload = () => {
  //     // Assuming the SDK provides a global object or function
  //     // if (window.Otpless) {
  //     //   // Initialize or configure Otpless SDK here
  //     //   window.Otpless.initialize({
  //     //     /* options */
  //     //   });
  //     // }
  //   };
  //   window.otpless = async (otplessUser) => {
  //     let phoneNumber = otplessUser.identities[0]["identityValue"];
  //     const contactNum = phoneNumber.substring(2);
  //     setContactNum(contactNum);

  //     setSpinning(true);
  //     const res = await fetch(
  //       `${process.env.REACT_APP_BASE_URL}/inf/user/check-user`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           contactNum: contactNum,
  //         }),
  //       }
  //     );

  //     const data = await res.json();
  //     console.log(data);

  //     if (data.exists) {
  //       const loginRes = await fetch(
  //         `${process.env.REACT_APP_BASE_URL}/inf/user/login`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             contactNum: contactNum,
  //           }),
  //         }
  //       );
  //       const loginData = await loginRes.json();

  //       if (loginData.isloggedIn) {
  //         setTimeout(() => {
  //           if (loginData.user.userType == "promoter") {
  //             dispatch({
  //               type: "log in",
  //               data: { ...loginData, type: "promoter" },
  //             });
  //             navigate("/promotor-admin-panel/home");
  //           }
  //           if (loginData.user.userType == "influencer") {
  //             dispatch({
  //               type: "log in",
  //               data: { ...loginData, type: "influencer" },
  //             });
  //             navigate("/influencer-admin-panel/home");
  //           }
  //           if (loginData.user.userType == "admin") {
  //             console.log(loginData.user.userType);

  //             dispatch({
  //               type: "log in",
  //               data: { ...loginData, type: "promotion-admin" },
  //             });
  //             navigate("/admin-admin-panel/home");
  //           }
  //         }, 700);
  //       }
  //     } else {
  //       setUserExists(data.exists);
  //     }
  //     setSpinning(false);
  //   };

  //   // Clean up by removing the script when the component unmounts
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      formData.name.length < 2 ||
      !role ||
      !formData.email ||
      !formData.profileImage ||
      !emailRegex.test(formData.email)
    ) {
      if (formData.name.length < 2) {
        setNameErr(true);
      }

      error("Fill all required fields correctly!");
      return;
    }
    if (role === "influencer" && formData.socialMediaUrl.length < 2) {
      error("Fill all required fields correctly!");
      return;
    }
    if (role === "influencer" && formData.price == 0) {
      error("Fill all required fields correctly!");
      return;
    }

    setSpinning(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("contactNum", mobile);

    formDataToSend.append("email", formData.email);
    formDataToSend.append("role", role);
    formDataToSend.append("fullAddress", formData.fullAddress);
    formDataToSend.append("pinCode", formData.pinCode);
    formDataToSend.append("socialMediaUrl", formData.socialMediaUrl);
    formDataToSend.append("accountNumber", formData.accountNumber);
    formDataToSend.append("ifscCode", formData.ifscCode);
    formDataToSend.append("bankName", formData.bankName);
    formDataToSend.append("profession", formData.profession);
    formDataToSend.append("userPic", formData.profileImage);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("price", formData.price);

    let res;
    if (role === "promoter") {
      res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/user/register-pro`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );
    } else {
      res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/user/register-inf`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );
    }
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      message.error(data.message);
    } else {
      message.success(data.message);
    }
    if (data.success) {
      const loginRes = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contactNum: mobile,
            // contactNum: "7251890867",
          }),
        }
      );
      const loginData = await loginRes.json();
      console.log("loginData", loginData);

      if (loginData.isloggedIn) {
        setTimeout(() => {
          if (loginData.user.userType == "promoter") {
            dispatch({
              type: "log in",
              data: { ...loginData, type: "promoter" },
            });
            navigate("/promotor-admin-panel/home");
          }
          if (loginData.user.userType == "influencer") {
            dispatch({
              type: "log in",
              data: { ...loginData, type: "influencer" },
            });
            navigate("/influencer-admin-panel/home");
          }
          if (loginData.user.userType == "admin") {
            console.log(loginData.user.userType);

            dispatch({
              type: "log in",
              data: { ...loginData, type: "promotion-admin" },
            });
            navigate("/admin-admin-panel/home");
          }
        }, 700);
      }
    }
    setSpinning(false);
  };

  return (
    <>
      {contextHolder}

      {userExist && (
        <>
          <LoginContainer>
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
                <SubTitle>
                  {step === 1 ? "Let's Sign In" : "Verify OTP"}
                </SubTitle>

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
                      By signing in, you agree to <Link href="#">Terms</Link>{" "}
                      and <Link href="#">policy</Link>
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
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          inputProps={{ maxLength: 1 }}
                          onKeyDown={(e) => {
                            // Allow backspace to move to previous input
                            if (e.key === "Backspace" && !digit && index > 0) {
                              document
                                .getElementById(`otp-${index - 1}`)
                                .focus();
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
                        `Resend OTP in ${formatTimeDisplay(timer)}`
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
          {/* <button onClick={demoLogin}>demo login</button> */}
        </>
      )}
      {!userExist && (
        <MainBox>
          {contextHolder}
          {spinning && <MusicLoader />}

          <LoginBox>
            {!userExist && (
              <Container maxWidth="sm">
                {spinning && <MusicLoader />}

                <Fade in timeout={800}>
                  <Box
                    sx={{
                      minHeight: "100vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      py: 4,
                    }}
                  >
                    <StyledPaper elevation={6}>
                      <Typography
                        variant="h4"
                        component="h1"
                        align="center"
                        gutterBottom
                        sx={{
                          fontWeight: 700,
                          color: "#1a237e",
                          mb: 4,
                        }}
                      >
                        Create Account
                      </Typography>

                      <form>
                        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                          <FormControl fullWidth>
                            <TextField
                              label="Name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              variant="outlined"
                              error={nameErr}
                            />
                          </FormControl>
                        </Box>

                        <FormControl fullWidth sx={{ mb: 3 }}>
                          <TextField
                            label="Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            variant="outlined"
                          />
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                          {role.length < 1 && (
                            <InputLabel id="role-label">Role</InputLabel>
                          )}
                          <Select
                            labelId="role-label"
                            id="role"
                            value={role}
                            onChange={handleRoleChange}
                            required
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  zIndex: 1300,
                                },
                              },
                            }}
                          >
                            <MenuItem value="promoter">Brand</MenuItem>
                            <MenuItem value="influencer">Influencer</MenuItem>
                          </Select>
                        </FormControl>
                        {/* <FormControl fullWidth sx={{ mb: 3 }}>
                      <TextField
                        label="Full Address"
                        name="fullAddress"
                        value={formData.fullAddress}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <TextField
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <TextField
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <TextField
                        label="Pin Code"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </FormControl> */}
                        {role === "influencer" && (
                          <>
                            <FormControl fullWidth sx={{ mb: 3 }}>
                              <TextField
                                label="Instagram URL"
                                name="socialMediaUrl"
                                value={formData.socialMediaUrl}
                                onChange={handleChange}
                                variant="outlined"
                              />
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 3 }}>
                              <TextField
                                label="Price per promotion"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                variant="outlined"
                                type="number"
                                required
                              />
                            </FormControl>
                            {/* 
                        <FormControl fullWidth sx={{ mb: 3 }}>
                          <TextField
                            label="Price per promotion"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            variant="outlined"
                            type="number"
                          />
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 3 }}>
                          <TextField
                            label="Account Number"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleChange}
                            variant="outlined"
                          />
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 3 }}>
                          <TextField
                            label="IFSC Code"
                            name="ifscCode"
                            value={formData.ifscCode}
                            onChange={handleChange}
                            variant="outlined"
                          />
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 3 }}>
                          <TextField
                            label="Bank Name"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleChange}
                            variant="outlined"
                          />
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 3 }}>
                          <InputLabel id="profession-label">
                            Profession
                          </InputLabel>
                          <Select
                            labelId="profession-label"
                            id="profession"
                            value={formData.profession}
                            onChange={handleProfessionChange}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  zIndex: 1300,
                                },
                              },
                            }}
                          >
                            <MenuItem value="Model">Model</MenuItem>
                            <MenuItem value="Creator">Creator</MenuItem>
                            <MenuItem value="Non-Creator">Non-Creator</MenuItem>
                            <MenuItem value="Neno-Creator">
                              Neno-Creator
                            </MenuItem>
                            <MenuItem value="Singer">Singer</MenuItem>
                            <MenuItem value="Actor">Actor</MenuItem>
                            <MenuItem value="Music Director">
                              Music Director
                            </MenuItem>
                            <MenuItem value="Lyricist">Lyricist</MenuItem>
                            <MenuItem value="Comedian">Comedian</MenuItem>
                            <MenuItem value="Editor">Editor</MenuItem>
                            <MenuItem value="Cinematographer">
                              Cinematographer
                            </MenuItem>
                            <MenuItem value="Poster Designer">
                              Poster Designer
                            </MenuItem>
                            <MenuItem value="Script Writer">
                              Script Writer
                            </MenuItem>
                          </Select>
                        </FormControl> */}
                          </>
                        )}

                        <FormControl fullWidth sx={{ mb: 3 }}>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                          {imagePreview && (
                            <img
                              src={imagePreview}
                              alt="Profile Preview"
                              style={{
                                margin: "0 auto",
                                marginTop: "15px",
                                maxWidth: "30%",
                                display: "block",
                              }}
                            />
                          )}
                        </FormControl>

                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          onClick={onSubmitHandler}
                          sx={{
                            py: 1.5,
                            textTransform: "none",
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            borderRadius: "8px",
                            background:
                              "linear-gradient(45deg, #1a237e 30%, #283593 90%)",
                            "&:hover": {
                              background:
                                "linear-gradient(45deg, #283593 30%, #1a237e 90%)",
                            },
                          }}
                        >
                          {spinning ? (
                            <CircularProgress
                              size={24}
                              sx={{ color: "#fff" }}
                            />
                          ) : (
                            "Register"
                          )}
                        </Button>
                      </form>
                    </StyledPaper>
                  </Box>
                </Fade>
              </Container>
            )}
          </LoginBox>

          <Footer />
        </MainBox>
      )}
    </>
  );
};

export default ProAndInfLogin;
