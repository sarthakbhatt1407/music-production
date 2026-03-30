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
  overflow-y: auto;
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    height: auto;
    min-height: 100%;
  }
`;

const TableBox = styled.div`
  background-color: white;
  width: 100%;
  height: 80%;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow: scroll;
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    display: none;
  }
`;

// Mobile Components
const MobileContainer = styled.div`
  display: none;
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    display: block;
    padding: 0.5rem;
  }
`;

const NotificationCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const NotificationNumber = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  min-width: 24px;
  text-align: center;
`;

const NotificationDate = styled.div`
  color: #666;
  font-size: 12px;
  font-weight: 500;
`;

const NotificationDescription = styled.div`
  color: #333;
  font-size: 14px;
  line-height: 1.5;
  text-align: justify;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const MobilePagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  padding: 0 16px;
`;

const PageButton = styled.button`
  background: ${(props) => (props.disabled ? "#f5f5f5" : "#1976d2")};
  color: ${(props) => (props.disabled ? "#999" : "#fff")};
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  min-width: 70px;

  &:hover {
    background: ${(props) => (props.disabled ? "#f5f5f5" : "#1565c0")};
  }
`;

const PageInfo = styled.div`
  background: #f8f9fa;
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #e9ecef;
  color: #495057;
  font-size: 11px;
  font-weight: 600;
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

  // Mobile pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);

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

  // Mobile pagination handlers
  const totalPages = Math.ceil(notifications.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentNotifications = notifications.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
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

      {/* Mobile Card Layout */}
      <MobileContainer>
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <MusicLoader />
          </div>
        ) : notifications.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 16px" }}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No notifications found"
            />
          </div>
        ) : (
          <>
            {currentNotifications.map((notification, index) => (
              <NotificationCard key={notification.id}>
                <CardHeader>
                  <NotificationNumber>
                    #{startIndex + index + 1}
                  </NotificationNumber>
                  <NotificationDate>{notification.date}</NotificationDate>
                </CardHeader>
                <NotificationDescription>
                  {notification.des}
                </NotificationDescription>
              </NotificationCard>
            ))}

            {/* Mobile Pagination */}
            {totalPages > 1 && (
              <MobilePagination>
                <PageButton
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </PageButton>
                <PageInfo>
                  {currentPage} of {totalPages}
                </PageInfo>
                <PageButton
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </PageButton>
              </MobilePagination>
            )}
          </>
        )}
      </MobileContainer>

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
