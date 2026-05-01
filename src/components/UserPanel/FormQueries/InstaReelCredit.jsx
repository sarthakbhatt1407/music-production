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
  TimePicker,
  message,
} from "antd";
import { PlusOutlined, LinkOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import MusicLoader from "../../Loader/MusicLoader";
import moment from "moment";

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

const InstaReelCredit = ({
  backTo = "/user-panel/form-query",
  title = "Insta Reel Credit",
  description = "Submit release details for reel credit or audio page attribution.",
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
  const format = "mm:ss";

  const fetchRecords = async () => {
    if (!id) return;

    setTableLoading(true);
    try {
      const res = await fetch(
        `${apiBase}/get-insta-reel-credit-by-user-id/${id}`,
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to fetch submitted forms");
      }

      setRecords(
        Array.isArray(data?.instaReelCreditData)
          ? data.instaReelCreditData
          : [],
      );
    } catch (error) {
      console.error("Error fetching Insta Reel Credit forms:", error);
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
      labelInfo: "",
      singerName: "",
      songName: "",
      instFbUrl: "",
      isrc: "",
      expectedTime: moment("00:30", format),
      reelLink: "",
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
      const expectedTime = values.expectedTime
        ? values.expectedTime.format(format)
        : "";

      const res = await fetch(`${apiBase}/submit-insta-reel-credit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          expectedTime,
          status: "Pending",
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
      console.error("Error submitting Insta Reel Credit form:", error);
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
      title: "Label Info",
      dataIndex: "labelInfo",
      key: "labelInfo",
      ellipsis: true,
    },
    {
      title: "Singer",
      dataIndex: "singerName",
      key: "singerName",
      ellipsis: true,
    },
    {
      title: "Song",
      dataIndex: "songName",
      key: "songName",
      ellipsis: true,
    },
    {
      title: "ISRC",
      dataIndex: "isrc",
      key: "isrc",
      width: 140,
    },
    {
      title: "Expected Time",
      dataIndex: "expectedTime",
      key: "expectedTime",
      width: 140,
    },
    {
      title: "Link",
      dataIndex: "reelLink",
      key: "reelLink",
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
          <h2>{title}</h2>
          <p>{description}</p>
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
        className="insta-reel-credit-modal"
      >
        <ModalBody>
          {submitLoading && <MusicLoader />}

          <div style={{ marginBottom: "1rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.15rem" }}>Add New Request</h2>
            <p style={{ margin: "0.35rem 0 0", color: "#667085" }}>
              Fill in the release details for the reel credit request.
            </p>
          </div>

          <Form layout="vertical" form={form} onFinish={handleFinish}>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="labelInfo"
                  label="Label Info"
                  rules={[
                    { required: true, message: "Please enter label info" },
                  ]}
                >
                  <Input placeholder="Label info" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="singerName"
                  label="Singer Name"
                  rules={[
                    { required: true, message: "Please enter singer name" },
                  ]}
                >
                  <Input placeholder="Singer name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="songName"
                  label="Song Name"
                  rules={[
                    { required: true, message: "Please enter song name" },
                  ]}
                >
                  <Input placeholder="Song name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="instFbUrl"
                  label="Insta / Fb URL"
                  rules={[
                    { required: true, message: "Please enter Insta/Fb URL" },
                  ]}
                >
                  <Input placeholder="https://instagram.com/..." />
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
                  name="expectedTime"
                  label="Expected Time of Song"
                  rules={[
                    {
                      required: true,
                      message: "Please enter expected time of song",
                    },
                  ]}
                >
                  <TimePicker
                    format={format}
                    defaultValue={moment("00:30", format)}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="reelLink"
                  label="Audio Page / Reel Link"
                  rules={[
                    {
                      required: true,
                      message: "Please enter reel link",
                    },
                  ]}
                >
                  <Input placeholder="https://..." />
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

export default InstaReelCredit;
