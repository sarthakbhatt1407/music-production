import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import {
  Breadcrumb,
  message,
  Modal,
  Input as AntInput,
  Button,
  Table,
  Space,
  Tooltip,
  Form,
  Upload,
  Select,
  Descriptions,
} from "antd";
import {
  LoginOutlined,
  SearchOutlined,
  UploadOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Country, State } from "country-state-city";
import { MdDeleteOutline } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import MusicLoader from "../Loader/MusicLoader";

const MainBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  position: relative;
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 1rem;
  align-items: center;
  margin-bottom: 20px;
  gap: 1rem;

  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    flex-direction: column;
    justify-content: start;
    padding: 0;
    align-items: start;
    margin-bottom: 1rem;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  @media only screen and (min-width: 0px) and (max-width: 700px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;

    .ant-input-affix-wrapper,
    button {
      width: 100% !important;
    }
  }
`;

const OtpInput = styled(AntInput)`
  margin-bottom: 1rem;
`;

const UploadGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media only screen and (min-width: 0px) and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const DetailLink = styled.a`
  color: #1677ff;
  text-transform: none;
`;

const ManageUsers = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [refresher, setRefresher] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [userToDelete, setUserToDelete] = useState(null);
  const [receivedOtp, setReceivedOtp] = useState(null);

  const [sortedInfo, setSortedInfo] = useState({});

  const userId = useSelector((state) => state.userId);
  const phone = useSelector((state) => state.phone);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const validateImage = (file) => {
    let isValid =
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg";

    if (!isValid) {
      message.error("Only .png .jpeg .jpg is allowed");
      return Upload.LIST_IGNORE;
    }

    const fileMb = file.size / 1024 ** 2;
    if (fileMb > 2) {
      message.error("Photo size is greater than 2MB.");
      return Upload.LIST_IGNORE;
    }

    return false;
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const resetAddModal = () => {
    form.resetFields();
    setSelectedCountry("");
    setStateList([]);
    setIsAddModalVisible(false);
  };

  const fetchUsers = async () => {
    console.log(userId);

    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/child-users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            parentId: userId,
          }),
        },
      );
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        const filteredUsers = data.users
          .filter((user) => user.id !== userId)
          .reverse();
        setUsers(filteredUsers);
        setOriginalUsers(filteredUsers);
      } else {
        error(data.message || "Failed to fetch users");
      }
    } catch (err) {
      error("Error connecting to server");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchText) => {
    if (!searchText.trim()) {
      setUsers(originalUsers);
      return;
    }

    const lowercaseSearch = searchText.toLowerCase().trim();
    const filtered = originalUsers.filter(
      (user) =>
        user.name?.toLowerCase().includes(lowercaseSearch) ||
        user.email?.toLowerCase().includes(lowercaseSearch) ||
        (user.phone && user.phone.toString().includes(lowercaseSearch)),
    );

    setUsers(filtered);
  };

  const initiateDelete = async (user) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/order/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminId: userId,
            userToDeleteId: user.id,
            userName: user.name,
          }),
        },
      );
      const data = await res.json();

      if (data.sent) {
        setReceivedOtp(data.otp);
        setUserToDelete(user);
        setIsOtpModalVisible(true);
        success("OTP sent to your email");
      } else {
        error(data.message || "Failed to send OTP");
      }
    } catch (err) {
      error("Error sending OTP");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtpAndDelete = async () => {
    if (!otp || !userToDelete) return;

    setIsLoading(true);
    try {
      if (otp === receivedOtp?.toString()) {
        const deleteRes = await fetch(
          `${process.env.REACT_APP_BASE_URL}/user/delete-user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userToDelete.id,
            }),
          },
        );

        const deleteData = await deleteRes.json();

        if (deleteData.success) {
          success(deleteData.message || "User deleted successfully");
          setIsOtpModalVisible(false);
          setOtp("");
          setUserToDelete(null);
          setReceivedOtp(null);
          setRefresher((prev) => prev + 1);
        } else {
          error(deleteData.message || "Failed to delete user");
        }
      } else {
        error("Invalid OTP. Please try again.");
      }
    } catch (err) {
      error("Error processing request");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsUser = async (mob) => {
    setIsLoading(true);

    try {
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
        },
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
          },
        );
        const loginData = await loginRes.json();

        if (loginData.isloggedIn) {
          setTimeout(() => {
            if (!loginData.user.isAdmin) {
              dispatch({
                type: "log in",
                data: {
                  ...loginData,
                  type: "music-user",
                  adminView: false,
                  loggedUser: phone,
                  subUser: true,
                },
              });
              navigate("/user-panel/home");
            }
          }, 1000);
        }
      }
    } catch (err) {
      error("Login failed. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);
    setStateList(State.getStatesOfCountry(countryCode));
    form.setFieldsValue({ state: undefined });
  };

  const handleAddUser = async (values) => {
    const countryObj = countryList.find((c) => c.isoCode === values.country);
    const userPic = values.userPic?.[0]?.originFileObj;
    const sign = values.sign?.[0]?.originFileObj;

    if (!userPic || !sign) {
      error("Please upload channel logo and signature.");
      return;
    }

    setIsSubmitting(true);

    try {
      const resC = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/check-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contactNum: values.contactNum,
          }),
        },
      );

      const dataC = await resC.json();
      if (dataC.exists) {
        error("A user with this mobile number already exists.");
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      error("Error validating user. Please try again.");
      console.error(err);
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", values.fullName);
      formData.append("email", values.email);
      formData.append("password", "*******");
      formData.append("phone", values.contactNum);
      formData.append("city", values.city);
      formData.append("state", values.state);
      formData.append("country", countryObj ? countryObj.name : values.country);
      formData.append("channelUrl", values.channelUrl);
      formData.append("sign", sign);
      formData.append("userPic", userPic);
      formData.append("address", values.address);
      formData.append("pincode", values.pincode);
      formData.append("parentUser", userId);

      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/user/signup`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);

      if (res.ok && data.success) {
        success(data.message || "User added successfully");
        resetAddModal();
        setRefresher((prev) => prev + 1);
        // fetchUsers();
      } else {
        error(data.message || "Failed to add user");
      }
    } catch (err) {
      error("Error connecting to server");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  useEffect(() => {
    setCountryList(Country.getAllCountries());
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [refresher]);

  const columns = [
    {
      title: "#",
      key: "index",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order,
      render: (text) => <span style={{ textTransform: "none" }}>{text}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone - b.phone,
      sortOrder: sortedInfo.columnKey === "phone" && sortedInfo.order,
      render: (phone) => (
        <Space>
          {phone}
          <Tooltip title="Login as this user">
            <Button
              type="text"
              size="small"
              icon={<LoginOutlined style={{ color: "#1890ff" }} />}
              onClick={(e) => {
                e.stopPropagation();
                loginAsUser(phone);
              }}
            />
          </Tooltip>
          <Tooltip title="Chat on WhatsApp">
            <Button
              type="text"
              size="small"
              icon={<FaWhatsapp style={{ color: "#0BC144" }} />}
              onClick={(e) => {
                e.stopPropagation();
                const formattedPhone = phone.toString().replace(/\s+/g, "");
                window.open(`https://wa.me/${formattedPhone}`, "_blank");
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "Location",
      key: "location",
      render: (_, record) => (
        <span>
          {record.city}, {record.state}
        </span>
      ),
    },
    {
      title: "Since",
      dataIndex: "userSince",
      key: "userSince",
      sorter: (a, b) => new Date(a.userSince) - new Date(b.userSince),
      sortOrder: sortedInfo.columnKey === "userSince" && sortedInfo.order,
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      render: (text) => <span style={{ textTransform: "none" }}>{text}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View Profile">
            <Button
              type="text"
              icon={<RemoveRedEyeOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedUser(record);
                setIsDetailModalVisible(true);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <MainBox>
      {contextHolder}
      {isLoading && <MusicLoader />}

      <Breadcrumb
        items={[
          {
            title: "User Panel",
          },
          {
            title: "Manage Users",
          },
        ]}
      />

      <HeaderBox>
        <h1>Users</h1>
        <HeaderActions>
          <AntInput
            placeholder="Search by name, email or phone..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            onChange={(e) => handleSearch(e.target.value)}
            allowClear
          />
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => setIsAddModalVisible(true)}
          >
            Add New User
          </Button>
        </HeaderActions>
      </HeaderBox>

      <Modal
        title="Verify OTP"
        open={isOtpModalVisible}
        onCancel={() => {
          setIsOtpModalVisible(false);
          setOtp("");
          setUserToDelete(null);
          setReceivedOtp(null);
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setIsOtpModalVisible(false);
              setOtp("");
              setUserToDelete(null);
              setReceivedOtp(null);
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={verifyOtpAndDelete}
          >
            Verify & Delete
          </Button>,
        ]}
      >
        <p>
          An OTP has been sent to your email. Please enter it below to confirm
          deletion of user: <strong>{userToDelete?.name}</strong>
        </p>
        <OtpInput
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </Modal>

      <Modal
        title="Add New User"
        open={isAddModalVisible}
        onCancel={resetAddModal}
        footer={null}
        width={760}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddUser}
          requiredMark={false}
        >
          <Form.Item
            name="fullName"
            label="Label Name"
            rules={[
              { required: true, message: "Please enter label name" },
              { min: 4, message: "Label name must be at least 4 characters" },
            ]}
          >
            <AntInput placeholder="Label Name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter email" },
              {
                validator: (_, value) =>
                  !value || validateEmail(value)
                    ? Promise.resolve()
                    : Promise.reject(new Error("Please enter a valid email")),
              },
            ]}
          >
            <AntInput placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="contactNum"
            label="Mobile Number"
            rules={[
              { required: true, message: "Please enter mobile number" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Mobile number must be 10 digits",
              },
            ]}
          >
            <AntInput placeholder="Mobile Number" maxLength={10} />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[
              { required: true, message: "Please enter address" },
              { min: 4, message: "Address must be at least 4 characters" },
            ]}
          >
            <AntInput placeholder="Address" />
          </Form.Item>

          <Form.Item
            name="pincode"
            label="Pincode"
            rules={[
              { required: true, message: "Please enter pincode" },
              { pattern: /^[0-9]{6}$/, message: "Pincode must be 6 digits" },
            ]}
          >
            <AntInput placeholder="Pincode" maxLength={6} />
          </Form.Item>

          <Form.Item
            name="city"
            label="City"
            rules={[
              { required: true, message: "Please enter city" },
              { min: 4, message: "City must be at least 4 characters" },
            ]}
          >
            <AntInput placeholder="City" />
          </Form.Item>

          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: "Please select country" }]}
          >
            <Select
              showSearch
              placeholder="Select country"
              value={selectedCountry}
              onChange={handleCountryChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {countryList.map((country) => (
                <Select.Option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="state"
            label="State"
            rules={[{ required: true, message: "Please select state" }]}
          >
            <Select
              showSearch
              placeholder="Select state"
              disabled={!selectedCountry}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {stateList.map((state) => (
                <Select.Option key={state.isoCode} value={state.name}>
                  {state.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="channelUrl"
            label="Channel URL"
            rules={[
              { required: true, message: "Please enter channel URL" },
              { min: 10, message: "Please enter a valid channel URL" },
            ]}
          >
            <AntInput placeholder="Channel URL" />
          </Form.Item>

          <UploadGrid>
            <Form.Item
              name="userPic"
              label="Channel Logo"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: "Please upload logo" }]}
            >
              <Upload
                listType="picture"
                beforeUpload={validateImage}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>
                  Upload Channel Logo (Max 2MB)
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="sign"
              label="Signature"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: "Please upload signature" }]}
            >
              <Upload
                listType="picture"
                beforeUpload={validateImage}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>
                  Upload Signature (Max 2MB)
                </Button>
              </Upload>
            </Form.Item>
          </UploadGrid>

          <Space style={{ width: "100%", justifyContent: "flex-end" }}>
            <Button onClick={resetAddModal}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Submit
            </Button>
          </Space>
        </Form>
      </Modal>

      <Modal
        title="User Details"
        open={isDetailModalVisible}
        onCancel={() => {
          setIsDetailModalVisible(false);
          setSelectedUser(null);
        }}
        footer={null}
        width={760}
      >
        {selectedUser && (
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Label Name">
              {selectedUser.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              <span style={{ textTransform: "none" }}>
                {selectedUser.email}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {selectedUser.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {selectedUser.address || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Pincode">
              {selectedUser.pincode || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="City">
              {selectedUser.city || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="State">
              {selectedUser.state || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Country">
              {selectedUser.country || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Channel URL">
              {selectedUser.channelUrl ? (
                <DetailLink
                  href={selectedUser.channelUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Channel
                </DetailLink>
              ) : (
                "-"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {selectedUser.status || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Since">
              {selectedUser.userSince || "-"}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={isLoading}
        onChange={handleTableChange}
        pagination={{
          pageSize: 6,
          showSizeChanger: true,
          showQuickJumper: true,
          position: ["bottomCenter"],
        }}
        scroll={{ x: 1200 }}
      />
    </MainBox>
  );
};

export default ManageUsers;
