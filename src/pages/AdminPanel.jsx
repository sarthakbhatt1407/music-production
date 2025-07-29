import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import AdminDrawerPanel from "../components/AdminDrawerPanel";
import Orders from "../components/AdminPanel/Orders";
import OrderDetailsPage from "../components/AdminPanel/OrderDetailsPage";
import PendingWork from "../components/AdminPanel/PendingWork";
import History from "../components/AdminPanel/History";
import AllUsers from "../components/AdminPanel/AllUsers";
import UserProfile from "../components/AdminPanel/UserProfile";
import CopyrightAdmin from "../components/AdminPanel/CopyrightAdmin";
import UserQueries from "../components/AdminPanel/UserQueries";
import EditOrder from "../components/AdminPanel/EditOrder";
import PendingProfiles from "../components/AdminPanel/PendingProfiles";
import Notification from "../components/AdminPanel/Notification";
import MusicUserWallet from "../components/AdminPanel/MusicUserWallet";
import { FloatButton, Modal, Select, Upload, Button, message } from "antd";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import { IoIosAdd } from "react-icons/io";
import { HiOutlineDocumentReport } from "react-icons/hi";
import MusicLoader from "../components/Loader/MusicLoader";

const { Option } = Select;

const AdminPanel = () => {
  const [loading, setLoading] = useState(false);
  const page = useParams().page;
  const id = useParams().id;
  const action = useParams().action;
  const [open, setOpen] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [fileList, setFileList] = useState([]);

  const onChange = () => {
    setOpen(!open);
  };

  const handleOpenReportModal = () => {
    setReportModalVisible(true);
    setOpen(false); // Close the float button group
  };

  const handleReportModalCancel = () => {
    setReportModalVisible(false);
    setFileList([]);
  };

  // Get month name from month number (0-11)
  const getMonthName = (monthIndex) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthIndex];
  };

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

  // Generate year options (current year and 2 previous years)
  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return [currentYear - 2, currentYear - 1, currentYear];
  };

  // File upload handler (manual upload)
  const handleFileUpload = ({ file, fileList }) => {
    setFileList(fileList.slice(-1)); // Only keep the latest file
  };

  // Send data to backend API
  const handleGenerateReport = async () => {
    if (!fileList.length) {
      message.error("Please upload an Excel or CSV file.");
      return;
    }
    const file = fileList[0].originFileObj;
    if (!file) {
      message.error("No file selected.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("excel", file);
    formData.append("year", selectedYear);
    formData.append("month", getMonthAbbr(selectedMonth));

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/cal-excel`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        message.success("File processed successfully. Financial report added.");
        setReportModalVisible(false);
        setFileList([]);
      } else {
        message.error(data.message || "Failed to process file.");
      }
    } catch (err) {
      message.error("Something went wrong while uploading the file.");
    }
    setLoading(false);
  };

  return (
    <div>
      <FloatButton.Group
        open={open}
        onClick={onChange}
        trigger="click"
        style={{
          right: "2.5%",
          transform: "scale(1.5)",
          zIndex: 1,
          bottom: "20%",
        }}
        tooltip={<div>Add Reports</div>}
        icon={<IoIosAdd />}
      >
        <FloatButton
          onClick={handleOpenReportModal}
          tooltip={<div>Financial Report</div>}
          icon={
            <HiOutlineDocumentReport
              style={{
                color: "#2178e9e0",
              }}
            />
          }
        />
      </FloatButton.Group>

      {/* Financial Report Modal */}
      <Modal
        title="Add Financial Report"
        open={reportModalVisible}
        onCancel={handleReportModalCancel}
        footer={[
          <Button key="cancel" onClick={handleReportModalCancel}>
            Cancel
          </Button>,
          <Button
            key="generate"
            type="primary"
            onClick={handleGenerateReport}
            icon={<DownloadOutlined />}
          >
            Add Financial Report
          </Button>,
        ]}
        width={600}
      >
        <div style={{ padding: "20px 0" }}>
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ marginBottom: 12, fontWeight: 500 }}>
              Select Time Period
            </h4>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <label
                  style={{ display: "block", marginBottom: 8, color: "#666" }}
                >
                  Year
                </label>
                <Select
                  style={{ width: "100%" }}
                  value={selectedYear}
                  onChange={(value) => setSelectedYear(value)}
                >
                  {getYearOptions().map((year) => (
                    <Option key={year} value={year}>
                      {year}
                    </Option>
                  ))}
                </Select>
              </div>
              <div style={{ flex: 1 }}>
                <label
                  style={{ display: "block", marginBottom: 8, color: "#666" }}
                >
                  Month
                </label>
                <Select
                  style={{ width: "100%" }}
                  value={selectedMonth}
                  onChange={(value) => setSelectedMonth(value)}
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <Option key={i} value={i}>
                      {getMonthName(i)}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: 12, fontWeight: 500 }}>Import Data</h4>
            <Upload
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              showUploadList={true}
              maxCount={1}
              fileList={fileList}
              beforeUpload={() => false} // Prevent auto upload
              onChange={handleFileUpload}
            >
              <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                Click to Upload Excel/CSV
              </Button>
            </Upload>
          </div>
        </div>
      </Modal>

      <AdminDrawerPanel page={page}>
        {loading && <MusicLoader />}
        {page === "orders" && <Orders />}
        {page === "pending-work" && <PendingWork />}
        {page === "history" && <History />}
        {page === "copyright" && <CopyrightAdmin />}
        {page === "all-users" && <AllUsers />}
        {page === "notification" && <Notification />}
        {page === "user-profile" && <UserProfile />}
        {page === "user-queries" && <UserQueries />}
        {page === "pending-profile" && <PendingProfiles />}
        {page === "user-wallet" && id && <MusicUserWallet />}
        {id && !action && !page && <OrderDetailsPage />}
        {action === "edit" && <EditOrder />}
      </AdminDrawerPanel>
    </div>
  );
};

export default AdminPanel;
