import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  notification,
  message,
  Empty,
  Table,
  Space,
  Modal as AntModal,
  Button,
  Input,
  Typography,
  Popconfirm,
} from "antd";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import MusicLoader from "../Loader/MusicLoader";

const { TextArea } = Input;
const { Title } = Typography;

const MainBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: hidden;
`;

const TableBox = styled.div`
  background-color: white;
  width: 100%;
  height: 80%;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow: scroll; // Changed from potential overflow: scroll
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    padding: 0.5rem;
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

const FormItemStyled = styled.div`
  margin-bottom: 24px;
  width: 100%;
`;

const DescriptionCell = styled.div`
  width: 100%;
  text-align: justify;
  white-space: pre-wrap;
  word-wrap: break-word;
  text-transform: none;
  padding: 10px;
`;

const Notification = () => {
  const [notificationApi, contextHolderNot] = notification.useNotification({
    duration: 1.5,
  });

  const openNotificationWithIcon = (type, msg) => {
    notificationApi[type]({
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

  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state.userId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [refresher, setRefresher] = useState(0);
  const [sortedInfo, setSortedInfo] = useState({});

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/notification/get-all`
      );
      const data = await res.json();

      if (data.success) {
        setNotifications(data.notifications.reverse());
      } else {
        error("Failed to fetch notifications");
      }
    } catch (err) {
      error("Error connecting to server");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [userId, refresher]);

  const handleAddNotification = async () => {
    if (!description.trim()) {
      error("Please enter a description");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/notification/add-notification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            des: description,
            id: userId,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        success(data.message || "Notification added successfully");
        setDescription("");
        setIsModalOpen(false);
        setRefresher((prev) => prev + 1);
      } else {
        error(data.message || "Failed to add notification");
      }
    } catch (err) {
      error("Error connecting to server");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNotification = async (id) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/notification/delete-notification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      const data = await res.json();

      if (data.success) {
        success(data.message || "Notification deleted successfully");
        setTimeout(() => {
          setRefresher((prev) => prev + 1);
        }, 600);
      } else {
        error(data.message || "Failed to delete notification");
      }
    } catch (err) {
      error("Error connecting to server");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "#",
      key: "index",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Description",
      dataIndex: "des",
      key: "des",
      width: "50%",
      render: (text) => <DescriptionCell>{text}</DescriptionCell>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortOrder: sortedInfo.columnKey === "date" && sortedInfo.order,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Delete Notification"
          description="Are you sure you want to delete this notification?"
          onConfirm={() => handleDeleteNotification(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <MainBox>
      {contextHolderNot}
      {contextHolder}

      <Breadcrumb
        items={[
          {
            title: "Admin Panel",
          },
          {
            title: "Notifications",
          },
        ]}
      />

      <HeaderBox>
        <Title level={2}>Notifications</Title>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add New Notification
        </Button>
      </HeaderBox>

      <TableBox>
        <Table
          columns={columns}
          dataSource={notifications}
          rowKey="id"
          loading={isLoading}
          onChange={handleTableChange}
          pagination={{
            pageSize: 6, // Increased from 2 to show more items per page
            showSizeChanger: true,
            showQuickJumper: true,
            position: ["bottomCenter"],
          }}
          rowClassName={(record, index) =>
            index % 2 === 0 ? "table-row-light" : "table-row-dark"
          }
          scroll={{ x: "100%" }} // Changed from fixed 1000px to responsive
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No notifications found"
              />
            ),
          }}
        />
      </TableBox>

      <AntModal
        title="Add New Notification"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={handleAddNotification}
          >
            Submit
          </Button>,
        ]}
        width={700}
      >
        <FormItemStyled>
          <label
            htmlFor="description"
            style={{ display: "block", marginBottom: "8px" }}
          >
            Description
          </label>
          <TextArea
            id="description"
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter notification text here..."
          />
        </FormItemStyled>
      </AntModal>

      <style jsx global>{`
        .table-row-light {
          background-color: #ffffff;
        }
        .table-row-dark {
          background-color: #f9f9f9;
        }
        .table-row-light:hover,
        .table-row-dark:hover {
          background-color: #f0f7ff !important;
        }
      `}</style>
    </MainBox>
  );
};

export default Notification;
