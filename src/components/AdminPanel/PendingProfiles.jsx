import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  CheckCircleOutlined,
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import MusicLoader from "../Loader/MusicLoader";
import {
  Breadcrumb,
  Button,
  Empty,
  message,
  Popconfirm,
  Table,
  Input as AntInput,
  Card,
  Avatar,
  Upload,
  Modal as AntModal,
  Space,
  Tooltip,
  Typography,
} from "antd";

const { Title, Text } = Typography;
const { Search } = AntInput;

const MainBox = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  position: relative;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  a {
    color: #1677ff;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #4096ff;
    }
  }
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const StyledSearch = styled(Search)`
  width: 300px;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const MobileCardView = styled.div`
  display: none;

  @media only screen and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const UserCard = styled(Card)`
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .ant-card-meta-title {
    margin-bottom: 4px;
  }

  .ant-card-actions {
    border-radius: 0 0 8px 8px;
  }
`;

const TableContainer = styled.div`
  @media only screen and (max-width: 1000px) {
    display: none;
  }
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const StyledUpload = styled(Upload)`
  width: 100%;

  .ant-upload {
    width: 100%;
  }
`;

const PendingProfile = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refresher, setRefresher] = useState(0);
  const userId = useSelector((state) => state.userId);

  const showSuccess = (msg) => {
    messageApi.success(msg);
  };

  const showError = (msg) => {
    messageApi.error(msg);
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/get-pending-user/?id=${userId}`
      );
      const data = await res.json();

      if (res.ok) {
        const sortedUsers = data.users.reverse();
        setUsers(sortedUsers);
        setFilteredUsers(sortedUsers);
      } else {
        showError("Failed to fetch users");
      }
    } catch (error) {
      showError("Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (value) => {
    const searchTerm = value.trim().toLowerCase();
    if (!searchTerm) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.phone.toString().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filtered);
  };

  const handleApproveUser = (userId) => {
    setSelectedUser(userId);
    setIsModalVisible(true);
  };

  const handleDeleteUser = async (userId) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/delete-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        showSuccess(data.message);
        setRefresher((prev) => prev + 1);
      } else {
        showError(data.message);
      }
    } catch (error) {
      showError("Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadDocument = async () => {
    if (!pdfFile) {
      showError("Please select a PDF file");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("doc", pdfFile);
      formData.append("userId", selectedUser);
      formData.append("adminId", userId);

      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/legal-doc`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (res.ok) {
        showSuccess(data.message);
        setIsModalVisible(false);
        setRefresher((prev) => prev + 1);
      } else {
        showError(data.message);
      }
    } catch (error) {
      showError("Upload failed. Please try again.");
    } finally {
      setPdfFile(null);
      setIsLoading(false);
    }
  };

  const beforeUpload = (file) => {
    const isPDF = file.type === "application/pdf";
    if (!isPDF) {
      showError("You can only upload PDF files!");
      return Upload.LIST_IGNORE;
    }
    setPdfFile(file);
    return false;
  };

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
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => <span style={{ textTransform: "none" }}>{email}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Location",
      key: "location",
      render: (_, record) => (
        <Tooltip title={`${record.address}, ${record.city}, ${record.state}`}>
          <span>
            {record.city}, {record.state}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Since",
      dataIndex: "userSince",
      key: "userSince",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View Profile">
            <Button
              type="link"
              icon={<EyeOutlined />}
              href={`/admin-panel/user-profile/${record.id}`}
            />
          </Tooltip>
          <Tooltip title="Approve">
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={() => handleApproveUser(record.id)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete User"
            description="Are you sure you want to delete this user?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, [refresher]);

  const renderUserCards = () => {
    if (isLoading) return <MusicLoader />;
    if (!filteredUsers.length)
      return <Empty description="No pending labels found" />;

    return filteredUsers.map((user) => {
      if (userId === user.id) return null;

      return (
        <UserCard
          key={user.id}
          actions={[
            <Tooltip title="View Profile">
              <Link to={`/admin-panel/user-profile/${user.id}`}>
                <EyeOutlined key="view" />
              </Link>
            </Tooltip>,
            <Tooltip title="Approve">
              <CheckCircleOutlined
                key="approve"
                onClick={() => handleApproveUser(user.id)}
                style={{ color: "#52c41a" }}
              />
            </Tooltip>,
            <Popconfirm
              title="Delete User"
              description="Are you sure you want to delete this user?"
              onConfirm={() => handleDeleteUser(user.id)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined key="delete" style={{ color: "#ff4d4f" }} />
            </Popconfirm>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{user.name[0]}</Avatar>}
            title={user.name}
            description={
              <Space direction="vertical" size={1}>
                <Text type="secondary">{user.email}</Text>
                <Text type="secondary">{user.phone}</Text>
                <Text type="secondary">
                  {user.city}, {user.state}
                </Text>
                <Text type="secondary">Since: {user.userSince}</Text>
              </Space>
            }
          />
        </UserCard>
      );
    });
  };

  return (
    <MainBox>
      {contextHolder}
      <Breadcrumb
        items={[
          { title: <Link to="/admin-panel">Admin Panel</Link> },
          { title: "Labels" },
        ]}
      />

      <HeaderBox>
        <Title level={2}>Pending Labels</Title>
        <StyledSearch
          placeholder="Search by name, email, or phone"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </HeaderBox>

      <TableContainer>
        <Table
          columns={columns}
          dataSource={filteredUsers.filter((user) => user.id !== userId)}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
        />
      </TableContainer>

      <MobileCardView>{renderUserCards()}</MobileCardView>

      <AntModal
        title="Upload Legal Document"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setPdfFile(null);
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setIsModalVisible(false);
              setPdfFile(null);
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={handleUploadDocument}
            disabled={!pdfFile}
          >
            Submit
          </Button>,
        ]}
      >
        <UploadContainer>
          <StyledUpload
            name="doc"
            beforeUpload={beforeUpload}
            maxCount={1}
            accept="application/pdf"
            showUploadList={{
              showRemoveIcon: true,
              removeIcon: <DeleteOutlined />,
            }}
            onRemove={() => setPdfFile(null)}
          >
            <Button icon={<FileAddOutlined />} size="large" block>
              {pdfFile ? "Change PDF File" : "Select PDF File"}
            </Button>
          </StyledUpload>
          <Text type="secondary">
            Please upload the legal document in PDF format
          </Text>
        </UploadContainer>
      </AntModal>
    </MainBox>
  );
};

export default PendingProfile;
