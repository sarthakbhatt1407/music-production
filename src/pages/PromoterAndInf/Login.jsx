import React, { useEffect, useState } from "react";

import styled from "styled-components";
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
  Container,
  FormControl,
  Fade,
  Paper,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";

const MainBox = styled.div`
  position: relative;
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
  height: 85svh;
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

const ProAndInfLogin = () => {
  const [userExist, setUserExists] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [contactNum, setContactNum] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [nameErr, setNameErr] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
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

  const [stateErr, setStateErr] = useState(false);
  const defaultField = {
    name: "",
    locality: "",
    city: "",
    state: "",
  };

  const [fields, setFields] = useState(defaultField);
  const onChangeHandler = (e) => {
    const val = e.target.value;
    const id = e.target.id;
    if (id === "name") {
      setNameErr(false);
    }

    setFields({ ...fields, [id]: val });
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

        if (loginData.isloggedIn) {
          setTimeout(() => {
            // dispatch({ type: "log in", user: loginData.user, city: city });
            navigate("/");
          }, 700);
        }
      } else {
        setUserExists(data.exists);
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
    if (formData.name.length < 2) {
      if (formData.name.length < 2) {
        setNameErr(true);
      }

      error("Fill all required fields! ");
      return;
    }
    setSpinning(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/inf/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          contactNum: contactNum,
          email: formData.email,
        }),
      }
    );
    const data = await res.json();
    console.log(data);

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
          }),
        }
      );
      const loginData = await loginRes.json();
      console.log(loginData);

      if (loginData.isloggedIn) {
        setTimeout(() => {
          // dispatch({
          //   type: "log in",
          //   user: loginData.user,
          // });
          navigate("/promotor-admin-panel/new-order");
        }, 700);
      }
    }
    setSpinning(false);
  };
  return (
    <MainBox>
      {contextHolder}
      {spinning && <MusicLoader />}
      <LoginBox>
        {userExist && (
          <div
            style={{
              zIndex: "1000",
            }}
            id="otpless-login-page"
          ></div>
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
                          label="First Name"
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
        )}{" "}
      </LoginBox>

      <Footer />
    </MainBox>
  );
};

export default ProAndInfLogin;
