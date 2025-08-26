import React, { useEffect, useState } from "react";
import { Breadcrumb, Tabs, Progress, Tooltip, Avatar, Badge } from "antd";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import {
  ContentCopyOutlined,
  DownloadOutlined,
  LinkOutlined,
  EditOutlined,
  AccountBalanceOutlined,
  PersonOutlineOutlined,
  VerifiedUserOutlined,
  EmailOutlined,
  PhoneAndroidOutlined,
  LocationOnOutlined,
  PublicOutlined,
  HomeOutlined,
  CloudUploadOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import MusicLoader from "../Loader/MusicLoader";
import { notification } from "antd";
import { Button, message, Upload, Divider } from "antd";
import { Link } from "react-router-dom";
import { UploadOutlined, BankOutlined, CopyOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const MainDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  gap: 1.5rem;
  background-color: #f7f9fc;

  h1 {
    margin: 0;
    margin-bottom: 1rem;
    font-weight: 700;
    color: #333;
    font-size: 2rem;
  }

  @media only screen and (max-width: 1000px) {
    padding: 1rem;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  .header-title {
    h1 {
      margin: 0;
      font-size: 1.8rem;
      font-weight: 700;
    }
    p {
      color: #666;
      margin: 0.25rem 0 0 0;
    }
  }

  .completion-indicator {
    display: flex;
    align-items: center;
    gap: 1rem;

    span {
      color: #555;
      font-size: 0.9rem;
    }
  }
`;

const ContentDiv = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1.5rem;
  width: 100%;
  margin: 0 auto;

  @media only screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  position: relative;

  .avatar-container {
    position: relative;
    margin-bottom: 1.5rem;

    .edit-overlay {
      position: absolute;
      bottom: 0;
      right: 0;
      background: #1677ff;
      color: white;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .profile-name {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .profile-contact {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;

      svg {
        font-size: 1.2rem;
        color: #1677ff;
      }
    }
  }
`;

const DetailsTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 1rem;
  }

  .ant-tabs-tab {
    padding: 12px 16px;

    &.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: #1677ff;
      font-weight: 600;
    }
  }
`;

const DetailSection = styled(motion.div)`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  .section-header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.75rem;

      svg {
        color: #1677ff;
      }
    }
  }

  .section-content {
    padding: 1.5rem;
  }
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 1.25rem;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }

  .info-label {
    flex: 0 0 35%;
    font-size: 0.95rem;
    color: #666;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      font-size: 1.1rem;
      color: #1677ff;
    }
  }

  .info-value {
    flex: 1;
    font-weight: 500;
    color: #333;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .copy-icon {
      color: #999;
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
        color: #1677ff;
      }
    }

    .link-icon,
    .download-icon {
      color: #1677ff;
      cursor: pointer;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;

const ActionButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  background: ${(props) => (props.secondary ? "transparent" : "#1677ff")};
  color: ${(props) => (props.secondary ? "#1677ff" : "white")};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  border: ${(props) => (props.secondary ? "1px solid #1677ff" : "none")};

  &:hover {
    background: ${(props) =>
      props.secondary ? "rgba(22, 119, 255, 0.1)" : "#0e5edb"};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 16px;
  width: 95%;
  max-width: 500px;
  overflow: hidden;

  .modal-header {
    padding: 1.5rem;
    border-bottom: 1px solid #f0f0f0;

    h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
    }
  }

  .modal-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .modal-footer {
    padding: 1.25rem 1.5rem;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.9rem;
    font-weight: 500;
    color: #666;
  }

  .error-message {
    color: #f44336;
    font-size: 0.8rem;
    margin-top: 0.25rem;
  }
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  outline: none;
  font-size: 1rem;
  transition: border 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #1677ff;
    box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.2);
  }

  &.error {
    border-color: #f44336;
  }
