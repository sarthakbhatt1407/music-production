import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import BrandDrawerPanel from "../../components/Brand/BrandAdminPanelDrawer";
import OrderCreator from "../../components/Brand/OrderCreator";
import OrdersHistory from "../../components/Brand/OrdersHistory";
import OrderDetailsPage from "../../components/Brand/OrderDetailsPage";
import ChatScreen from "../../components/Brand/ChatScreen";
import ProfilePage from "../../components/Brand/ProfilePage";
import BrandHome from "../../components/Brand/BrandHome";
import OrderNavigation from "../../components/Brand/OrderNavigation";
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
const BrandAdminPanel = () => {
  const page = useParams().page;
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
        `${process.env.REACT_APP_BASE_URL}/user/get-all-user/?id=${userId}`
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

  // Get month name from month number (0-11)

  // Get month abbreviation (Jan, Feb, ...)
  const getMonthAbbr = (monthIndex) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthIndex];
  };

  // Handle payment submission
  const handlePaymentSubmit = async (values) => {
    setLoading(true);
    try {
      // Determine action type based on payment type
      const action = values.paymentType === "payment" ? "wallet" : "bonus";

      // Format the data for the API
      const paymentData = {
        remark:
          values.paymentType === "payment"
            ? values.description
            : "Bonus payment",
        infId: values.userId,
        amount: values.amount,
        action: action,
      };

      // Make API call to process payment
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/add-wallet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      const data = await res.json();

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
      <BrandDrawerPanel page={page}>
        {page === "home" && <BrandHome />}
        {page === "new-order-navigation" && <OrderNavigation />}
        {page === "new-order-without-packages" && <OrderCreator />}
        {page === "new-order-with-packages" && <OrderCreator />}
        {page === "order-history" && <OrdersHistory />}
        {page === "order-details" && id && <OrderDetailsPage />}
        {page === "profile" && <ProfilePage />}

        {/* {page === "chat" && <ChatScreen />} */}

        {/* {page === "pending-work" && <PendingWork />}
        {page === "history" && <History />}
        {page === "copyright" && <CopyrightAdmin />}
        {page === "all-users" && <AllUsers />}
        {page === "notification" && <Notification />}
        {page === "user-profile" && <UserProfile />}
        {page === "user-queries" && <UserQueries />}
        {page === "pending-profile" && <PendingProfiles />}
        {id && !action && !page && <OrderDetailsPage />}
        {action === "edit" && <EditOrder />} */}
      </BrandDrawerPanel>
    </div>
  );
};

export default BrandAdminPanel;
