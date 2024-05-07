import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import MusicLoader from "../components/Loader/MusicLoader";
import { notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
const OuterBox = styled.div`
  background-color: #f7f7f7;
  height: 95svh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;

const MainBox = styled.div`
  background-color: white;
  width: 60vw;
  box-shadow: 0.1rem 0.1rem 2rem rgba(161, 161, 161, 0.28);
  border-radius: 0.5rem;
  height: 50vh;
  height: fit-content;
  display: grid;
  grid-template-columns: 1.5fr 2fr;

  @media only screen and (max-width: 700px) {
    /* display: none; */
    overflow-y: scroll;
    grid-template-columns: 1fr;
    width: 95vw;
    height: 96svh;
  }
`;

const LeftDivAni = keyframes`
    0%{  transform: translateX(100%);
        z-index: 100;
        opacity: 0;

    }
    100%{
        transform: translateX(0);
        opacity: 1; z-index: 1;
    }
`;
const RightDivAni = keyframes`
    
    0%{    transform: translateX(-50%);
        z-index: -1;
        opacity: 0;

    }
    30%{
        z-index: -1;
    }
    100%{
        transform: translateX(0);
        opacity: 1;
        z-index: 1;
    }
`;
const LeftDiv = styled.div`
  color: white;
  background: rgb(235, 76, 13);
  background: linear-gradient(
    162deg,
    rgba(235, 76, 13, 1) 0%,
    rgba(235, 72, 7, 1) 46%,
    rgba(233, 70, 6, 0.9080882352941176) 100%
  );
  background: rgb(235, 76, 13);
  background: linear-gradient(
    162deg,
    rgba(235, 76, 13, 1) 0%,
    rgba(235, 72, 7, 1) 46%,
    rgba(233, 70, 6, 0.9080882352941176) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 0 2rem;
  transition: all 1s;
  animation: ${LeftDivAni} 0.6s;
  word-wrap: break-word;
  h1 {
    letter-spacing: 0.09rem;
    font-weight: bold;
  }
  p {
    font-size: 1.1rem;
    font-size: 400;
    letter-spacing: 0.09rem;
    text-align: center;
  }
  button {
    background-color: transparent;
    margin: 0 auto;
    border: 1px solid white;
    border-radius: 1rem;
    padding: 1rem 3rem;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-weight: bold;
    color: white;
  }
  @media only screen and (max-width: 700px) {
    padding: 1rem 0.5rem;
    gap: 0.2rem;
    h1 {
      font-size: 2.2rem;
    }
    p {
      font-size: 1.2rem;
    }
    button {
      padding: 1rem 2rem;
      font-size: 1rem;
    }
  }
`;
const RightDiv = styled.div`
  margin: 0.4rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  animation: ${RightDivAni} 0.6s;
  padding: 1rem;
  h2 {
    font-size: 2rem;
    margin: 0;
  }
  h3 {
    color: #cacaca;
    font-size: 1.3rem;
    text-align: center;
    font-weight: 400;
  }
  @media only screen and (max-width: 700px) {
    padding: 1rem;
  }
`;

const EmailVerificationBox = styled.div`
  display: flex;
  width: 90%;
  height: fit-content;

  gap: 1rem;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  position: relative;

  span {
    cursor: pointer;
    color: #df8fa1;
  }
  p {
    width: 100%;
    color: rgb(221, 57, 57);
    margin-top: -1rem;
    letter-spacing: 0.08rem;
  }
  a {
    text-decoration: none;
  }
`;
const LoaderBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 0.6rem;
  z-index: 2;
  background-color: #f9f8f852;
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(166, 166, 166, 0.3);
  border-radius: 5px;
  padding: 0px 10px;
  transition: all 200ms ease-in-out;
  margin-bottom: 5px;

  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid red;
  }
`;
const SubmitButton = styled.button`
  width: 100%;
  max-width: 150px;
  padding: 10px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: all 240ms ease-in-out;
  background: linear-gradient(58deg, red 20%, red 100%);

  &:hover {
    filter: brightness(1.03);
  }
`;

const DisabledBtn = styled.button`
  width: 100%;
  max-width: 150px;
  padding: 10px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: all 240ms ease-in-out;
  background: #dbdbdb;

  &:hover {
    filter: brightness(1.03);
  }
`;
const Span = styled.span`
  text-transform: capitalize;
`;
const PhotosDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  @media only screen and (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Register = () => {
  const [api, contextHolderNot] = notification.useNotification({
    duration: 1.5,
  });
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Fill all require fields.",
    });
  };
  const [messageApi, contextHolder] = message.useMessage();
  const success = (msg) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };
  const error = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const profilePicProps = {
    beforeUpload: (file) => {
      const isValid =
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg";
      if (!isValid) {
        message.error(`Only .png .jpeg .jpg is allowed`);
      }
      return isValid || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      let img;
      if (info.fileList[0]) {
        img = info.fileList[0].originFileObj;
        setInpFields({ ...inpFields, userPic: img });
        allFieldChecker();
      } else {
        setInpFields({ ...inpFields, userPic: null });
      }
    },
  };
  const signProps = {
    beforeUpload: (file) => {
      const isValid =
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg";
      if (!isValid) {
        message.error(`Only .png .jpeg .jpg is allowed`);
      }
      return isValid || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      let img;
      if (info.fileList[0]) {
        img = info.fileList[0].originFileObj;
        setInpFields({ ...inpFields, sign: img });
        allFieldChecker();
      } else {
        setInpFields({ ...inpFields, sign: null });
      }
    },
  };
  const [emailVer, setEmailVer] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [mobileErr, setMobileErr] = useState(false);
  const [cityErr, setCityErr] = useState(false);
  const [stateErr, setStateErr] = useState(false);
  const [channelUrlErr, setChannelUrlErr] = useState(false);
  const [countryErr, setCountryErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [allValid, setAllValid] = useState(false);
  const [otpErr, setOtpErr] = useState(false);
  const [otpText, setOtpText] = useState("");
  const [serverErr, setServerErr] = useState(false);
  const [serverTxt, setServerTxt] = useState("");
  const [showPic, setShowPic] = useState(true);
  const [resendShow, setResendShow] = useState(false);
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const defaultFields = {
    fullName: "",
    email: "",
    password: "",
    contactNum: "",
    otp: "",
    city: "",
    state: "",
    country: "",
    channelUrl: "",
    sign: null,
    userPic: null,
  };
  const [inpFields, setInpFields] = useState(defaultFields);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const allFieldChecker = (id) => {
    setAllValid(false);
    const fullName = document.querySelector("#fullName").value;
    const email = document.querySelector("#email").value;
    const contactNum = document.querySelector("#contactNum").value;
    const password = document.querySelector("#password").value;
    const city = document.querySelector("#city").value;
    const state = document.querySelector("#state").value;
    const country = document.querySelector("#country").value;
    const channelUrl = document.querySelector("#channelUrl").value;

    // if (fullName.length < 4) {
    //   setNameErr(true);
    //   return;
    // }
    // if (!validateEmail(email)) {
    //   setEmailErr(true);
    //   return;
    // }

    // if (contactNum.length < 10) {
    //   setMobileErr(true);
    //   return;
    // }
    // if (password.trim().length < 8) {
    //   setPasswordErr(true);
    //   return;
    // }
    if (
      fullName.length > 4 &&
      city.length > 3 &&
      country.length > 3 &&
      channelUrl.length > 9 &&
      state.length > 3 &&
      validateEmail(email) &&
      contactNum.length > 9 &&
      inpFields.sign != null &&
      inpFields.userPic != null &&
      password.trim().length > 5
    ) {
      setAllValid(true);
      return;
    }
    return;
  };
  const onBlurHandler = (e) => {
    const id = e.target.id;
    const fullName = document.querySelector("#fullName").value;
    const email = document.querySelector("#email").value;
    const contactNum = document.querySelector("#contactNum").value;
    const password = document.querySelector("#password").value;
    const city = document.querySelector("#city").value;
    const state = document.querySelector("#state").value;
    const country = document.querySelector("#country").value;
    const channelUrl = document.querySelector("#channelUrl").value;

    if (id === "fullName" && fullName.length < 4) {
      setNameErr(true);
      return;
    }
    if (id === "city" && city.length < 4) {
      setCityErr(true);
      return;
    }
    if (id === "channelUrl" && channelUrl.length < 10) {
      setChannelUrlErr(true);
      return;
    }
    if (id === "country" && country.length < 4) {
      setCountryErr(true);
      return;
    }
    if (id === "state" && state.length < 4) {
      setStateErr(true);
      return;
    }
    if (id === "email" && !validateEmail(email)) {
      setEmailErr(true);
      return;
    }

    if (id === "contactNum" && contactNum.length < 10) {
      setMobileErr(true);
      return;
    }
    if (id === "password" && password.trim().length < 6) {
      setPasswordErr(true);
      return;
    }

    // allFieldChecker();
  };

  const onChangeHandler = (e) => {
    const id = e.target.id;
    const val = e.target.value;
    allFieldChecker(id);
    if (id === "fullName") {
      setNameErr(false);
    }
    if (id === "city") {
      setCityErr(false);
    }
    if (id === "channelUrl") {
      setChannelUrlErr(false);
    }
    if (id === "country") {
      setCountryErr(false);
    }
    if (id === "state") {
      setStateErr(false);
    }
    if (id === "email") {
      setServerErr(false);
      setServerTxt("");
      setEmailErr(false);
    }
    if (id === "contactNum") {
      setMobileErr(false);
    }
    if (id === "password") {
      setPasswordErr(false);
    }
    if (id === "otp") {
      setOtpErr(false);
    }
    setInpFields({ ...inpFields, [id]: val });
  };

  const resendOtp = async () => {
    setIsLoading(true);
    const reslt = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/send-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inpFields.email,
        }),
      }
    );
    const data = await reslt.json();
    setIsLoading(false);
  };
  const onSubmitHandler = async () => {
    if (!allValid) {
      return;
    }
    setIsLoading(true);

    const reslt = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/send-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inpFields.email,
        }),
      }
    );
    const data = await reslt.json();
    if (!reslt.ok) {
      setServerErr(true);
      error(data.message);
      setServerTxt(data.message);
    }
    // alert(data.message);
    console.log(data);
    if (data.sent) {
      success("Otp sent on email.");
      const allInp = document.querySelectorAll(".inputField");
      for (const ele of allInp) {
        ele.disabled = true;
      }
      setShowPic(false);
      setShowOtp(true);
    }
    setIsLoading(false);
  };

  const otpVerifier = async () => {
    setIsLoading(true);
    const reslt = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/verify-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otpInp: Number(inpFields.otp),
          email: inpFields.email,
        }),
      }
    );
    const data = await reslt.json();
    // alert(data.message);
    console.log(data);
    if (data.valid === false) {
      setOtpText(data.message);
      setOtpErr(true);
    }
    if (data.valid) {
      const formData = new FormData();

      formData.append("name", inpFields.fullName);
      formData.append("email", inpFields.email);
      formData.append("password", inpFields.password);
      formData.append("phone", inpFields.contactNum);
      formData.append("city", inpFields.city);
      formData.append("state", inpFields.state);
      formData.append("country", inpFields.country);
      formData.append("channelUrl", inpFields.channelUrl);
      formData.append("sign", inpFields.sign);
      formData.append("userPic", inpFields.userPic);

      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/user/signup`, {
        method: "POST",
        body: formData,
      });
      const resData = await res.json();
      console.log(resData);
      if (resData.success) {
        setState({ ...state, open: true });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      {" "}
      {contextHolderNot}
      {contextHolder}
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%", top: 0, fontSize: "1.6rem" }}
        >
          Sign up successfull. Kindly login now
        </Alert>
      </Snackbar>
      <OuterBox>
        {" "}
        <MainBox>
          <LeftDiv>
            {/* <img src={logo} alt="" /> */}
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info.
            </p>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign In
            </button>
          </LeftDiv>
          <RightDiv>
            <h2>Create Account</h2>
            {emailVer && (
              <EmailVerificationBox>
                {isLoading && (
                  <LoaderBox>
                    <MusicLoader />
                  </LoaderBox>
                )}
                <Input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="inputField"
                  placeholder="Full Name"
                  onChange={onChangeHandler}
                  value={inpFields.fullName}
                  onBlur={onBlurHandler}
                  style={{
                    border: `${
                      nameErr
                        ? "1px solid #d72020"
                        : "1px solid rgba(166, 166, 166, 0.3)"
                    }`,
                  }}
                />
                {nameErr && <p>Invalid Name</p>}
                <Input
                  type="text"
                  className="inputField"
                  name="email"
                  id="email"
                  onChange={onChangeHandler}
                  placeholder="Email"
                  onBlur={onBlurHandler}
                  value={inpFields.email}
                  style={{
                    border: `${
                      emailErr
                        ? "1px solid #d72020"
                        : "1px solid rgba(166, 166, 166, 0.3)"
                    }`,
                  }}
                />
                {emailErr && <p>Invalid Email</p>}
                <Input
                  type="number"
                  name=""
                  className="inputField"
                  id="contactNum"
                  onBlur={onBlurHandler}
                  onChange={onChangeHandler}
                  placeholder="Mobile number"
                  value={inpFields.contactNum}
                  style={{
                    border: `${
                      mobileErr
                        ? "1px solid #d72020"
                        : "1px solid rgba(166, 166, 166, 0.3)"
                    }`,
                  }}
                />{" "}
                {mobileErr && <p>Invalid Contact Number</p>}
                <Input
                  type="text"
                  name=""
                  className="inputField"
                  id="city"
                  onBlur={onBlurHandler}
                  onChange={onChangeHandler}
                  placeholder="City"
                  value={inpFields.city}
                  style={{
                    border: `${
                      cityErr
                        ? "1px solid #d72020"
                        : "1px solid rgba(166, 166, 166, 0.3)"
                    }`,
                  }}
                />{" "}
                {cityErr && <p>Invalid City Name</p>}
                <Input
                  type="text"
                  name=""
                  className="inputField"
                  id="state"
                  onBlur={onBlurHandler}
                  onChange={onChangeHandler}
                  placeholder="State"
                  value={inpFields.state}
                  style={{
                    border: `${
                      stateErr
                        ? "1px solid #d72020"
                        : "1px solid rgba(166, 166, 166, 0.3)"
                    }`,
                  }}
                />{" "}
                {stateErr && <p>Invalid State Name</p>}
                <Input
                  type="text"
                  name=""
                  className="inputField"
                  id="country"
                  onBlur={onBlurHandler}
                  onChange={onChangeHandler}
                  placeholder="Country"
                  value={inpFields.country}
                  style={{
                    border: `${
                      countryErr
                        ? "1px solid #d72020"
                        : "1px solid rgba(166, 166, 166, 0.3)"
                    }`,
                  }}
                />{" "}
                {countryErr && <p>Invalid Country Name</p>}
                <Input
                  type="text"
                  name=""
                  className="inputField"
                  id="channelUrl"
                  onBlur={onBlurHandler}
                  onChange={onChangeHandler}
                  placeholder="Channel Url"
                  value={inpFields.channelUrl}
                  style={{
                    border: `${
                      channelUrlErr
                        ? "1px solid #d72020"
                        : "1px solid rgba(166, 166, 166, 0.3)"
                    }`,
                  }}
                />{" "}
                {channelUrlErr && <p>Invalid URL </p>}
                {showPic && (
                  <PhotosDiv>
                    <Upload
                      method="get"
                      listType="picture"
                      {...profilePicProps}
                      maxCount={1}
                    >
                      <Button icon={<UploadOutlined />}>
                        Upload Profile Photo
                      </Button>
                    </Upload>
                    <Upload
                      method="get"
                      listType="picture"
                      {...signProps}
                      maxCount={1}
                    >
                      <Button icon={<UploadOutlined />}>
                        Upload Signature
                      </Button>
                    </Upload>
                  </PhotosDiv>
                )}
                <Input
                  type="password"
                  name=""
                  className="inputField"
                  id="password"
                  onBlur={onBlurHandler}
                  value={inpFields.password}
                  onChange={onChangeHandler}
                  placeholder="Password"
                  style={{
                    border: `${
                      passwordErr
                        ? "1px solid #d72020"
                        : "1px solid rgba(166, 166, 166, 0.3)"
                    }`,
                  }}
                />{" "}
                {passwordErr && (
                  <p>Password is too short (minimun 6 charcters.)</p>
                )}
                {serverErr && <p>{serverTxt}</p>}
                {showOtp && (
                  <>
                    <Input
                      type="text"
                      name=""
                      id="otp"
                      onChange={onChangeHandler}
                      placeholder="Enter one time password"
                      data-aos="zoom-in"
                      value={inpFields.otp}
                      style={{
                        border: `${
                          otpErr
                            ? "1px solid #d72020"
                            : "1px solid rgba(166, 166, 166, 0.3)"
                        }`,
                      }}
                    />
                    {otpErr && <p>{otpText}</p>}
                    <span data-aos="zoom-in" onClick={resendOtp}>
                      Resend OTP
                    </span>
                  </>
                )}
                {showOtp && (
                  <SubmitButton onClick={otpVerifier}>Submit</SubmitButton>
                )}
                {!showOtp && allValid && (
                  <SubmitButton onClick={onSubmitHandler}>Submit</SubmitButton>
                )}
                {!showOtp && !allValid && <DisabledBtn>Submit</DisabledBtn>}
              </EmailVerificationBox>
            )}
          </RightDiv>
        </MainBox>
      </OuterBox>
    </>
  );
};

export default Register;