`;

const ProfilePage = () => {
  const [api, contextHolderNot] = notification.useNotification({
    duration: 2.5,
  });

  const openNotificationWithIcon = (type, msg) => {
    api[type]({
      message: type === "success" ? "Success" : "Error",
      description: msg,
      placement: "topRight",
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
  const [activeTab, setActiveTab] = useState("1");
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [formErrors, setFormErrors] = useState({});

  const [userProfile, setUserProfile] = useState({
    name: "",
    phone: "",
    channelUrl: "",
    email: "",
    userPic: null,
  });

  const calculateProfileCompletion = (user) => {
    if (!user) return 0;

    let completedFields = 0;
    let totalFields = 0;

    // Personal info
    const personalFields = ["name", "email", "phone", "channelUrl", "userPic"];
    personalFields.forEach((field) => {
      totalFields++;
      if (user[field] && user[field].length > 0) completedFields++;
    });

    // Address
    const addressFields = ["address", "city", "state", "country", "pincode"];
    addressFields.forEach((field) => {
      totalFields++;
      if (user[field] && user[field].length > 0) completedFields++;
    });

    // Bank details
    const bankFields = ["accountNo", "ifsc", "bankName", "upi"];
    bankFields.forEach((field) => {
      totalFields++;
      if (
        user.bankDetails &&
        user.bankDetails[0] &&
        user.bankDetails[0][field] &&
        user.bankDetails[0][field].length > 0
      )
        completedFields++;
    });

    // Documents
    if (user.docs) {
      totalFields++;
      completedFields++;
    }

    if (user.sign) {
      totalFields++;
      completedFields++;
    }

    return Math.round((completedFields / totalFields) * 100);
  };

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
    try {
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
          email: data.user.email,
          userPic: null,
        });
        totalPaymentReporter(data.user.finacialReport[0]);
        setInpFields(data.user.bankDetails[0]);
        setProfileCompletion(calculateProfileCompletion(data.user));
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      error("Failed to load profile data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fecher();
    // eslint-disable-next-line
  }, [refresher]);

  const onChangeHandler = (e) => {
    const id = e.target.id;
    const val = e.target.value;

    // Clear error when user types
    setFormErrors({
      ...formErrors,
      [id]: null,
    });

    setInpFields({ ...inpFields, [id]: val.trim() });
  };

  const userProfileChangerHandler = (e) => {
    const id = e.target.id;
    const val = e.target.value;

    // Clear error when user types
    setFormErrors({
      ...formErrors,
      [id]: null,
    });

    setUserProfile({ ...userProfile, [id]: val.trim() });
  };

  const validateBankForm = () => {
    const errors = {};

    if (!inpFields.accountNo || inpFields.accountNo.length < 10) {
      errors.accountNo = "Account number must be at least 10 characters";
    }

    if (!inpFields.ifsc || inpFields.ifsc.length === 0) {
      errors.ifsc = "IFSC code is required";
    }

    if (!inpFields.bankName || inpFields.bankName.length === 0) {
      errors.bankName = "Bank name is required";
    }

    if (!inpFields.upi || inpFields.upi.length === 0) {
      errors.upi = "UPI ID is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateProfileForm = () => {
    const errors = {};

    if (!userProfile.name || userProfile.name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    if (!userProfile.phone || userProfile.phone.toString().length !== 10) {
      errors.phone = "Phone number must be 10 digits";
    }

    if (!userProfile.channelUrl || userProfile.channelUrl.length < 10) {
      errors.channelUrl = "Channel URL must be at least 10 characters";
    }

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!userProfile.email || !emailRegex.test(userProfile.email)) {
      errors.email = "Please enter a valid email address";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmitHandler = async () => {
    if (!validateBankForm()) return;

    setIsLoading(true);
    try {
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
        setShowModal(false);
        setRefresher(refresher + 1);
      } else {
        openNotificationWithIcon("error", data.message);
      }
    } catch (err) {
      console.error("Error updating bank details:", err);
      openNotificationWithIcon(
        "error",
        "Failed to update bank details. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onProfileSubmitHandler = async () => {
    if (!validateProfileForm()) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", userProfile.name);
      formData.append("phone", userProfile.phone);
      formData.append("email", userProfile.email);
      formData.append("channelUrl", userProfile.channelUrl);
      if (userProfile.userPic) {
        formData.append("userPic", userProfile.userPic);
      }
      formData.append("userId", userId);

      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/edit-profile`,
        {
          method: "POST",
          body: formData,
        }
      );

      const resData = await res.json();

      if (res.ok) {
        openNotificationWithIcon("success", resData.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        openNotificationWithIcon("error", resData.message);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      openNotificationWithIcon(
        "error",
        "Failed to update profile. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipBoard = async (txt) => {
    try {
      await navigator.clipboard.writeText(txt);
      success("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
      error("Failed to copy to clipboard");
    }
  };

  const getProgressColor = (percent) => {
    if (percent < 40) return "#f5222d";
    if (percent < 70) return "#faad14";
    return "#52c41a";
  };

  return (
    <>
      {isLoading && <MusicLoader />}
      {contextHolderNot}
      {contextHolder}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="modal-header">
              <h2>Edit Profile</h2>
            </div>
            <div className="modal-body">
              <FormGroup>
                <label htmlFor="name">Label Name</label>
                <Input
                  type="text"
                  id="name"
                  onChange={userProfileChangerHandler}
                  value={userProfile.name}
                  placeholder="Enter label name"
                  className={formErrors.name ? "error" : ""}
                />
                {formErrors.name && (
                  <div className="error-message">{formErrors.name}</div>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="phone">Contact Number</label>
                <Input
                  type="number"
                  id="phone"
                  onChange={userProfileChangerHandler}
                  value={userProfile.phone}
                  placeholder="Enter phone number"
                  className={formErrors.phone ? "error" : ""}
                />
                {formErrors.phone && (
                  <div className="error-message">{formErrors.phone}</div>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="email">Email</label>
                <Input
                  type="email"
                  id="email"
                  onChange={userProfileChangerHandler}
                  value={userProfile.email}
                  placeholder="Enter email address"
                  className={formErrors.email ? "error" : ""}
                />
                {formErrors.email && (
                  <div className="error-message">{formErrors.email}</div>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="channelUrl">Channel URL</label>
                <Input
                  type="text"
                  id="channelUrl"
                  onChange={userProfileChangerHandler}
                  value={userProfile.channelUrl}
                  placeholder="Enter channel URL"
                  className={formErrors.channelUrl ? "error" : ""}
                />
                {formErrors.channelUrl && (
                  <div className="error-message">{formErrors.channelUrl}</div>
                )}
              </FormGroup>

              <FormGroup>
                <label>Channel Logo (Max. size 2MB)</label>
                <Upload
                  method="get"
                  listType="picture"
                  {...profilePicProps}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload Channel Logo</Button>
                </Upload>
              </FormGroup>
            </div>
            <div className="modal-footer">
              <ActionButton
                secondary
                onClick={() => setShowEditModal(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </ActionButton>
              <ActionButton
                onClick={onProfileSubmitHandler}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CloudUploadOutlined style={{ fontSize: "1.2rem" }} />
                Save Changes
              </ActionButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Bank Details Modal */}
      {showModal && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="modal-header">
              <h2>Bank Account Details</h2>
            </div>
            <div className="modal-body">
              <FormGroup>
                <label htmlFor="accountNo">Account Number</label>
                <Input
                  type="number"
                  id="accountNo"
                  onChange={onChangeHandler}
                  value={inpFields.accountNo}
                  placeholder="Enter account number"
                  className={formErrors.accountNo ? "error" : ""}
                />
                {formErrors.accountNo && (
                  <div className="error-message">{formErrors.accountNo}</div>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="ifsc">IFSC Code</label>
                <Input
                  type="text"
                  id="ifsc"
                  onChange={onChangeHandler}
                  value={inpFields.ifsc}
                  placeholder="Enter IFSC code"
                  className={formErrors.ifsc ? "error" : ""}
                />
                {formErrors.ifsc && (
                  <div className="error-message">{formErrors.ifsc}</div>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="bankName">Bank Name</label>
                <Input
                  type="text"
                  id="bankName"
                  onChange={onChangeHandler}
                  value={inpFields.bankName}
                  placeholder="Enter bank name"
                  className={formErrors.bankName ? "error" : ""}
                />
                {formErrors.bankName && (
                  <div className="error-message">{formErrors.bankName}</div>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="upi">UPI ID</label>
                <Input
                  type="text"
                  id="upi"
                  onChange={onChangeHandler}
                  value={inpFields.upi}
                  placeholder="Enter UPI ID"
                  className={formErrors.upi ? "error" : ""}
                />
                {formErrors.upi && (
                  <div className="error-message">{formErrors.upi}</div>
                )}
              </FormGroup>
            </div>
            <div className="modal-footer">
              <ActionButton
                secondary
                onClick={() => setShowModal(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </ActionButton>
              <ActionButton
                onClick={onSubmitHandler}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <BankOutlined style={{ fontSize: "1.2rem" }} />
                Save Bank Details
              </ActionButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

      <MainDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Breadcrumb
          items={[
            {
              title: (
                <Link to="/">
                  <HomeOutlined />
                </Link>
              ),
            },
            { title: "User Panel" },
            { title: "Profile" },
          ]}
          style={{ marginBottom: "1rem" }}
        />

        <ProfileHeader>
          <div className="header-title">
            <h1>My Account</h1>
            <p>Manage your personal information and payment details</p>
          </div>

          {/* <div className="completion-indicator">
            <span>Profile Completion</span>
            <Progress
              type="circle"
              percent={profileCompletion}
              width={50}
              strokeColor={getProgressColor(profileCompletion)}
            />
          </div> */}
        </ProfileHeader>

        {userData && (
          <ContentDiv
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <ProfileCard
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <div className="avatar-container">
                <Badge
                  count={
                    <div
                      className="edit-overlay"
                      onClick={() => setShowEditModal(true)}
                    >
                      <EditOutlined />
                    </div>
                  }
                  offset={[-5, 5]}
                >
                  <Avatar
                    size={120}
                    src={
                      userData.userPic.includes("cloudinary")
                        ? `${userData.userPic}`
                        : `${process.env.REACT_APP_BASE_URL}/${userData.userPic}`
                    }
                  />
                </Badge>
              </div>

              <h2 className="profile-name">{userData.name}</h2>

              <div className="profile-contact">
                <div className="contact-item">
                  <PhoneAndroidOutlined />
                  <span>+91-{userData.phone}</span>
                </div>
                <div className="contact-item">
                  <EmailOutlined />
                  <span>{userData.email}</span>
                </div>
              </div>

              <ActionButton
                onClick={() => setShowEditModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <EditOutlined />
                Edit Profile
              </ActionButton>
            </ProfileCard>

            <DetailsTabs
              activeKey={activeTab}
              onChange={setActiveTab}
              tabPosition="top"
            >
              <TabPane
                tab={
                  <span>
                    <PersonOutlineOutlined style={{ marginRight: 8 }} />
                    Personal Details
                  </span>
                }
                key="1"
              >
                <DetailSection
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <div className="section-header">
                    <h3>
                      <PersonOutlineOutlined />
                      Personal Information
                    </h3>
                  </div>

                  <div className="section-content">
                    <InfoRow>
                      <div className="info-label">
                        <PersonOutlineOutlined />
                        Label Name
                      </div>
                      <div className="info-value">{userData.name}</div>
                    </InfoRow>

                    <InfoRow>
                      <div className="info-label">
                        <EmailOutlined />
                        Email
                      </div>
                      <div className="info-value">{userData.email}</div>
                    </InfoRow>

                    <InfoRow>
                      <div className="info-label">
                        <PhoneAndroidOutlined />
                        Phone
                      </div>
                      <div className="info-value">+91-{userData.phone}</div>
                    </InfoRow>

                    <InfoRow>
                      <div className="info-label">
                        <LinkOutlined />
                        Channel URL
                      </div>
                      <div className="info-value">
                        <Tooltip title="Open channel URL">
                          <Link
                            to={`${userData.channelUrl}`}
                            target="_blank"
                            className="link-icon"
                          >
                            <LinkOutlined />
                          </Link>
                        </Tooltip>
                      </div>
                    </InfoRow>
                  </div>
                </DetailSection>

                <Divider style={{ margin: "1.5rem 0" }} />

                <DetailSection
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <div className="section-header">
                    <h3>
                      <LocationOnOutlined />
                      Address Details
                    </h3>
                  </div>

                  <div className="section-content">
                    <InfoRow>
                      <div className="info-label">
                        <LocationOnOutlined />
                        Address
                      </div>
                      <div className="info-value">
                        {userData.address && userData.address.length > 0
                          ? `${userData.address}, ${userData.city}`
                          : userData.city}
                      </div>
                    </InfoRow>

                    {userData.pincode && (
                      <InfoRow>
                        <div className="info-label">
                          <LocationOnOutlined />
                          Pincode
                        </div>
                        <div className="info-value">{userData.pincode}</div>
                      </InfoRow>
                    )}

                    <InfoRow>
                      <div className="info-label">
                        <LocationOnOutlined />
                        State
                      </div>
                      <div className="info-value">{userData.state}</div>
                    </InfoRow>

                    <InfoRow>
                      <div className="info-label">
                        <PublicOutlined />
                        Country
                      </div>
                      <div className="info-value">{userData.country}</div>
                    </InfoRow>
                  </div>
                </DetailSection>
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <AccountBalanceOutlined style={{ marginRight: 8 }} />
                    Bank Details
                  </span>
                }
                key="2"
              >
                <DetailSection
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <div className="section-header">
                    <h3>
                      <AccountBalanceOutlined />
                      Bank Account Information
                    </h3>

                    {userData.bankDetails[0].accountNo.length === 0 ? (
                      <ActionButton
                        onClick={() => setShowModal(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <BankOutlined />
                        Add Bank Details
                      </ActionButton>
                    ) : (
                      <ActionButton
                        onClick={() => setShowModal(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <EditOutlined />
                        Edit Bank Details
                      </ActionButton>
                    )}
                  </div>

                  <div className="section-content">
                    <InfoRow>
                      <div className="info-label">
                        <AccountBalanceOutlined />
                        Account Number
                      </div>
                      <div className="info-value">
                        {userData.bankDetails[0].accountNo.length === 0
                          ? "Not provided"
                          : userData.bankDetails[0].accountNo}
                        {userData.bankDetails[0].accountNo.length !== 0 && (
                          <Tooltip title="Copy to clipboard">
                            <CopyOutlined
                              className="copy-icon"
                              onClick={() =>
                                copyToClipBoard(
                                  userData.bankDetails[0].accountNo
                                )
                              }
                            />
                          </Tooltip>
                        )}
                      </div>
                    </InfoRow>

                    <InfoRow>
                      <div className="info-label">
                        <AccountBalanceOutlined />
                        IFSC Code
                      </div>
                      <div className="info-value">
                        {userData.bankDetails[0].ifsc.length === 0
                          ? "Not provided"
                          : userData.bankDetails[0].ifsc}
                        {userData.bankDetails[0].ifsc.length !== 0 && (
                          <Tooltip title="Copy to clipboard">
                            <CopyOutlined
                              className="copy-icon"
                              onClick={() =>
                                copyToClipBoard(userData.bankDetails[0].ifsc)
                              }
                            />
                          </Tooltip>
                        )}
                      </div>
                    </InfoRow>

                    <InfoRow>
                      <div className="info-label">
                        <AccountBalanceOutlined />
                        Bank Name
                      </div>
                      <div className="info-value">
                        {userData.bankDetails[0].bankName.length === 0
                          ? "Not provided"
                          : userData.bankDetails[0].bankName}
                      </div>
                    </InfoRow>

                    <InfoRow>
                      <div className="info-label">
                        <AccountBalanceOutlined />
                        UPI ID
                      </div>
                      <div className="info-value">
                        {userData.bankDetails[0].upi.length === 0
                          ? "Not provided"
                          : userData.bankDetails[0].upi}
                        {userData.bankDetails[0].upi.length !== 0 && (
                          <Tooltip title="Copy to clipboard">
                            <CopyOutlined
                              className="copy-icon"
                              onClick={() =>
                                copyToClipBoard(userData.bankDetails[0].upi)
                              }
                            />
                          </Tooltip>
                        )}
                      </div>
                    </InfoRow>
                  </div>
                </DetailSection>
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <VerifiedUserOutlined style={{ marginRight: 8 }} />
                    Documents
                  </span>
                }
                key="3"
              >
                <DetailSection
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <div className="section-header">
                    <h3>
                      <VerifiedUserOutlined />
                      Legal Documents
                    </h3>
                  </div>

                  <div className="section-content">
                    {userData.docs && (
                      <InfoRow>
                        <div className="info-label">
                          <VerifiedUserOutlined />
                          Agreement
                        </div>
                        <div className="info-value">
                          <Tooltip title="Download document">
                            <Link
                              to={`${process.env.REACT_APP_BASE_URL}/file/download/?filePath=${userData.docs}`}
                              target="_blank"
                              className="download-icon"
                            >
                              <DownloadOutlined
                                style={{ fontSize: "1.5rem" }}
                              />
                            </Link>
                          </Tooltip>
                        </div>
                      </InfoRow>
                    )}

                    <InfoRow>
                      <div className="info-label">
                        <VerifiedUserOutlined />
                        Signature
                      </div>
                      <div className="info-value">
                        <Tooltip title="Download signature">
                          <Link
                            to={`${process.env.REACT_APP_BASE_URL}/file/download/?filePath=${userData.sign}`}
                            target="_blank"
                            className="download-icon"
                          >
                            <DownloadOutlined style={{ fontSize: "1.5rem" }} />
                          </Link>
                        </Tooltip>
                      </div>
                    </InfoRow>
                  </div>
                </DetailSection>
              </TabPane>
            </DetailsTabs>
          </ContentDiv>
        )}
      </MainDiv>
    </>
  );
};

export default ProfilePage;
