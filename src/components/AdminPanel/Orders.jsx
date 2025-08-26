import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  EyeOutlined,
  ClockCircleOutlined,
  CheckCircleTwoTone,
  EditOutlined,
  CloseOutlined,
  SearchOutlined,
  ReloadOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import MusicLoader from "../Loader/MusicLoader";
import {
  Breadcrumb,
  Table,
  Input,
  Button,
  Space,
  Tag,
  Tooltip,
  Card,
  Image,
  Row,
  Col,
  Statistic,
  Empty,
} from "antd";
import { PersonOutline } from "@mui/icons-material";

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

const StatsContainer = styled.div`
  margin-bottom: 1.5rem;
  background: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const MobileBox = styled.div`
  display: none;

  @media only screen and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 24px;
  }
`;

const MobileOrderBox = styled(Card)`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  .ant-card-cover {
    display: flex;
    justify-content: center;
    padding: 16px;
    background: #f9fafb;

    img {
      max-width: 120px;
      border-radius: 8px;
      object-fit: cover;
    }
  }
`;

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:nth-child(2n) {
    background-color: #fafafc;
  }

  span {
    &:first-child {
      color: #666;
      font-weight: 500;
      font-size: 0.85rem;
    }

    &:last-child {
      color: #111;
      text-transform: capitalize;
    }
  }
`;

