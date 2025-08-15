import React, { useEffect, useState } from "react";
import DrawerPanel from "../components/DrawerPanel";
import { useNavigate, useParams } from "react-router";
import Form from "../components/UserPanel/Form";
import History from "../components/UserPanel/History";
import OrderDetailsPage from "../components/UserPanel/OrderDetailsPage";
import EditOrder from "../components/UserPanel/EditOrder";
import UserPanelHome from "../components/UserPanel/UserPanelHome";
import ProfilePage from "../components/UserPanel/ProfilePage";
import CopyRightPage from "../components/UserPanel/CopyRightPage";
import { PhoneOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { FloatButton, message, Modal as AntdModal, Select, Button } from "antd";
import LegalDoc from "../components/UserPanel/LegalDoc";
import Reports from "../components/UserPanel/Reports";
import UserNoti from "../components/UserPanel/UserNoti";
import styled from "styled-components";
import { FaFileCsv, FaFileDownload, FaQuestion } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import UserWalletView from "../components/UserPanel/UserWalletView";
import MusicLoader from "../components/Loader/MusicLoader";

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

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 70%;
  gap: 1rem;
  @media only screen and (min-width: 0px) and (max-width: 850px) {
    border-bottom: 1px dashed #d918036b;
    padding-bottom: 2rem;
  }
  span {
    color: #ff0000d1;
    margin-top: -1.2rem;
    margin-bottom: -0.5rem;
    font-size: 0.8rem;
    padding: 0 0.5rem;
  }
  textarea {
    border: 1px solid rgba(166, 166, 166, 0.3);
    border-radius: 5px;
    width: 100%;
    padding: 10px;
    &::placeholder {
      color: rgba(200, 200, 200, 1);
    }
    margin-bottom: 0.3rem;
    &:focus {
      outline: none;
      border-bottom: 1px solid #d91903;
    }
  }
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
    border-bottom: 1px solid #d91903;
  }
`;

const Btn = styled.button`
  font-weight: bold;
  border: 2px solid #828181;
  background-color: transparent;
  color: black;
  overflow: hidden;
  padding: 0.5rem 2rem;
  position: relative;
  text-decoration: none;
  transition: 0.2s transform ease-in-out;
  will-change: transform;
  z-index: 0;
  text-transform: uppercase;
  letter-spacing: 0.15rem;
  font-size: 0.9rem;
  &::after {
    background-color: #d61a07;
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-100%, 0) rotate(10deg);
    transform-origin: top left;
    transition: 0.2s transform ease-out;
    will-change: transform;
    z-index: -1;
  }
  &:hover::after {
    transform: translate(0, 0);
  }
  &:hover {
    border: 2px solid transparent;
    color: white;
    transform: scale(1.05);
    font-weight: 500;
    will-change: transform;
  }
  @media only screen and (min-width: 0px) and (max-width: 850px) {
    margin: 0 auto;
  }
