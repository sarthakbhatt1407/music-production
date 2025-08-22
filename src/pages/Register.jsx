import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import MusicLoader from "../components/Loader/MusicLoader";
import { notification, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Country, State } from "country-state-city";
import { Button, message, Upload } from "antd";
import { Input as IN } from "antd";
const OuterBox = styled.div`
  background-color: #f7f7f7;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;

  @media only screen and (max-width: 1000px) {
    height: fit-content;
  }
`;

const MainBox = styled.div`
  background-color: white;
  width: fit-content;
  box-shadow: 0.1rem 0.1rem 2rem rgba(161, 161, 161, 0.28);
  border-radius: 0.5rem;

  display: flex;

  @media only screen and (max-width: 700px) {
    /* display: none; */
    overflow-y: scroll;
    grid-template-columns: 1fr;
    width: 90vw;
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
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    setCountryList(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStateList(State.getStatesOfCountry(selectedCountry));
    } else {
      setStateList([]);
    }
  }, [selectedCountry]);
  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);

    // Find full country name
    const countryObj = countryList.find((c) => c.isoCode === countryCode);
    const countryName = countryObj ? countryObj.name : countryCode;
    console.log(countryName);
    setInpFields((prev) => ({ ...prev, country: countryName, state: "" }));
    setSelectedState("");
  };

  const handleStateChange = (stateCode) => {
    setSelectedState(stateCode);

    // Find full state name
    const stateObj = stateList.find(
      (s) => s.name === stateCode || s.isoCode === stateCode
    );
    const stateName = stateObj ? stateObj.name : stateCode;
    console.log(stateName);

    setInpFields({ ...inpFields, state: stateName });
  };
  const location = useLocation();
  const contactNum = location.state?.contactNum;

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
      let isValid =
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg";
      if (!isValid) {
        message.error(`Only .png .jpeg .jpg is allowed`);
      }
      const fileMb = file.size / 1024 ** 2;
      if (fileMb > 2) {
        message.error(`Photo size is greater than 2MB.`);
        isValid = false;
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
      let isValid =
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg";
      if (!isValid) {
        message.error(`Only .png .jpeg .jpg is allowed`);
      }
      const fileMb = file.size / 1024 ** 2;
      if (fileMb > 2) {
        message.error(`Photo size is greater than 2MB.`);
        isValid = false;
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
  const [pincodeErr, setPincodeErr] = useState(false);
  const [addressErr, setAddressErr] = useState(false);
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
    password: "*******",
    contactNum: contactNum,
    otp: "",
    city: "",
    state: "",
    country: "",
    channelUrl: "",
    sign: null,
    userPic: null,
    pincode: "",
    address: "",
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
    // const password = document.querySelector("#password").value;
    const city = document.querySelector("#city").value;
    // const state = document.querySelector("#state").value;
    // const country = document.querySelector("#country").value;
    const channelUrl = document.querySelector("#channelUrl").value;
    const address = document.querySelector("#address").value;
    const pincode = document.querySelector("#pincode").value;

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
    console.log("co", inpFields, inpFields.country.length > 3);
    console.log("st", inpFields.state.length > 3);

    if (
      fullName.length > 4 &&
      city.length > 3 &&
      pincode.toString().length == 6 &&
      address.length > 4 &&
      inpFields.country.length > 3 &&
      channelUrl.length > 9 &&
      inpFields.state.length > 3 &&
      validateEmail(email) &&
      contactNum.length > 9 &&
      inpFields.sign != null &&
      inpFields.userPic != null
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
    // const password = document.querySelector("#password").value;
    const city = document.querySelector("#city").value;
    // const state = document.querySelector("#state").value;
    // const country = document.querySelector("#country").value;
    const channelUrl = document.querySelector("#channelUrl").value;
    const address = document.querySelector("#address").value;
    const pincode = document.querySelector("#pincode").value;

    if (id === "fullName" && fullName.length < 4) {
      setNameErr(true);
      return;
    }
    if (id === "city" && city.length < 4) {
      setCityErr(true);
      return;
    }
    if (id === "pincode" && pincode.toString().length < 6) {
      setCityErr(true);
      return;
    }
    if (id === "address" && address.length < 4) {
      setAddressErr(true);
      return;
    }
    if (id === "channelUrl" && channelUrl.length < 10) {
      setChannelUrlErr(true);
      return;
    }
    if (id === "country" && inpFields.country.length < 4) {
      setCountryErr(true);
      return;
    }
    if (id === "state" && inpFields.state.length < 4) {
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
    if (id === "pincode") {
      if (val.toString().length > 6) {
        return;
      }
      setInpFields({ ...inpFields, [id]: val });
      setCityErr(false);
      return;
    }
    if (id === "channelUrl") {
      setChannelUrlErr(false);
    }
    if (id === "address") {
      setAddressErr(false);
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
    if (!allValid) {
      return;
    }
    setIsLoading(true);

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
    formData.append("address", inpFields.address);
    formData.append("pincode", inpFields.pincode);
    //

    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/user/signup`, {
      method: "POST",
      body: formData,
    });
    const resData = await res.json();

    if (resData.success) {
      setState({ ...state, open: true });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }

    setIsLoading(false);
  };

  return (
    <>
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
          sx={{ width: "100%", top: 0, fontSize: "1rem" }}
        >
          Sign up successfull. Kindly login now
        </Alert>
      </Snackbar>
      <OuterBox>
        {" "}
        <MainBox>
          {/* <LeftDiv>
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
          </LeftDiv> */}
          <RightDiv>
            <h2>Create Account</h2>
            {emailVer && (
              <EmailVerificationBox>
                {isLoading && (
                  <LoaderBox>
                    <MusicLoader />
                  </LoaderBox>
                )}
                <IN
                  className="inputField inp"
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Label Name"
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
                <IN
                  className="inputField inp"
                  type="text"
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
                <IN
                  className="inputField inp"
                  type="number"
                  name=""
                  id="contactNum"
                  disabled={contactNum ? true : false}
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
                <IN
                  className="inputField inp"
                  type="text"
                  name=""
                  id="address"
                  onBlur={onBlurHandler}
                  onChange={onChangeHandler}
                  placeholder="Address"
                  value={inpFields.address}
                  style={{
                    border: `${
                      addressErr
                        ? "1px solid #d72020"
                        : "1px solid rgba(166, 166, 166, 0.3)"
                    }`,
                  }}
                />{" "}
                {addressErr && <p>Invalid address</p>}
                <IN
                  className="inputField inp"
                  type="number"
                  name=""
                  id="pincode"
                  onBlur={onBlurHandler}
                  onChange={onChangeHandler}
                  placeholder="Pincode"
                  value={inpFields.pincode}
                  style={{
                    border: `${
                      pincodeErr
                        ? "1px solid #d72020"
                        : "1px solid rgba(166, 166, 166, 0.3)"
                    }`,
                  }}
                />{" "}
                {pincodeErr && <p>Invalid Pincode</p>}
                <IN
                  className="inputField inp"
                  type="text"
                  name=""
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
                <div style={{ width: "100%" }}>
                  <label
                    style={{
                      color: "#C8C8C8",
                      fontSize: ".8rem",
                      letterSpacing: ".06rem",
                      marginLeft: ".3rem",
                    }}
                  >
                    Country
                  </label>
                  <Select
                    showSearch
                    style={{ width: "100%", marginBottom: 8 }}
                    placeholder="Select country"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {countryList.map((country) => (
                      <Select.Option
                        key={country.isoCode}
                        value={country.isoCode}
                      >
                        {country.name}
                      </Select.Option>
                    ))}
                  </Select>
                  {countryErr && <p>Invalid Country Name</p>}
                </div>
                <div style={{ width: "100%" }}>
                  <label
                    style={{
                      color: "#C8C8C8",
                      fontSize: ".8rem",
                      letterSpacing: ".06rem",
                      marginLeft: ".3rem",
                    }}
                  >
                    State
                  </label>
                  <Select
                    showSearch
                    style={{ width: "100%", marginBottom: 8 }}
                    placeholder="Select state"
                    value={selectedState}
                    onChange={handleStateChange}
                    disabled={!selectedCountry}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {stateList.map((state) => (
                      <Select.Option key={state.isoCode} value={state.name}>
                        {state.name}
                      </Select.Option>
                    ))}
                  </Select>
                  {stateErr && <p>Invalid State Name</p>}
                </div>
                <IN
                  className="inputField inp"
                  type="text"
                  name=""
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
                        Upload Channel Logo(Max. size 2MB)
                      </Button>
                    </Upload>
                    <Upload
                      method="get"
                      listType="picture"
                      {...signProps}
                      maxCount={1}
                    >
                      <Button icon={<UploadOutlined />}>
                        Upload Signature(Max. size 2MB)
                      </Button>
                    </Upload>
                  </PhotosDiv>
                )}
                {/* <IN.Password
                  type="password"
                  name=""
                  className="inputField inp"
                  id="password"
                  onBlur={onBlurHandler}
                  value={inpFields.password}
                  onChange={onChangeHandler}
                  placeholder="Password"
                  style={{
                    color: "#000",
                    border: `${
                      passwordErr
                        ? "1px solid #d72020"
                        : "1px solid rgba(166, 166, 166, 0.3)"
                    }`,
                  }}
                />{" "}
                {passwordErr && (
                  <p>Password is too short (minimun 6 charcters.)</p>
                )} */}
                {serverErr && <p>{serverTxt}</p>}
                {/* {showOtp && (
                  <>
                    <Input
                      type="text"
                      name=""
                      id="otp"
                      onChange={onChangeHandler}
                      placeholder="Enter OTP sent on email. If not received check spam folder."
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
                )} */}
                {allValid && (
                  <SubmitButton onClick={otpVerifier}>Submit</SubmitButton>
                )}
                {!allValid && <DisabledBtn>Submit</DisabledBtn>}
              </EmailVerificationBox>
            )}
          </RightDiv>
        </MainBox>
      </OuterBox>
    </>
  );
};

export default Register;
