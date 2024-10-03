import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import styled from "@emotion/styled";
import random from "../../assets/images/random.webp";
import {
  ContentCopyOutlined,
  DownloadOutlined,
  LinkOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import MusicLoader from "../Loader/MusicLoader";
import { notification } from "antd";
import { Button, message, Upload } from "antd";
import { Link } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  gap: 0.7rem;
  h1 {
    margin: 0;
    margin-bottom: 1rem;
  }
  @media only screen and (max-width: 1000px) {
    padding: 0;
  }
`;

const ContentDiv = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr;
  padding: 1rem;
  gap: 2rem;
  width: 100%;
  margin: 0 auto;
  background-color: white;
  border-radius: 0.5rem;
  @media only screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
    padding: 0;
    background-color: transparent;
  }
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow: hidden;
  border-radius: 0.5rem;
  gap: 1rem;
  img {
    width: 82%;
    height: 60%;
    margin: 0 auto;
    border-radius: 0.5rem;
  }
  div {
    display: flex;
    /* background-color: red; */
    width: 100%;

    span {
      width: 50%;
      letter-spacing: 0.09rem;
      text-transform: capitalize;
      &:first-child {
        margin-right: 0.8rem;
      }
      &:not(:first-child) {
        margin-left: 0.8rem;
      }
      padding: 0.5rem 0.6rem 0.5rem 0.2rem;
      font-size: 1.2rem;
      border-bottom: 1px solid #dadada;
    }
  }
  @media only screen and (max-width: 1000px) {
    padding: 0rem 0rem 0.4rem 0rem;
    background-color: white;
    img {
    }
    div {
      padding: 0 0.2rem;
      span {
        font-size: 1rem;
        padding: 0.5rem 0;
        letter-spacing: 0;
      }
    }
  }
`;

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;

  div {
    background-color: white;

    &:first-child {
      border-radius: 0.5rem;
      height: 100%;
    }
    padding: 1rem;
    p {
      text-transform: capitalize;
      border-bottom: 1px solid #e7e7ee;
      font-size: 1.3rem;
      margin: 0.5rem 0;
      padding: 0.6rem 0.4rem;

      color: black;
      font-weight: 500;
    }
    div {
      display: flex;
      justify-content: space-between;

      span {
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 0.3rem;
        padding: 0.2rem 0;
        &:not(:first-child) {
          color: black;
          font-weight: 500;
          text-transform: uppercase;
        }
      }
    }
  }
`;

const BankBtn = styled.button`
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 1rem;
  background-color: #1677ff;
  color: white;
  text-transform: capitalize;
  /* font-size: 1rem; */
  font-weight: bold;
  letter-spacing: 0.09rem;
`;
const Modal = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #00000038;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalBox = styled.div`
  background-color: white;
  width: 30%;
  height: fit-content;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  z-index: 20;

  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    width: 90%;
  }
`;

const ModalFormBox = styled.div`
  background-color: white;
  width: 90%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const BtnBox = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  button {
    background-color: #1677ff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.4rem;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.09rem;
    &:last-child {
      background-color: #bbb9b9;
    }
  }
`;

const LabelInpBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 74%;
  span {
    color: #ff0000ab;
    font-size: 0.8rem;
    margin-left: 0.2rem;
  }
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    width: 100%;
  }
`;
const Label = styled.label`
  font-size: 0.9rem;
  letter-spacing: 0.06rem;
  color: #9e9e9e;
  text-transform: capitalize;
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 0.6rem;
  outline: none;
  border: 1px solid #d7d7d7;

  &::placeholder {
    color: #d4cdcd;
    letter-spacing: 0.09rem;
    text-transform: capitalize;
  }
  &:focus {
    border: 1px solid #c0c0c0;
    box-shadow: 0.1rem 0.1rem 0.5rem #c0c0c0;
  }
`;

