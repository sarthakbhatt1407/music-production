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

const SocialMediaLinking = () => {
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
    console.log(`${apiBase}/get-social-media-linking-by-user-id/${id}`);
    setTableLoading(true);
    try {
      const res = await fetch(
        `${apiBase}/get-social-media-linking-by-user-id/${id}`,
      );
      const data = await res.json();
      console.log(`${apiBase}/get-social-media-linking-by-user-id/${id}`);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to fetch submitted forms");
      }

      setRecords(
        Array.isArray(data?.socialMediaLinkingData)
          ? data.socialMediaLinkingData
          : [],
      );
    } catch (error) {
      console.error("Error fetching social media linking forms:", error);
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
      isrc: "",
      facebookUrl: "",
      instagramUrl: "",
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
      const res = await fetch(`${apiBase}/submit-social-media-linking`, {
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
      console.log(data);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to submit form");
      }

      message.success("Form submitted successfully");
      form.resetFields();
      setIsModalOpen(false);
      fetchRecords();
    } catch (error) {
      console.error("Error submitting social media linking form:", error);
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
      title: "ISRC",
      dataIndex: "isrc",
      key: "isrc",
      width: 140,
    },
    {
      title: "Facebook",
      dataIndex: "facebookUrl",
      key: "facebookUrl",
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
      title: "Instagram",
      dataIndex: "instagramUrl",
      key: "instagramUrl",
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
          normalized === "approved"
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
          <p>View-only history for your social media linking requests.</p>
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
        className="social-media-linking-modal"
      >
        <ModalBody>
          {submitLoading && <MusicLoader />}

          <div style={{ marginBottom: "1rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.15rem" }}>Add New Request</h2>
            <p style={{ margin: "0.35rem 0 0", color: "#667085" }}>
              Fill in the social profiles and contact details for the release.
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
                  name="isrc"
                  label="ISRC"
                  rules={[{ required: true, message: "Please enter ISRC" }]}
                >
                  <Input placeholder="ISRC" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="facebookUrl"
                  label="Facebook URL"
                  rules={[
                    { required: true, message: "Please enter Facebook URL" },
                  ]}
                >
                  <Input placeholder="https://facebook.com/..." />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="instagramUrl"
                  label="Instagram URL"
                  rules={[
                    { required: true, message: "Please enter Instagram URL" },
                  ]}
                >
                  <Input placeholder="https://instagram.com/..." />
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

export default SocialMediaLinking;
