import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import PromotionAdminDrawerPanel from "../../components/PromotionAdmin/PromotionAdminDrawerPanel";
import AdminOrderHistory from "../../components/PromotionAdmin/AdminOrderHistory";
import AdminOrderDetails from "../../components/PromotionAdmin/AdminOrderDetails";
import AdminProfilePage from "../../components/PromotionAdmin/AdminProfilePage";
import AdminHome from "../../components/PromotionAdmin/AdminHome";
import Users from "../../components/PromotionAdmin/Users";
import AdminUserProfile from "../../components/PromotionAdmin/AdminUserProfile";
import UserWallet from "../../components/PromotionAdmin/UserWallet";
import Packages from "../../components/PromotionAdmin/Packages";
import AdminNoti from "../../components/PromotionAdmin/AdminNoti";
import {
  FloatButton,
  Modal,
  Select,
  Upload,
  Button,
  message,
  Input,
  Radio,
  Form,
  InputNumber,
} from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { IoIosAdd } from "react-icons/io";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BsCashCoin } from "react-icons/bs";
import MusicLoader from "../../components/Loader/MusicLoader";
const { TextArea } = Input;
const PromotionAdminPanel = () => {
  const page = useParams().page;
  console.log(page);

  const id = useParams().id;
  const action = useParams().action;

  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.userId);
  const [users, setUsers] = useState([]);

  const [open, setOpen] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [fileList, setFileList] = useState([]);
  const [paymentForm] = Form.useForm();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/inf/user/get-all-inf-users`
      );
      const data = await res.json();
      console.log("users", data.users);

      if (res.ok) {
        setUsers(data.users);
      } else {
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onChange = () => {
    setOpen(!open);
  };

  const handleOpenPaymentModal = () => {
    setPaymentModalVisible(true);
    setOpen(false); // Close the float button group
  };

  const handlePaymentModalCancel = () => {
    setPaymentModalVisible(false);
    paymentForm.resetFields();
  };

  // Handle payment submission
  const handlePaymentSubmit = async (values) => {
    setLoading(true);
    try {
      // Determine action type based on payment type
      const action = values.paymentType === "payment" ? "wallet" : "bonus";
      let resRemark =
        values.paymentType === "payment"
          ? values.description
          : "Bonus - " + values.description;
      // Format the data for the API
      const paymentData = {
        remark: resRemark,
        infId: values.userId,
        amount: values.amount,
        action: action,
      };

      // Make API call to process payment
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/brand/add-inf-wallet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        message.success(
          `${
            values.paymentType === "payment" ? "Payment" : "Bonus"
          } added successfully!`
        );
        setPaymentModalVisible(false);
        paymentForm.resetFields();
      } else {
        message.error(
          data.message || `Failed to process ${values.paymentType}.`
        );
      }
    } catch (err) {
      console.error(err);
      message.error("Something went wrong while processing payment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, [page]);
  return (
    <div>
      {loading && <MusicLoader />}
      <FloatButton.Group
        open={open}
        onClick={onChange}
        trigger="click"
        style={{
          left: "1%",
          transform: "scale(1)",
          zIndex: 100,
          bottom: "8%",
        }}
        tooltip={<div>Admin Actions</div>}
        icon={<IoIosAdd />}
      >
        <FloatButton
          onClick={handleOpenPaymentModal}
          tooltip={<div>Add Payment/Bonus</div>}
          icon={
            <BsCashCoin
              style={{
                color: "#389e0d",
              }}
            />
          }
        />
      </FloatButton.Group>
      <Modal
        title="Add Payment or Bonus"
        open={paymentModalVisible}
        onCancel={handlePaymentModalCancel}
        footer={null}
        width={500}
      >
        {loading && <MusicLoader />}
        <Form
          form={paymentForm}
          layout="vertical"
          onFinish={handlePaymentSubmit}
          initialValues={{
            paymentType: "payment",
            amount: 0,
          }}
        >
          <Form.Item
            name="userId"
            label="Select User"
            rules={[{ required: true, message: "Please select a user" }]}
          >
            <Select
              placeholder="Select user"
              showSearch
              optionFilterProp="label"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={users.map((user) => ({
                value: user._id,
                label: `${user.name} (${user.email})`,
              }))}
            />
          </Form.Item>

          <Form.Item
            name="paymentType"
            label="Payment Type"
            rules={[{ required: true, message: "Please select payment type" }]}
          >
            <Radio.Group>
              <Radio value="payment">Payment</Radio>
              <Radio value="bonus">Bonus</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="amount"
            label="Amount (₹)"
            rules={[{ required: true, message: "Please enter amount" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={1}
              step={100}
              formatter={(value) =>
                `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/₹\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.paymentType !== currentValues.paymentType
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("paymentType") === "payment" ||
              getFieldValue("paymentType") === "bonus" ? (
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: "Please enter payment description",
                    },
                  ]}
                >
                  <TextArea rows={3} placeholder="Enter payment details" />
                </Form.Item>
              ) : null
            }
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}
            >
              <Button onClick={handlePaymentModalCancel}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={<DollarOutlined />}
                loading={loading}
              >
                Add Transaction
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <PromotionAdminDrawerPanel page={page}>
        {page === "home" && <AdminHome />}
        {page == "orders" && <AdminOrderHistory />}
        {page === "order-details" && <AdminOrderDetails />}
        {page === "profile" && <AdminProfilePage />}
        {page === "users" && <Users />}
        {page === "packages" && <Packages />}
        {page === "wallet" && id && <UserWallet />}
        {page === "notification" && <AdminNoti />}
        {(page === "influencer" || page == "promoter") && id && (
          <AdminUserProfile />
        )}
      </PromotionAdminDrawerPanel>
    </div>
  );
};

export default PromotionAdminPanel;
