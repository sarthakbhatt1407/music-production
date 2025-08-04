import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import MusicLoader from "../Loader/MusicLoader";
import {
  Breadcrumb,
  message,
  Modal,
  Input as AntInput,
  Button,
  Table,
  Space,
  Tag,
  Tooltip,
} from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { SearchOutlined } from "@ant-design/icons";

const MainBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  position: relative;
  a {
    color: black;
    text-decoration: none;
  }
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 1rem;
  align-items: center;
  margin-bottom: 20px;
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    flex-direction: column;
    justify-content: start;
    padding: 0;
    align-items: start;
    margin-bottom: 1rem;
  }
`;

const OtpInput = styled(AntInput)`
  margin-bottom: 1rem;
`;

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]); // Store original list for filtering
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state.userId);
  const [refresher, setRefresher] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  // States for OTP verification
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [userToDelete, setUserToDelete] = useState(null);
  const [receivedOtp, setReceivedOtp] = useState(null); // Store OTP received from server

  // Set up state for table filtering and sorting
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

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

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/get-all-user/?id=${userId}`
      );
      const data = await res.json();

      if (res.ok) {
        const filteredUsers = data.users
          .filter((user) => user.id !== userId)
          .reverse();
        setUsers(filteredUsers);
        setOriginalUsers(filteredUsers); // Store original list
      } else {
        error("Failed to fetch users");
      }
    } catch (err) {
      error("Error connecting to server");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle search across multiple fields
  const handleSearch = (searchText) => {
    if (!searchText.trim()) {
      // If search is empty, restore original list
      setUsers(originalUsers);
      return;
    }

    const lowercaseSearch = searchText.toLowerCase().trim();

    // Filter across name, email, and phone
    const filtered = originalUsers.filter(
      (user) =>
        user.name?.toLowerCase().includes(lowercaseSearch) ||
        user.email?.toLowerCase().includes(lowercaseSearch) ||
        (user.phone && user.phone.toString().includes(lowercaseSearch))
    );

    setUsers(filtered);
  };

  // Function to initiate delete and send OTP
  const initiateDelete = async (user) => {
    setIsLoading(true);
    try {
      // Connect to the updated OTP endpoint
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
        }
      );
      const data = await res.json();

      if (data.sent) {
        setReceivedOtp(data.otp); // Store OTP for verification
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

  // Function to verify OTP and delete user
  const verifyOtpAndDelete = async () => {
    if (!otp || !userToDelete) return;

    setIsLoading(true);
    try {
      // Check if entered OTP matches the one received from server
      if (otp === receivedOtp.toString()) {
        // If OTP matches, proceed with deletion
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
          }
        );

        const deleteData = await deleteRes.json();

        if (deleteData.success) {
          success(deleteData.message || "User deleted successfully");
          setIsOtpModalVisible(false);
          setOtp("");
          setUserToDelete(null);
          setReceivedOtp(null);

          // Refresh the user list
          setTimeout(() => {
            setRefresher((prev) => prev + 1);
          }, 600);
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

  useEffect(() => {
    fetchUsers();
  }, [refresher]);

  const handleTableChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  // Define table columns
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
            <Link to={`/admin-panel/user-profile/${record.id}`}>
              <Button type="text" icon={<RemoveRedEyeOutlined />} />
            </Link>
          </Tooltip>
          <Tooltip title="Delete User">
            <Button
              type="text"
              danger
              icon={<MdDeleteOutline style={{ fontSize: "1.2rem" }} />}
              onClick={() => initiateDelete(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <MainBox>
      {contextHolder}
      <Breadcrumb
        items={[
          {
            title: "Admin Panel",
          },
          {
            title: "Users",
          },
        ]}
      />

      <HeaderBox>
        <h1>Users</h1>
        <AntInput
          placeholder="Search by name, email or phone..."
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
        />
      </HeaderBox>

      {/* OTP Verification Modal */}
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
          An OTP has been sent to the admin email. Please enter it below to
          confirm deletion of user: <strong>{userToDelete?.name}</strong>
        </p>
        <OtpInput
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
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

export default AllUsers;
