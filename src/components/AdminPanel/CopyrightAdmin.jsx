import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  notification,
  message,
  Empty,
  Table,
  Space,
  Tag,
  Button,
  Tooltip,
} from "antd";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import {
  CheckCircleOutline,
  ContentCopyOutlined,
  DeleteForeverOutlined,
  InsertLink,
  PersonOutline,
} from "@mui/icons-material";
import {
  ClockCircleOutlined,
  CheckCircleTwoTone,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import MusicLoader from "../Loader/MusicLoader";

const MainBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: hidden;
`;

const TableBox = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
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
  button {
    background-color: #1677ff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.09rem;
  }
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    flex-direction: column;
    justify-content: start;
    padding: 0;
    align-items: start;
    margin-bottom: 1rem;
  }
`;

const StatusTag = styled(Tag)`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const CopyrightAdmin = () => {
  const defaultF = {
    link: "",
    platform: "",
  };

  const [api, contextHolderNot] = notification.useNotification({
    duration: 1.5,
  });

  const openNotificationWithIcon = (type, msg) => {
    api[type]({
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

  const [inpFields, setInpFields] = useState(defaultF);
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state.userId);
  const [queries, setQueries] = useState([]);
  const [refresher, setRefresher] = useState(0);

  // Set up state for table filtering and sorting
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const fetcher = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/copyright/get-all-query`
      );
      const data = await res.json();

      if (res.ok) {
        const filteredQueries = data.cQueries
          .filter((q) => !q.deleted)
          .reverse();
        setQueries(filteredQueries);
      } else {
        error("Failed to fetch copyright queries");
      }
    } catch (err) {
      error("Error connecting to server");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetcher();
  }, [userId, refresher]);

  const copyToClipBoard = async (txt) => {
    try {
      await navigator.clipboard.writeText(txt);
      openNotificationWithIcon("success", "Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const confirm = async (id) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/copyright/update-query/?id=${id}&action=resolved`,
        {
          method: "PATCH",
        }
      );

      if (res.ok) {
        success("Query marked as resolved");
        setTimeout(() => {
          setRefresher((prev) => prev + 1);
        }, 500);
      } else {
        error("Failed to update query status");
      }
    } catch (err) {
      error("Error connecting to server");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
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
      title: "Platform",
      dataIndex: "platform",
      key: "platform",
      sorter: (a, b) => a.platform.localeCompare(b.platform),
      sortOrder: sortedInfo.columnKey === "platform" && sortedInfo.order,
      filters: [...new Set(queries.map((q) => q.platform))].map((platform) => ({
        text: platform,
        value: platform,
      })),
      filteredValue: filteredInfo.platform || null,
      onFilter: (value, record) => record.platform === value,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      sorter: (a, b) => a.userName.localeCompare(b.userName),
      sortOrder: sortedInfo.columnKey === "userName" && sortedInfo.order,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => {
        // Handle missing phone data safely
        if (!a.phone) return -1;
        if (!b.phone) return 1;
        return a.phone.toString().localeCompare(b.phone.toString());
      },
      sortOrder: sortedInfo.columnKey === "phone" && sortedInfo.order,
      render: (phone) => phone || "N/A", // Display N/A for missing phone data
      width: 120,
    },
    {
      title: "Created",
      dataIndex: "created",
      key: "created",
      render: (text) => text.split("/")[0],
      sorter: (a, b) => new Date(a.created) - new Date(b.created),
      sortOrder: sortedInfo.columnKey === "created" && sortedInfo.order,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === "pending" ? (
          <StatusTag color="warning">
            <ClockCircleOutlined /> Pending
          </StatusTag>
        ) : (
          <StatusTag color="success">
            <CheckCircleTwoTone twoToneColor="#52c41a" /> Resolved
          </StatusTag>
        ),
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Resolved", value: "resolved" },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "User",
      key: "user",
      render: (_, record) => (
        <Tooltip title="View User Profile">
          <Link to={`/admin-panel/user-profile/${record.userId}`}>
            <Button type="text" icon={<PersonOutline />} />
          </Link>
        </Tooltip>
      ),
    },
    {
      title: "View Content",
      key: "content",
      render: (_, record) => (
        <Tooltip title="View Content">
          <Link to={record.link} target="_blank">
            <Button type="text" icon={<InsertLink />} />
          </Link>
        </Tooltip>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.status === "pending" ? (
            <Tooltip title="Copy Link & Mark Resolved">
              <Button
                type="text"
                icon={<ContentCopyOutlined />}
                onClick={() => {
                  copyToClipBoard(record.link);
                  confirm(record.id);
                }}
              />
            </Tooltip>
          ) : (
            <span>Resolved</span>
          )}
        </Space>
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
            title: "Copyright",
          },
        ]}
      />
      <HeaderBox>
        <h1>Copyright</h1>
        <Button
          type="primary"
          onClick={() => {
            setSortedInfo({});
            setFilteredInfo({});
          }}
        >
          Clear filters
        </Button>
      </HeaderBox>
      <TableBox>
        <Table
          columns={columns}
          dataSource={queries}
          rowKey="id"
          loading={isLoading}
          onChange={handleTableChange}
          pagination={{
            pageSize: 6,
            showSizeChanger: true,
            showQuickJumper: true,
            position: ["bottomCenter"],
          }}
          scroll={{ x: 1000 }}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No copyright queries found"
              />
            ),
          }}
        />
      </TableBox>
    </MainBox>
  );
};

export default CopyrightAdmin;
