import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Alert, Flex, Input, message, Spin } from "antd";
import MusicLoader from "./../components/Loader/MusicLoader";
import Footer from "./../components/Footer";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  FormControl,
  Fade,
  Paper,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import WebNav from "./../components/Navbars/WebNav";

const MainBox = styled.div`
  position: relative;
  z-index: 1;
`;
const StyledPaper = styled.div`
  padding: 2rem;
  border-radius: 15px;
  background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.12);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const LoginBox = styled.div`
  margin-top: 1rem;
  display: flex;
  height: 90svh;
  justify-content: center;
  align-items: center;

  div {
    z-index: 1000000;
  }
  @media only screen and (min-width: 0px) and (max-width: 700px) {
    padding: 1rem;
    height: 90svh;
  }
`;

const MusicDistLogin = () => {
  const [userExist, setUserExists] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    const contactNum = "8126770620";
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/check-user`,
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
        `${process.env.REACT_APP_BASE_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: contactNum,
          }),
        }
      );
      const loginData = await loginRes.json();
      console.log(loginData);

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
      setUserExists(data.exists);
    }
  };

  useEffect(() => {
    // Create and append the script
    const script = document.createElement("script");
    script.id = "otpless-sdk";
    script.type = "text/javascript";
    script.src = "https://otpless.com/v2/auth.js";
    script.dataset.appid = "UNQNY1ICBAO5OVTGXY24";
    document.body.appendChild(script);

    // Initialize the SDK or handle any setup after the script loads
    script.onload = () => {
      // Assuming the SDK provides a global object or function
      // if (window.Otpless) {
      //   // Initialize or configure Otpless SDK here
      //   window.Otpless.initialize({
      //     /* options */
      //   });
      // }
    };
    window.otpless = async (otplessUser) => {
      let phoneNumber = otplessUser.identities[0]["identityValue"];
      const contactNum = phoneNumber.substring(2);
      setContactNum(contactNum);

      setSpinning(true);
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/check-user`,
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
          `${process.env.REACT_APP_BASE_URL}/user/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone: contactNum,
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
            contactNum: contactNum,
          },
        });
      }
      setSpinning(false);
    };

    // Clean up by removing the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
    formDataToSend.append("contactNum", contactNum);
    // formDataToSend.append("contactNum", "7251890867");
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
            contactNum: contactNum,
            // contactNum: "7251890867",
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
    }
    setSpinning(false);
  };
  //
  return (
    <MainBox>
      {contextHolder}
      {spinning && <MusicLoader />}

      <LoginBox>
        {userExist && (
          <>
            <div
              style={{
                zIndex: "1000",
              }}
              id="otpless-login-page"
            ></div>
            {/* <button onClick={demoLogin}>demo login</button> */}
          </>
        )}
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
                        <CircularProgress size={24} sx={{ color: "#fff" }} />
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
  );
};

export default MusicDistLogin;