const ProfilePage = () => {
  const [api, contextHolderNot] = notification.useNotification({
    duration: 1.5,
  });
  const openNotificationWithIcon = (type, msg) => {
    api[type]({
      message: msg,
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
      const userPicLabel = document.querySelector("#userPicLabel");
      userPicLabel.style.color = "#9e9e9e";
      if (info.fileList[0]) {
        img = info.fileList[0].originFileObj;
        setUserProfile({ ...userProfile, userPic: img });
      } else {
        setUserProfile({ ...userProfile, userPic: null });
      }
    },
  };

  const userId = useSelector((state) => state.userId);
  const [refresher, setRefresher] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserdata] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inpFields, setInpFields] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [totalEarningUser, setTotalEarningUser] = useState(0);
  const [userProfile, setUserProfile] = useState({
    name: "",
    phone: "",
    channelUrl: "",
    userPic: null,
  });

  const totalPaymentReporter = (report) => {
    let totalPayment = 0;
    if (report) {
      for (const year in report) {
        for (const mon in report[year]) {
          totalPayment += Number(report[year][mon]);
        }
      }
      setTotalEarningUser(totalPayment);
    }
  };

  const fecher = async () => {
    setIsLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/get-user/?id=${userId}`
    );
    const data = await res.json();

    if (res.ok) {
      setUserdata(data.user);
      setUserProfile({
        name: data.user.name,
        phone: data.user.phone,
        channelUrl: data.user.channelUrl,
        userPic: null,
      });
      totalPaymentReporter(data.user.finacialReport[0]);
      setInpFields(data.user.bankDetails[0]);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fecher();

    return () => {};
  }, [refresher]);

  const onChangeHandler = (e) => {
    const id = e.target.id;
    const val = e.target.value;
    const ele = document.querySelector(`#${id}`);

    ele.style.border = "1px solid #d7d7d7";
    setInpFields({ ...inpFields, [id]: val.trim() });
  };
  const userProfileChangerHandler = (e) => {
    const id = e.target.id;
    const val = e.target.value;
    const ele = document.querySelector(`#${id}`);

    ele.style.border = "1px solid #d7d7d7";
    setUserProfile({ ...userProfile, [id]: val.trim() });
  };

  const onSubmitHandler = async () => {
    if (
      inpFields.accountNo.length < 10 ||
      inpFields.ifsc.length === 0 ||
      inpFields.bankName.length === 0 ||
      inpFields.upi.length === 0
    ) {
      if (inpFields.accountNo.length < 10) {
        const accountNo = document.querySelector("#accountNo");
        accountNo.style.border = "1px solid red";
      }
      if (inpFields.ifsc.length === 0) {
        const ifsc = document.querySelector("#ifsc");
        ifsc.style.border = "1px solid red";
      }
      if (inpFields.bankName.length === 0) {
        const bankName = document.querySelector("#bankName");
        bankName.style.border = "1px solid red";
      }
      if (inpFields.upi.length === 0) {
        const upi = document.querySelector("#upi");
        upi.style.border = "1px solid red";
      }
      openNotificationWithIcon("error", "Fill all require fields.");
      return;
    }
    setIsLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/user-bank-detail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...inpFields,
          userId: userId,
        }),
      }
    );
    const data = await res.json();
    if (res.ok) {
      openNotificationWithIcon("success", data.message);
    }
    if (!res.ok) {
      openNotificationWithIcon("error", data.message);
    }
    setShowModal(false);
    setRefresher(refresher + 1);
    setIsLoading(false);
  };

  const copyToClipBoard = async (txt) => {
    try {
      await navigator.clipboard.writeText(txt);
      openNotificationWithIcon("success", "Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      {" "}
      {isLoading && <MusicLoader />}
      {showEditModal && (
        <Modal>
          <ModalBox data-aos="zoom-in">
            <ModalFormBox>
              <LabelInpBox>
                <Label htmlFor="name">Label Name</Label>
                <Input
                  type="text"
                  id="name"
                  onChange={userProfileChangerHandler}
                  value={userProfile.name}
                  placeholder="Label Name"
                />
              </LabelInpBox>
              <LabelInpBox>
                <Label htmlFor="phone">Contact Number</Label>
                <Input
                  type="number"
                  id="phone"
                  onChange={userProfileChangerHandler}
                  value={userProfile.phone}
                  placeholder="phone"
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="channelUrl">channel Url</Label>
                <Input
                  type="text"
                  id="channelUrl"
                  onChange={userProfileChangerHandler}
                  value={userProfile.channelUrl}
                  placeholder="Url"
                />
              </LabelInpBox>
              <LabelInpBox>
                {" "}
                <Label id="userPicLabel" htmlFor="">
                  Channel Logo (Max. size 2MB)
                </Label>
                <Upload
                  method="get"
                  listType="picture"
                  {...profilePicProps}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload Channel Logo</Button>
                </Upload>
              </LabelInpBox>

              <BtnBox>
                <button
                  onClick={async () => {
                    if (
                      userProfile.name.length < 3 ||
                      userProfile.phone.toString().length < 10 ||
                      userProfile.phone.toString().length > 10 ||
                      userProfile.channelUrl.length < 10 ||
                      userProfile.userPic === null
                    ) {
                      if (userProfile.name.length < 3) {
                        const name = document.querySelector("#name");
                        name.style.border = "1px solid red";
                      }

                      if (
                        userProfile.phone.toString().length < 10 ||
                        userProfile.phone.toString().length > 10
                      ) {
                        const phone = document.querySelector("#phone");
                        phone.style.border = "1px solid red";
                      }
                      if (userProfile.channelUrl.length < 10) {
                        const channelUrl =
                          document.querySelector("#channelUrl");
                        channelUrl.style.border = "1px solid red";
                      }
                      if (userProfile.userPic === null) {
                        const userPicLabel =
                          document.querySelector("#userPicLabel");
                        userPicLabel.style.color = "red";
                      }

                      openNotificationWithIcon(
                        "error",
                        "Fill all require fields."
                      );
                      return;
                    }
                    setIsLoading(true);
                    const formData = new FormData();
                    formData.append("name", userProfile.name);
                    formData.append("phone", userProfile.phone);
                    formData.append("channelUrl", userProfile.channelUrl);
                    formData.append("userPic", userProfile.userPic);
                    formData.append("userId", userId);

                    const res = await fetch(
                      `${process.env.REACT_APP_BASE_URL}/user/edit-profile`,
                      {
                        method: "POST",
                        body: formData,
                      }
                    );

                    const resData = await res.json();
                    console.log(resData);

                    if (res.ok) {
                      openNotificationWithIcon("success", resData.message);
                      setTimeout(() => {
                        window.location.reload();
                      }, 1000);
                    } else {
                      openNotificationWithIcon("error", resData.message);
                    }
                    setIsLoading(false);
                  }}
                >
                  Submit
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                  }}
                >
                  Cancel
                </button>
              </BtnBox>
            </ModalFormBox>
          </ModalBox>
        </Modal>
      )}
      {showModal && (
        <Modal>
          <ModalBox data-aos="zoom-in">
            <ModalFormBox>
              <LabelInpBox>
                <Label htmlFor="accountNo">Account Number</Label>
                <Input
                  type="number"
                  id="accountNo"
                  onChange={onChangeHandler}
                  value={inpFields.accountNo}
                />
              </LabelInpBox>
              <LabelInpBox>
                <Label htmlFor="ifsc">IFSC</Label>
                <Input
                  type="text"
                  id="ifsc"
                  onChange={onChangeHandler}
                  value={inpFields.ifsc}
                />
              </LabelInpBox>
              <LabelInpBox>
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  type="text"
                  id="bankName"
                  onChange={onChangeHandler}
                  value={inpFields.bankName}
                />
              </LabelInpBox>
              <LabelInpBox>
                <Label htmlFor="upi">UPI id</Label>
                <Input
                  type="text"
                  id="upi"
                  onChange={onChangeHandler}
                  value={inpFields.upi}
                />
              </LabelInpBox>
              <BtnBox>
                <button onClick={onSubmitHandler}>Submit</button>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Cancel
                </button>
              </BtnBox>
            </ModalFormBox>
          </ModalBox>
        </Modal>
      )}
      <MainDiv>
        {" "}
        {contextHolderNot}
        {contextHolder}
        <Breadcrumb
          items={[
            {
              title: "User Panel",
            },
            {
              title: "Profile",
            },
          ]}
        />
        <h1>My Account</h1>
        {userData && (
          <ContentDiv>
            <LeftDiv>
              <img
                // src={`${process.env.REACT_APP_BASE_URL}/${userData.userPic}`}
                src={
                  userData.userPic.includes("cloudinary")
                    ? `${userData.userPic}`
                    : `${process.env.REACT_APP_BASE_URL}/${userData.userPic}`
                }
                alt=""
              />
              <div>
                <span>{userData.name}</span>
                <span>+91-{userData.phone}</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <span
                  style={{
                    width: "100%",
                    padding: "0.5rem 2rem 0.5rem 0.2rem",
                    margin: "0 0 0 0",
                    textTransform: "none",
                  }}
                >
                  {userData.email}
                </span>
              </div>
              <BankBtn
                onClick={() => {
                  setShowEditModal(true);
                }}
                style={{ width: "fit-content" }}
              >
                Edit Profile
              </BankBtn>
            </LeftDiv>
            <RightDiv>
              <div style={{ boxShadow: " 0.2rem 0.2rem 1rem #d8d8d8" }}>
                <p>Details</p>
                <div>
                  <span>Label Name</span>
                  <span>{userData.name}</span>
                </div>
                <div>
                  <span>Email</span>
                  <span style={{ textTransform: "none" }}>
                    {userData.email}
                  </span>
                </div>
                <div>
                  <span>Phone</span>
                  <span>+91-{userData.phone}</span>
                </div>
                <div>
                  <span>Channel URL</span>
                  <span>
                    <Link to={`${userData.channelUrl}`} target="_blank">
                      <LinkOutlined />
                    </Link>
                  </span>
                </div>
                <div>
                  <span>Address</span>
                  <span>
                    {userData.address},{userData.city}
                  </span>
                </div>
                <div>
                  <span>Pincode</span>
                  <span>{userData.pincode}</span>
                </div>

                <div>
                  <span>State</span>
                  <span>{userData.state}</span>
                </div>
                <div>
                  <span>Country</span>
                  <span>{userData.country}</span>
                </div>
                {userData.docs && (
                  <div>
                    <span>Agreement</span>
                    <span>
                      <Link
                        to={`${process.env.REACT_APP_BASE_URL}/file/download/?filePath=${userData.docs}`}
                        target="_blank"
                      >
                        <DownloadOutlined style={{ transform: "scale(1.5)" }} />
                      </Link>
                    </span>
                  </div>
                )}
                <div>
                  <span>Sign</span>

                  <span>
                    <Link
                      to={`${process.env.REACT_APP_BASE_URL}/file/download/?filePath=${userData.sign}`}
                      target="_blank"
                    >
                      <DownloadOutlined style={{ transform: "scale(1.5)" }} />
                    </Link>
                  </span>
                </div>
              </div>
            </RightDiv>
            <RightDiv>
              <div style={{ boxShadow: " 0.2rem 0.2rem 1rem #d8d8d8" }}>
                <p>Bank</p>
                <div>
                  <span>Account No.</span>
                  <span>
                    {userData.bankDetails[0].accountNo.length === 0
                      ? "-"
                      : userData.bankDetails[0].accountNo}
                    {userData.bankDetails[0].accountNo.length !== 0 && (
                      <ContentCopyOutlined
                        style={{ cursor: "pointer", transform: "scale(.8)" }}
                        onClick={copyToClipBoard.bind(
                          this,
                          userData.bankDetails[0].accountNo
                        )}
                      />
                    )}
                  </span>
                </div>
                <div>
                  <span>IFSC</span>
                  <span>
                    {userData.bankDetails[0].ifsc.length !== 0
                      ? userData.bankDetails[0].ifsc
                      : "-"}
                    {userData.bankDetails[0].ifsc.length !== 0 && (
                      <ContentCopyOutlined
                        style={{ cursor: "pointer", transform: "scale(.8)" }}
                        onClick={copyToClipBoard.bind(
                          this,
                          userData.bankDetails[0].ifsc
                        )}
                      />
                    )}
                  </span>
                </div>
                <div>
                  <span>Bank Name</span>
                  <span>
                    {userData.bankDetails[0].bankName.length !== 0
                      ? userData.bankDetails[0].bankName
                      : "-"}
                  </span>
                </div>
                <div>
                  <span>UPI</span>
                  <span style={{ textTransform: "none" }}>
                    {userData.bankDetails[0].upi.length !== 0
                      ? userData.bankDetails[0].upi
                      : "-"}
                    {userData.bankDetails[0].upi > 0 && (
                      <ContentCopyOutlined
                        style={{ cursor: "pointer", transform: "scale(.8)" }}
                        onClick={copyToClipBoard.bind(
                          this,
                          userData.bankDetails[0].upi
                        )}
                      />
                    )}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {userData.bankDetails[0].accountNo.length === 0 && (
                    <BankBtn
                      onClick={() => {
                        setShowModal(true);
                      }}
                    >
                      Add
                    </BankBtn>
                  )}
                  {userData.bankDetails[0].accountNo.length > 0 && (
                    <BankBtn
                      onClick={() => {
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </BankBtn>
                  )}
                </div>
              </div>
              <div style={{ boxShadow: " 0.2rem 0.2rem 1rem #d8d8d8" }}>
                <p>Wallet</p>
                <div>
                  <span>Total Earnings</span>
                  <span> ₹ {totalEarningUser}</span>
                </div>
                <div>
                  <span>Paid</span>
                  <span> ₹ {userData.paidEarning}</span>
                </div>
                <div>
                  <span>Remaining</span>
                  <span>
                    {" "}
                    ₹ {Number(totalEarningUser) - Number(userData.paidEarning)}
                  </span>
                </div>
              </div>
            </RightDiv>
          </ContentDiv>
        )}
      </MainDiv>
    </>
  );
};

export default ProfilePage;