const Orders = () => {
  const userId = useSelector((state) => state.userId);
  const [orders, setOrders] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  // For table sorting and filtering
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const fetcher = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/order/get-all-orders/?userId=${userId}`
      );
      const data = await res.json();

      if (res.ok) {
        const sortedOrders = data.orders.reverse();
        setOrders(sortedOrders);
        setFilteredOrders(sortedOrders);
      } else {
        setOrders([]);
        setFilteredOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
      setFilteredOrders([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetcher();
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setSearchText(val);

    if (!orders) return;

    const filtered = orders.filter((ord) => {
      if (ord.title && ord.labelName) {
        return (
          ord.title.toString().toLowerCase().includes(val) ||
          ord.labelName.toString().toLowerCase().includes(val) ||
          (ord.language &&
            ord.language.toString().toLowerCase().includes(val)) ||
          (ord.albumType &&
            ord.albumType.toString().toLowerCase().includes(val))
        );
      }
      return false;
    });
    setFilteredOrders(filtered);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  // Get order statistics
  const getOrderStats = () => {
    if (!orders)
      return { waiting: 0, processing: 0, completed: 0, rejected: 0, total: 0 };

    const stats = {
      waiting: 0,
      processing: 0,
      completed: 0,
      rejected: 0,
      total: 0,
    };

    orders.forEach((order) => {
      if (!order.deleted) {
        stats.total++;
        if (order.status === "waiting") stats.waiting++;
        if (order.status === "processing") stats.processing++;
        if (order.status === "completed") stats.completed++;
        if (order.status === "rejected") stats.rejected++;
      }
    });

    return stats;
  };

  const orderStats = getOrderStats();

  // Filter for pending orders (waiting status, not deleted)
  const getPendingOrders = () => {
    if (!filteredOrders) return [];

    return filteredOrders
      .filter((order) => !order.deleted && order.status === "waiting")
      .map((order) => ({
        ...order,
        key: order.id,
        thumbnail: order.thumbnail?.includes("cloudinary")
          ? order.thumbnail
          : `${process.env.REACT_APP_BASE_URL}/${order.thumbnail}`,
      }));
  };

  const pendingOrders = getPendingOrders();

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: 100,
      render: (thumbnail) => (
        <Image
          src={thumbnail}
          alt="Album Cover"
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
            borderRadius: "4px",
          }}
          preview={false}
        />
      ),
    },
    {
      title: "Album",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortOrder: sortedInfo.columnKey === "title" && sortedInfo.order,
      render: (title) => (
        <span style={{ textTransform: "capitalize" }}>
          {title?.toLowerCase()}
        </span>
      ),
    },
    {
      title: "Label",
      dataIndex: "labelName",
      key: "labelName",
      sorter: (a, b) => a.labelName.localeCompare(b.labelName),
      sortOrder: sortedInfo.columnKey === "labelName" && sortedInfo.order,
      render: (labelName) => (
        <span style={{ textTransform: "capitalize" }}>
          {labelName?.toLowerCase()}
        </span>
      ),
    },
    {
      title: "Album Type",
      dataIndex: "albumType",
      key: "albumType",
      filters: [
        { text: "Single", value: "Single" },
        { text: "EP", value: "EP" },
        { text: "Album", value: "Album" },
      ],
      filteredValue: filteredInfo.albumType || null,
      onFilter: (value, record) => record.albumType === value,
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      filters: [
        { text: "English", value: "English" },
        { text: "Hindi", value: "Hindi" },
        { text: "Punjabi", value: "Punjabi" },
      ],
      filteredValue: filteredInfo.language || null,
      onFilter: (value, record) => record.language === value,
    },
    {
      title: "Created",
      dataIndex: "orderDateAndTime",
      key: "orderDateAndTime",
      render: (date) => date?.split("/")[0],
      sorter: (a, b) => {
        if (!a.orderDateAndTime || !b.orderDateAndTime) return 0;
        return new Date(a.orderDateAndTime) - new Date(b.orderDateAndTime);
      },
      sortOrder:
        sortedInfo.columnKey === "orderDateAndTime" && sortedInfo.order,
    },
    {
      title: "Release Date",
      dataIndex: "dateOfRelease",
      key: "dateOfRelease",
      sorter: (a, b) => {
        if (!a.dateOfRelease || !b.dateOfRelease) return 0;
        return new Date(a.dateOfRelease) - new Date(b.dateOfRelease);
      },
      sortOrder: sortedInfo.columnKey === "dateOfRelease" && sortedInfo.order,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color, icon, text;

        switch (status) {
          case "waiting":
            color = "gold";
            icon = <ClockCircleOutlined />;
            text = "Waiting for Approval";
            break;
          case "processing":
            color = "blue";
            icon = <EditOutlined />;
            text = "Processing";
            break;
          case "completed":
            color = "green";
            icon = <CheckCircleTwoTone twoToneColor="#52c41a" />;
            text = "Completed";
            break;
          case "rejected":
            color = "red";
            icon = <CloseOutlined />;
            text = "Rejected";
            break;
          default:
            color = "default";
            text = status;
        }

        return (
          <Tag
            color={color}
            style={{
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              justifyContent: "center",
            }}
          >
            {icon} {text}
          </Tag>
        );
      },
    },
    {
      title: "User",
      key: "userId",
      dataIndex: "userId",
      width: 80,
      render: (userId) => (
        <Tooltip title="View User Profile">
          <Link to={`/admin-panel/user-profile/${userId}`}>
            <Button
              type="text"
              icon={<PersonOutline style={{ fontSize: "1.2rem" }} />}
            />
          </Link>
        </Tooltip>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 80,
      render: (_, record) => (
        <Tooltip title="View Order Details">
          <Link to={`/admin-panel/order/${record.id}`}>
            <Button type="primary" icon={<EyeOutlined />} size="small" />
          </Link>
        </Tooltip>
      ),
    },
  ];

  return (
    <MainBox>
      <HeaderBox>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 600, margin: 0 }}>
          Pending Orders
        </h1>
        <Input
          placeholder="Search by album, label, language..."
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          value={searchText}
          onChange={handleSearch}
          allowClear
        />
      </HeaderBox>

      {/* Search and Control Buttons */}
      <ControlBar></ControlBar>

      {/* Desktop Table View */}
      <div
        style={{
          display: "block",
          "@media (max-width: 1000px)": { display: "none" },
        }}
      >
        <Table
          columns={columns}
          dataSource={pendingOrders}
          loading={isLoading}
          onChange={handleTableChange}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
            showTotal: (total) => `Total ${total} orders`,
          }}
          scroll={{ x: 1200 }}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  searchText
                    ? "No orders matching your search"
                    : "No pending orders"
                }
              />
            ),
          }}
        />
      </div>

      {/* Mobile Cards View */}
      <MobileBox>
        {pendingOrders.length > 0 ? (
          pendingOrders.map((order) => (
            <MobileOrderBox
              key={order.id}
              cover={<img alt={order.title} src={order.thumbnail} />}
            >
              <TextBox>
                <span>Title</span>
                <span>{order.title}</span>
              </TextBox>
              <TextBox>
                <span>Label</span>
                <span>{order.labelName}</span>
              </TextBox>
              <TextBox>
                <span>Status</span>
                <span>
                  <Tag
                    color="gold"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <ClockCircleOutlined /> Waiting
                  </Tag>
                </span>
              </TextBox>
              <TextBox>
                <span>Release Date</span>
                <span>{order.dateOfRelease}</span>
              </TextBox>
              <TextBox>
                <span>Language</span>
                <span>{order.language}</span>
              </TextBox>
              <TextBox>
                <span>Album Type</span>
                <span>{order.albumType}</span>
              </TextBox>
              <TextBox>
                <span>Created</span>
                <span>{order.orderDateAndTime?.split("/")[0]}</span>
              </TextBox>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "16px",
                }}
              >
                <Link to={`/admin-panel/user-profile/${order.userId}`}>
                  <Button icon={<PersonOutline />}>User</Button>
                </Link>
                <Link to={`/admin-panel/order/${order.id}`}>
                  <Button type="primary" icon={<EyeOutlined />}>
                    View Details
                  </Button>
                </Link>
              </div>
            </MobileOrderBox>
          ))
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              searchText
                ? "No orders matching your search"
                : "No pending orders"
            }
          />
        )}
      </MobileBox>
    </MainBox>
  );
};

export default Orders;
