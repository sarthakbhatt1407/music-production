import React, { useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  Button,
  Empty,
  Descriptions,
  Form,
  Input,
  Modal,
  Row,
  Col,
  Space,
  Table,
  Tag,
  Typography,
  Popconfirm,
  message,
} from "antd";
import { PlusOutlined, LinkOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
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

const InstaFbWhitelist = () => {
  const [form] = Form.useForm();
  const id = useSelector((state) => state.userId);

  const [tableLoading, setTableLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const apiBase = useMemo(
    () => `${process.env.REACT_APP_BASE_URL}/form-query`,
    [],
  );

  const fetchRecords = async () => {
    setTableLoading(true);
    try {
      const res = await fetch(`${apiBase}/get-all-inst-fb-whitelist`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to fetch submitted forms");
      }

      setRecords(
        Array.isArray(data?.instFbWhitelistData)
          ? data.instFbWhitelistData
          : [],
      );
    } catch (error) {
      console.error("Error fetching Insta/Fb whitelist forms:", error);
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
      instFbUrl: "",
      isrc: "",
      status: "",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (submitLoading) return;
    setIsModalOpen(false);
  };

  const handleCloseDetailsModal = () => {
    setSelectedRecord(null);
  };

  const handleFinish = async (values) => {
    setSubmitLoading(true);
    try {
      const res = await fetch(`${apiBase}/submit-inst-fb-whitelist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
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
      console.error("Error submitting Insta/Fb whitelist form:", error);
      message.error(error.message || "Unable to submit form");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleConfirmRecord = async (recordId) => {
    try {
      const res = await fetch(
        `${apiBase}/update-inst-fb-whitelist-status/${recordId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Confirmed" }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to confirm record");
      }

      message.success("Record confirmed successfully");
      fetchRecords();
    } catch (error) {
      console.error("Error confirming Insta/Fb whitelist record:", error);
      message.error(error.message || "Unable to confirm record");
    }
  };

  const handleDeleteRecord = async (recordId) => {
    try {
      const res = await fetch(
        `${apiBase}/delete-inst-fb-whitelist/${recordId}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to delete record");
      }

      message.success("Record deleted successfully");
      fetchRecords();
    } catch (error) {
      console.error("Error deleting Insta/Fb whitelist record:", error);
      message.error(error.message || "Unable to delete record");
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
      title: "ISRC",
      dataIndex: "isrc",
      key: "isrc",
      width: 140,
    },
    {
      title: "Link",
      dataIndex: "instFbUrl",
      key: "instFbUrl",
      render: (value) =>
        value ? (
          <LinkCell
            href={value}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
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
    {
      title: "Action",
      key: "action",
      width: 180,
      render: (_, record) => (
        <Space size={8} wrap onClick={(e) => e.stopPropagation()}>
          {String(record.status || "").toLowerCase() !== "confirmed" && (
            <Popconfirm
              title="Confirm this request?"
              description="This will update the status of the record."
              okText="Confirm"
              cancelText="Cancel"
              onConfirm={() => handleConfirmRecord(record._id || record.id)}
            >
              <Button type="primary" size="small">
                Confirm
              </Button>
            </Popconfirm>
          )}

          <Popconfirm
            title="Delete this request?"
            description="This action cannot be undone."
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
            onConfirm={() => handleDeleteRecord(record._id || record.id)}
          >
            <Button danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageWrap>
      {tableLoading && <MusicLoader />}

      <HeaderBar>
        <div>
          <h2>Submitted Requests</h2>
          <p>View-only history for your Insta/Fb whitelist requests.</p>
        </div>
      </HeaderBar>

      <TableCard>
        <TableTools>
          <Text type="secondary">{records.length} record(s) found</Text>
        </TableTools>

        <Table
          columns={columns}
          dataSource={records}
          rowKey={(record) => record._id || record.id}
          onRow={(record) => ({
            onClick: () => setSelectedRecord(record),
          })}
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
        open={!!selectedRecord}
        onCancel={handleCloseDetailsModal}
        footer={null}
        centered
        width={900}
        destroyOnClose
        className="inst-fb-whitelist-details-modal"
      >
        <div style={{ marginBottom: "1rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.15rem" }}>Request Details</h2>
          <p style={{ margin: "0.35rem 0 0", color: "#667085" }}>
            Full version of the selected Insta/Fb whitelist request.
          </p>
        </div>

        <Descriptions bordered column={2} size="small">
          <Descriptions.Item label="Label Info">
            {selectedRecord?.labelInfo || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {selectedRecord?.status || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="ISRC">
            {selectedRecord?.isrc || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Link">
            {selectedRecord?.instFbUrl ? (
              <LinkCell
                href={selectedRecord.instFbUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Space size={6}>
                  <LinkOutlined />
                  <span>Open link</span>
                </Space>
              </LinkCell>
            ) : (
              "-"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="User ID" span={2}>
            {selectedRecord?.userId || "-"}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </PageWrap>
  );
};

export default InstaFbWhitelist;