`;

const monthOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const yearOptions = [
  new Date().getFullYear() - 2,
  new Date().getFullYear() - 1,
  new Date().getFullYear(),
];

const UserPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [otpError, setOtpError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const demoHandleVerifyOtp = async () => {
    setIsLoading(true);
    const mob = "8126770620";
    if (true) {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/check-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contactNum: mob,
          }),
        }
      );
      const data = await res.json();
      if (data.exists) {
        const loginRes = await fetch(
          `${process.env.REACT_APP_BASE_URL}/user/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone: mob,
            }),
          }
        );
        const loginData = await loginRes.json();
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
    setIsLoading(false);
  };
  const defaultField = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };
  const [userData, setUserdata] = useState(null);
  const userId = useSelector((state) => state.userId);
  const fecher = async () => {
    setIsLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/get-user/?id=${userId}`
    );
    const data = await res.json();
    if (res.ok) {
      setInpField({
        ...inpField,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
      });

      setUserdata(data.user);
    }
    setIsLoading(false);
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
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const [inpField, setInpField] = useState(defaultField);
  const page = useParams().page;
  const id = useParams().id;
  const action = useParams().action;
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [messageErr, setMessage] = useState(false);

  // Download report modal state
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(
    monthOptions[new Date().getMonth()]
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [downloading, setDownloading] = useState(false);

  const onChange = () => {
    setOpen(!open);
  };
  const onChangeHandler = (e) => {
    const id = e.target.id;
    const val = e.target.value;
    if (id === "name") {
      setNameErr(false);
    }
    if (id === "email") {
      setEmailErr(false);
    }
    if (id === "phone") {
      setPhoneErr(false);
    }
    if (id === "message") {
      setMessage(false);
    }
    setInpField({ ...inpField, [id]: val });
  };

  const onSubmitHandler = async () => {
    if (
      inpField.name.trim().length < 1 ||
      inpField.phone.toString().trim().length !== 10 ||
      !validateEmail(inpField.email) ||
      inpField.message.trim().length < 1
    ) {
      if (inpField.name.trim().length < 1) {
        setNameErr(true);
      }
      if (inpField.phone.toString().trim().length !== 10) {
        setPhoneErr(true);
      }
      if (!validateEmail(inpField.email)) {
        setEmailErr(true);
      }
      if (inpField.message.trim().length < 1) {
        setMessage(true);
      }
      return;
    }
    setIsLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/query/new-query`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...inpField,
        }),
      }
    );
    const data = await res.json();
    if (res.ok) {
      setShowModal(false);
      success(data.message);
    } else {
      error(data.message);
    }
    setIsLoading(false);
    setInpField(defaultField);
    fecher();
    setOpen(true);
  };

  const handleDownloadReport = async () => {
    const win = window.open(
      `${process.env.REACT_APP_BASE_URL}/user/get-report/${userData.name}/${selectedMonth}/${selectedYear}`
    );
    setTimeout(() => {
      if (win) win.close();
    }, 3000); // closes after 3 seconds
    setDownloadModalOpen(false);
  };
  useEffect(() => {
    fecher();
  }, [page]);

  return (
    <div>
      <div>
        {contextHolder}

        <AntdModal
          title="Download Label Report"
          open={downloadModalOpen}
          onCancel={() => setDownloadModalOpen(false)}
          footer={[
            <Button key="cancel" onClick={() => setDownloadModalOpen(false)}>
              Cancel
            </Button>,
            <Button
              key="download"
              type="primary"
              loading={downloading}
              onClick={handleDownloadReport}
            >
              Download
            </Button>,
          ]}
        >
          <div style={{ marginBottom: 16 }}>
            <label style={{ marginBottom: 8, display: "block" }}>Month</label>
            <Select
              style={{ width: "100%" }}
              value={selectedMonth}
              onChange={setSelectedMonth}
            >
              {monthOptions.map((m) => (
                <Select.Option key={m} value={m}>
                  {m}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div>
            <label style={{ marginBottom: 8, display: "block" }}>Year</label>
            <Select
              style={{ width: "100%" }}
              value={selectedYear}
              onChange={setSelectedYear}
            >
              {yearOptions.map((y) => (
                <Select.Option key={y} value={y}>
                  {y}
                </Select.Option>
              ))}
            </Select>
          </div>
        </AntdModal>
        <FloatButton.Group
          open={open}
          onClick={onChange}
          trigger="click"
          style={{
            left: "1%",
            transform: "scale(1.2)",
            zIndex: 1,
            bottom: "6%",
          }}
          tooltip={<div>Contact us</div>}
          icon={<FaFileDownload />}
        >
          <FloatButton
            onClick={() => {
              setDownloadModalOpen(true);
            }}
            tooltip={<div>Download Report</div>}
            icon={
              <FaFileCsv
                style={{
                  color: "#2178e9e0",
                }}
              />
            }
          />
        </FloatButton.Group>
        <DrawerPanel page={page}>
          {isLoading && <MusicLoader />}
          {page === "home" && <UserPanelHome />}
          {page === "profile" && <ProfilePage />}
          {page === "upload" && <Form />}
          {page === "reports" && <Reports />}
          {page === "history" && <History />}
          {page === "wallet" && <UserWalletView />}
          {page === "notification" && <UserNoti />}
          {page === "copyright" && <CopyRightPage />}
          {page === "legal-document" && <LegalDoc />}
          {id && !action && <OrderDetailsPage />}
          {action === "edit" && <EditOrder />}
        </DrawerPanel>
      </div>
    </div>
  );
};

export default UserPanel;
