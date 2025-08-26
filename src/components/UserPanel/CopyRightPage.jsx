import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Select,
  Empty,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input as AntInput,
  notification,
  message,
  Tooltip,
  Space,
  Card,
  Popconfirm,
} from "antd";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { Delete, OpenInNew } from "@mui/icons-material";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
  HomeOutlined,
  CopyrightOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import MusicLoader from "../Loader/MusicLoader";

const MainBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 1.5rem;
  background-color: #f7f9fc;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media only screen and (max-width: 1000px) {
    padding: 1rem;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  h1 {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0;
    color: #333;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    h1 {
      font-size: 1.5rem;
    }
  }
`;

const ContentCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  .ant-card-body {
    padding: 0;
  }

  .ant-table-wrapper {
    border-radius: 12px;
    overflow: hidden;
  }

  .ant-table-thead > tr > th {
    background-color: #f4f6f9;
    color: #6c757d;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .ant-table-tbody > tr:hover > td {
    background-color: #f8fafc;
  }

  .ant-empty {
    padding: 2.5rem 0;
  }
`;

const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 8px;

  &.ant-btn-primary {
    background-color: #1677ff;
    border-color: #1677ff;

    &:hover {
      background-color: #0958d9;
      border-color: #0958d9;
    }
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
    overflow: hidden;
  }

  .ant-modal-header {
    margin-bottom: 1.5rem;
  }

  .ant-modal-title {
    font-size: 1.2rem;
    font-weight: 600;
  }

  .ant-form-item-label > label {
    font-weight: 500;
  }
`;

const CopyRightPage = () => {
  const [form] = Form.useForm();
  const [api, contextHolderNot] = notification.useNotification();
  const [messageApi, contextHolder] = message.useMessage();

  const openNotificationWithIcon = (type, msg) => {
    api[type]({
      message: type === "success" ? "Success" : "Error",
      description: msg,
      placement: "topRight",
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

  const [isLoading, setIsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const userId = useSelector((state) => state.userId);
  const [showModal, setShowModal] = useState(false);
  const [queries, setQueries] = useState([]);
  const [refresher, setRefresher] = useState(0);

  const fetcher = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/copyright/get-all-user-query/?userId=${userId}`
      );
      const data = await res.json();
      if (res.ok) {
        const activeQueries = data.cQueries.filter((q) => q.deleted !== true);
        setQueries(activeQueries.reverse());
      } else {
        error("Failed to load copyright queries");
      }
    } catch (err) {
      console.error("Error fetching queries:", err);
      error("Failed to load copyright queries");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, refresher]);

  const handleOpenModal = () => {
    form.resetFields();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/copyright/create-new-query`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, userId: userId }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        openNotificationWithIcon("success", data.message);
        form.resetFields();
        setShowModal(false);
        setRefresher((prev) => prev + 1);
      } else {
        openNotificationWithIcon(
          "error",
          data.message || "Failed to create query"
        );
      }
    } catch (err) {
      console.error("Error submitting query:", err);
      openNotificationWithIcon(
        "error",
        "An error occurred while submitting your query"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/copyright/update-query/?id=${id}&action=delete`,
        { method: "PATCH" }
      );
      const data = await res.json();
      if (res.ok) {
        success(data.message || "Claim deleted");
        setRefresher((prev) => prev + 1);
      } else {
        error(data.message || "Failed to delete claim");
      }
    } catch (err) {
      error("Error deleting claim");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Platform",
      dataIndex: "platform",
      key: "platform",
      render: (platform) => (
        <Tag
          color={platform === "Youtube" ? "red" : "blue"}
          style={{ padding: "4px 12px", borderRadius: "4px" }}
        >
          {platform}
        </Tag>
      ),
    },
    {
      title: "Created",
      dataIndex: "created",
      key: "created",
      render: (created) => created.split("/")[0],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color, icon, text;

        switch (status) {
          case "pending":
            color = "gold";
            icon = <ClockCircleOutlined />;
            text = "Pending";
            break;
          case "resolved":
            color = "green";
            icon = <CheckCircleOutlined />;
            text = "Resolved";
            break;
          case "rejected":
            color = "red";
            icon = <CloseCircleOutlined />;
            text = "Rejected";
            break;
          default:
            color = "default";
            text = "Unknown";
        }

        return (
          <Tag
            color={color}
            style={{ padding: "4px 12px", borderRadius: "4px" }}
          >
            <Space>
              {icon}
              {text}
            </Space>
          </Tag>
        );
      },
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
      render: (remark, record) =>
        record.status === "rejected" && remark ? (
          <span style={{ color: "#ff4d4f" }}>{remark}</span>
        ) : (
          "-"
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Tooltip title="View Content">
            <Link to={record.link} target="_blank">
              <Button type="text" icon={<OpenInNew />} />
            </Link>
          </Tooltip>
          <Popconfirm
            title="Delete Claim"
            description="Are you sure you want to delete this claim?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="text">
              <Button type="text" icon={<Delete />} />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const tableData = queries
    .filter((q) => q.deleted !== true)
    .map((q, index) => ({
      key: q.id,
      ...q,
    }));

  return (
    <MainBox>
      {contextHolderNot}
      {contextHolder}

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
          { title: "Copyright" },
        ]}
        style={{ marginBottom: "0.5rem" }}
      />

      <PageHeader>
        <h1>
          <CopyrightOutlined />
          Copyright Claims
        </h1>
        <ActionButton
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpenModal}
        >
          New Claim
        </ActionButton>
      </PageHeader>

      <ContentCard>
        {isLoading ? (
          <div
            style={{
              padding: "2rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <MusicLoader />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={tableData}
            rowKey="key"
            pagination={{
              pageSize: 10,
              hideOnSinglePage: true,
              showSizeChanger: false,
            }}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No copyright claims found"
                />
              ),
            }}
          />
        )}
      </ContentCard>

      <StyledModal
        title="Create New Copyright Claim"
        open={showModal}
        onCancel={handleCloseModal}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ platform: "Youtube", link: "" }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="platform"
            label="Platform"
            rules={[{ required: true, message: "Please select a platform" }]}
          >
            <Select>
              <Select.Option value="Youtube">Youtube</Select.Option>
              <Select.Option value="Facebook">Facebook</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="link"
            label="Content Link"
            rules={[
              { required: true, message: "Please enter a valid link" },
              { type: "url", message: "Please enter a valid URL" },
            ]}
          >
            <AntInput placeholder="https://..." />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: "1.5rem" }}>
            <Space style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </StyledModal>
    </MainBox>
  );
};

export default CopyRightPage;
