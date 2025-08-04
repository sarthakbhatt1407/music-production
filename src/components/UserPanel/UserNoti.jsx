import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  notification,
  message,
  Empty,
  Table,
  Typography,
} from "antd";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import MusicLoader from "../Loader/MusicLoader";

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
  overflow: scroll; // Changed from scroll to prevent double scrollbars
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

const DescriptionCell = styled.div`
  width: 100%;
  text-align: justify;
  white-space: pre-wrap;
  word-wrap: break-word;
  text-transform: none;
  padding: 10px;
`;

const UserNoti = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const error = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state.userId);
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

  const handleTableChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  // Define columns for the Table
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
  ];

  return (
    <MainBox>
      {contextHolder}

      <Breadcrumb
        items={[
          {
            title: "User Panel",
          },
          {
            title: "Notifications",
          },
        ]}
      />

      <HeaderBox>
        <Title level={2}>Notifications</Title>
      </HeaderBox>

      <TableBox>
        <Table
          columns={columns}
          dataSource={notifications}
          rowKey="id"
          loading={isLoading}
          onChange={handleTableChange}
          pagination={{
            pageSize: 6,
            showSizeChanger: true,
            showQuickJumper: true,
            position: ["bottomCenter"],
          }}
          rowClassName={(record, index) =>
            index % 2 === 0 ? "table-row-light" : "table-row-dark"
          }
          scroll={{ x: "100%" }}
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

export default UserNoti;
