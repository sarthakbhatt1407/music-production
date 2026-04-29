import React, { useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  Button,
  Empty,
  Form,
  Input,
  Modal,
  Row,
  Col,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import { PlusOutlined, LinkOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import QueryShell from "./QueryShell";
import MusicLoader from "../../Loader/MusicLoader";

const { Text } = Typography;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageWrap = styled.div`
  position: relative;
  min-height: 420px;
`;

const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  animation: ${fadeInUp} 0.35s ease both;

  h2 {
    margin: 0;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #111827;
  }

  p {
    margin: 0.25rem 0 0;
    color: #667085;
  }
`;

const TableCard = styled.div`
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #e6ebf3;
  border-radius: 14px;
  padding: 1rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.35s ease 0.05s both;
`;

const TableTools = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const ModalBody = styled.div`
  position: relative;
  min-height: 240px;

  .ant-form-item-label > label {
    color: #475467;
    font-weight: 500;
  }
`;

const LinkCell = styled.a`
  color: #1677ff;
  word-break: break-word;
`;

const YoutubeOacRequest = ({
  backTo = "/user-panel/form-query",
  title = "YouTube OAC Request",
  description = "Submit channel details and three ISRCs, then review previous requests below.",
}) => {
  const [form] = Form.useForm();
  const id = useSelector((state) => state.userId);

  const [tableLoading, setTableLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiBase = useMemo(
    () => `${process.env.REACT_APP_BASE_URL}/form-query`,
    [],
  );

  const fetchRecords = async () => {
    if (!id) return;

    setTableLoading(true);
    try {
      const res = await fetch(`${apiBase}/get-youtube-oac-by-user-id/${id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to fetch submitted forms");
      }

      setRecords(
        Array.isArray(data?.youtubeOacData) ? data.youtubeOacData : [],
      );
    } catch (error) {
      console.error("Error fetching youtube OAC forms:", error);
      message.error(error.message || "Unable to load submitted forms");
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [id]);

  const handleOpenModal = () => {
    form.setFieldsValue({
      artistName: "",
      isrc1: "",
      isrc2: "",
      isrc3: "",
      youtubeUrl: "",
      topicChannelUrl: "",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (submitLoading) return;
    setIsModalOpen(false);
  };

  const handleFinish = async (values) => {
    if (!id) {
      message.error("User id not found. Please log in again.");
      return;
    }

    setSubmitLoading(true);
    try {
      const res = await fetch(`${apiBase}/submit-youtube-oac`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          userId: id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to submit form");
      }

      message.success("Form submitted successfully");
      form.resetFields();
      setIsModalOpen(false);
      fetchRecords();
    } catch (error) {
      console.error("Error submitting youtube OAC form:", error);
      message.error(error.message || "Unable to submit form");
    } finally {
      setSubmitLoading(false);
    }
  };

  const columns = [
    {
      title: "#",
      key: "index",
      width: 70,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Artist Name",
      dataIndex: "artistName",
      key: "artistName",
      ellipsis: true,
    },
    {
      title: "ISRC 1",
      dataIndex: "isrc1",
      key: "isrc1",
      width: 140,
    },
    {
      title: "ISRC 2",
      dataIndex: "isrc2",
      key: "isrc2",
      width: 140,
    },
    {
      title: "ISRC 3",
      dataIndex: "isrc3",
      key: "isrc3",
      width: 140,
    },
    {
      title: "YouTube URL",
      dataIndex: "youtubeUrl",
      key: "youtubeUrl",
      render: (value) =>
        value ? (
          <LinkCell href={value} target="_blank" rel="noreferrer">
            <Space size={6}>
              <LinkOutlined />
              <span>Open link</span>
            </Space>
          </LinkCell>
        ) : (
          "-"
        ),
    },
    {
      title: "Topic Channel",
      dataIndex: "topicChannelUrl",
      key: "topicChannelUrl",
      render: (value) =>
        value ? (
          <LinkCell href={value} target="_blank" rel="noreferrer">
            <Space size={6}>
              <LinkOutlined />
              <span>Open link</span>
            </Space>
          </LinkCell>
        ) : (
          "-"
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => {
        const normalized = String(status || "pending").toLowerCase();
        const color =
          normalized === "approved" || normalized === "confirmed"
            ? "green"
            : normalized === "rejected"
              ? "red"
              : "gold";

        return <Tag color={color}>{status || "Pending"}</Tag>;
      },
    },
  ];

  return (
    <PageWrap>
      {tableLoading && <MusicLoader />}

      <HeaderBar>
        <div>
          <h2>Submitted Requests</h2>
          <p>View-only history for your YouTube OAC requests.</p>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpenModal}
        >
          Add New
        </Button>
      </HeaderBar>

      <TableCard>
        <TableTools>
          <Text type="secondary">{records.length} record(s) found</Text>
        </TableTools>

        <Table
          columns={columns}
          dataSource={records}
          rowKey={(record) => record._id || record.id}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            showQuickJumper: true,
            position: ["bottomCenter"],
          }}
          style={{
            height: "60svh",
            overflow: "scroll",
          }}
          scroll={{ x: 1200 }}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No submitted requests found"
              />
            ),
          }}
        />
      </TableCard>

      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        destroyOnClose
        centered
        width={860}
        maskClosable={!submitLoading}
        className="youtube-oac-modal"
      >
        <ModalBody>
          {submitLoading && <MusicLoader />}

          <div style={{ marginBottom: "1rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.15rem" }}>Add New Request</h2>
            <p style={{ margin: "0.35rem 0 0", color: "#667085" }}>
              Fill in the YouTube and topic channel details for the request.
            </p>
          </div>

          <Form layout="vertical" form={form} onFinish={handleFinish}>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="artistName"
                  label="Artist Name"
                  rules={[
                    { required: true, message: "Please enter artist name" },
                  ]}
                >
                  <Input placeholder="Artist name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="youtubeUrl"
                  label="YouTube URL"
                  rules={[
                    { required: true, message: "Please enter YouTube URL" },
                  ]}
                >
                  <Input placeholder="https://youtube.com/..." />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="topicChannelUrl"
                  label="Topic Channel URL"
                  rules={[
                    {
                      required: true,
                      message: "Please enter topic channel URL",
                    },
                  ]}
                >
                  <Input placeholder="https://youtube.com/channel/..." />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="isrc1"
                  label="ISRC 1"
                  rules={[{ required: true, message: "Please enter ISRC 1" }]}
                >
                  <Input placeholder="ISRC 1" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="isrc2"
                  label="ISRC 2"
                  rules={[{ required: true, message: "Please enter ISRC 2" }]}
                >
                  <Input placeholder="ISRC 2" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="isrc3"
                  label="ISRC 3"
                  rules={[{ required: true, message: "Please enter ISRC 3" }]}
                >
                  <Input placeholder="ISRC 3" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item style={{ marginBottom: 0 }}>
              <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                <Button onClick={handleCloseModal} disabled={submitLoading}>
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitLoading}
                >
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </ModalBody>
      </Modal>
    </PageWrap>
  );
};

export default YoutubeOacRequest;
