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
  notification,
  message,
  Select,
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

const History = () => {
  const [api, contextHolderNot] = notification.useNotification({
    duration: 1.5,
  });
  const [messageApi, contextHolder] = message.useMessage();

  const userId = useSelector((state) => state.userId);
  const [orders, setOrders] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // For table sorting and filtering
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  // Notification helpers
  const openNotificationWithIcon = (type, msg) => {
    api[type]({
      message: msg,
    });
  };

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

  // Fetch orders data
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
    } catch (err) {
      console.error("Error fetching orders:", err);
      error("Error fetching orders");
      setOrders([]);
      setFilteredOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetcher();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setSearchText(val);

    if (!orders) return;

    const filtered = orders.filter((ord) => {
      // Only check if the required fields exist
      if (ord.title && ord.labelName) {
        // Include UPC and ISRC in search if they exist
        return (
          ord.title.toString().toLowerCase().includes(val) ||
          ord.labelName.toString().toLowerCase().includes(val) ||
          (ord.language &&
            ord.language.toString().toLowerCase().includes(val)) ||
          (ord.albumType &&
            ord.albumType.toString().toLowerCase().includes(val)) ||
          (ord.upc && ord.upc.toString().toLowerCase().includes(val)) ||
          (ord.isrc && ord.isrc.toString().toLowerCase().includes(val))
        );
      }
      return false;
    });

    setFilteredOrders(filtered);
  };

  // Handle status filter change
  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
  };

  // Handle table change (sorting/filtering)
  const handleTableChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  // Get order statistics
  const getOrderStats = () => {
    if (!orders)
      return { completed: 0, takedown: 0, total: 0, pendingOrders: 0 };

    const stats = {
      completed: 0,
      takedown: 0,
      total: 0,
      pendingOrders: 0,
    };

    orders.forEach((order) => {
      if (!order.deleted) {
        stats.total++;
        if (order.status === "completed") stats.completed++;
        if (order.status === "takedown") stats.takedown++;
        if (order.status === "waiting" || order.status === "processing")
          stats.pendingOrders++;
      }
    });

    return stats;
  };

  const orderStats = getOrderStats();

  // Filter for history orders (completed or takedown, not deleted)
  const getHistoryOrders = () => {
    if (!filteredOrders) return [];

    return filteredOrders
      .filter((order) => {
        // Filter based on order status
        if (order.deleted) return false;

        if (statusFilter === "all") {
          return order.status === "completed" || order.status === "takedown";
        } else if (statusFilter === "completed") {
          return order.status === "completed";
        } else if (statusFilter === "takedown") {
          return order.status === "takedown";
        }

        return false;
      })
      .map((order) => ({
        ...order,
        key: order.id,
        thumbnail: order.thumbnail?.includes("cloudinary")
          ? order.thumbnail
          : `${process.env.REACT_APP_BASE_URL}/${order.thumbnail}`,
        releaseDate:
          order.dateLive && order.dateLive.length > 2
            ? order.dateLive
            : order.dateOfRelease,
      }));
  };

  const historyOrders = getHistoryOrders();

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
      title: "UPC",
      dataIndex: "upc",
      key: "upc",
      render: (upc) => upc || "-",
    },
    {
      title: "ISRC",
      dataIndex: "isrc",
      key: "isrc",
      render: (isrc) => isrc || "-",
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
      dataIndex: "releaseDate",
      key: "releaseDate",
      sorter: (a, b) => {
        if (!a.releaseDate || !b.releaseDate) return 0;
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      },
      sortOrder: sortedInfo.columnKey === "releaseDate" && sortedInfo.order,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color, icon, text;

        if (status === "completed") {
          color = "green";
          icon = <CheckCircleTwoTone twoToneColor="#52c41a" />;
          text = "Live";
        } else if (status === "takedown") {
          color = "red";
          icon = <CloseOutlined />;
          text = "Removed";
        } else {
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
      filters: [
        { text: "Live", value: "completed" },
        { text: "Removed", value: "takedown" },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status === value,
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
      {contextHolderNot}
      {contextHolder}

      <HeaderBox>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 600, margin: 0 }}>
          Order History
        </h1>
        <Input
          placeholder="Search by album, label, UPC, ISRC..."
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          value={searchText}
          onChange={handleSearch}
          allowClear
        />
      </HeaderBox>

      {/* Desktop Table View */}
      <div
        style={{
          display: "block",
          "@media (max-width: 1000px)": { display: "none" },
        }}
      >
        <Table
          columns={columns}
          dataSource={historyOrders}
          loading={isLoading}
          onChange={handleTableChange}
          pagination={{
            pageSize: 6,
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
                    : "No order history found"
                }
              />
            ),
          }}
        />
      </div>

      {/* Mobile Cards View */}
      <MobileBox>
        {historyOrders.length > 0 ? (
          historyOrders.map((order) => (
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
                  {order.status === "completed" ? (
                    <Tag
                      color="green"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <CheckCircleTwoTone twoToneColor="#52c41a" /> Live
                    </Tag>
                  ) : (
                    <Tag
                      color="red"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <CloseOutlined /> Removed
                    </Tag>
                  )}
                </span>
              </TextBox>
              {order.upc && (
                <TextBox>
                  <span>UPC</span>
                  <span>{order.upc}</span>
                </TextBox>
              )}
              {order.isrc && (
                <TextBox>
                  <span>ISRC</span>
                  <span>{order.isrc}</span>
                </TextBox>
              )}
              <TextBox>
                <span>Release Date</span>
                <span>{order.releaseDate}</span>
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
                : "No order history found"
            }
          />
        )}
      </MobileBox>
    </MainBox>
  );
};

export default History;
