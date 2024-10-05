import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { FloatButton } from "antd";
import {
  EyeOutlined,
  ClockCircleOutlined,
  CheckCircleTwoTone,
  EditOutlined,
  CloseOutlined,
  RiseOutlined,
  UserAddOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Legend,
  Bar,
  Rectangle,
  Pie,
  PieChart,
  Cell,
} from "recharts";
import { Link } from "react-router-dom";
import { Empty } from "antd";
import styled from "@emotion/styled";
import random from "../../assets/images/random.webp";
import {
  ContentCopyOutlined,
  CurrencyRupeeSharp,
  DocumentScannerOutlined,
  DownloadOutlined,
  LinkOutlined,
  SmartDisplayOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import MusicLoader from "../Loader/MusicLoader";
import { notification } from "antd";
import { message } from "antd";
import { saveAs } from "file-saver";
import { SiMicrosoftexcel } from "react-icons/si";

const MainDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  padding: 1rem;

  border-radius: 0.5rem;
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  gap: 0.7rem;
  h1 {
    margin: 0;
    margin-bottom: 1rem;
  }
  @media only screen and (max-width: 1000px) {
    padding: 0;
  }
`;

const ContentDiv = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr;
  padding: 1rem;
  gap: 2rem;
  width: 100%;
  margin: 0 auto;
  background-color: white;
  border-radius: 0.5rem;
  @media only screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
    padding: 0;
    background-color: transparent;
  }
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow: hidden;
  border-radius: 0.5rem;
  gap: 1rem;
  img {
    width: 82%;
    height: 60%;
    margin: 0 auto;
    border-radius: 0.5rem;
  }
  div {
    display: flex;
    /* background-color: red; */
    width: 100%;

    span {
      width: 50%;
      letter-spacing: 0.09rem;
      text-transform: capitalize;
      &:first-child {
        margin-right: 0.8rem;
      }
      &:not(:first-child) {
        margin-left: 0.8rem;
      }
      padding: 0.5rem 0.6rem 0.5rem 0.2rem;
      font-size: 1.2rem;
      border-bottom: 1px solid #dadada;
    }
  }
  @media only screen and (max-width: 1000px) {
    padding: 0rem 0rem 0.4rem 0rem;
    background-color: white;
    img {
    }
    div {
      padding: 0 0.2rem;
      span {
        font-size: 1rem;
        padding: 0.5rem 0;
        letter-spacing: 0;
      }
    }
  }
`;

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;

  div {
    background-color: white;

    &:first-child {
      border-radius: 0.5rem;
      height: 100%;
    }
    padding: 1rem;
    p {
      text-transform: capitalize;
      border-bottom: 1px solid #e7e7ee;
      font-size: 1.3rem;
      margin: 0.5rem 0;
      padding: 0.6rem 0.4rem;

      color: black;
      font-weight: 500;
    }
    div {
      display: flex;
      justify-content: space-between;

      span {
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 0.3rem;
        padding: 0.2rem 0;
        &:not(:first-child) {
          color: black;
          font-weight: 500;
          text-transform: uppercase;
        }
      }
    }
  }
`;
const TableBox = styled.div`
  height: 21svh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
  background-color: white;
  padding: 1rem;
`;

const TableHead = styled.thead`
  tr {
    background-color: #f4f4fb;

    td {
      text-align: center;
      padding: 0.4rem 0rem;
      color: #acaec1;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.05rem;
      font-weight: bold;
    }
  }
`;
const TableBody = styled.tbody`
  tr {
    td {
      color: #000000de;
      text-transform: capitalize;
      text-align: center;
      padding: 1rem 0;
      font-weight: 500;
      font-size: 1rem;

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.3rem 0.8rem;
        border-radius: 1rem;
        gap: 0.4rem;
        width: fit-content;
        margin: 0 auto;
        /* text-transform: uppercase; */
        font-size: 0.8rem;
        font-weight: bold;
      }
      span {
        display: flex;
        align-items: center;
        margin: 0 auto;
        justify-content: center;
        gap: 0.7rem;
        img {
          width: 4rem;
        }
      }
    }
  }
`;

const ReportDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 0.8fr;
  gap: 1rem;

  height: fit-content;
  @media only screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const ReportLeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ChartBox = styled.div`
  background-color: white;
  box-shadow: 0.2rem 0.2rem 0.8rem #d1d1d1;
  border-radius: 0.5rem;
  padding: 1rem;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      color: #0000008e;
      font-weight: 500;
    }
  }
  @media only screen and (max-width: 1000px) {
    padding: 0.5rem 0.2rem;
  }
`;

const ReportRightDiv = styled.div`
  height: 100%;
  background-color: white;
  box-shadow: 0.2rem 0.2rem 0.8rem #d1d1d1;
  border-radius: 0.5rem;
  padding: 1rem;
  h2 {
    color: #0000008e;
    font-weight: 500;
    text-align: center;
  }
  @media only screen and (max-width: 1000px) {
    padding: 0.3rem 0.2rem;
  }
`;
const Select = styled.select`
  padding: 0.4rem;
  border: none;
  color: #777;
  background-color: white;
  border-radius: 0.6rem;
  font-size: 0.9rem;
  letter-spacing: 0.04rem;
  border: 1px solid #777;
  border-style: dotted;
  text-transform: capitalize;
  &:focus {
    outline: none;
    border: none;
    border: 1px solid #777;
    border-style: dotted;
  }
  @media only screen and (max-width: 1099px) {
    padding: 1rem 0;
  }
`;
const Option = styled.option`
  color: #777;
  font-weight: bold;
  text-transform: capitalize;
`;

const ReportTable = styled.table`
  width: 100%;
  text-transform: capitalize;
  text-align: center;

  thead {
    tr {
      td {
        font-weight: 600;
        color: #0000009e;
        padding: 0.4rem 0;
        background-color: #f3f3f3;
      }
    }
  }
  tbody {
    tr {
      td {
        font-size: 1rem;
        padding: 0.3rem 0;
        div {
          width: 1rem;
          height: 1rem;
          background-color: red;
        }
      }
    }
  }
`;

const COLORSSTREAM = {
  Spotify: "#25D865",
  Wynk: "#D92E33",
  JioSaavn: "#1DA48C",
  "Apple Music": "#1FADFD",
  Amazon: "#DBB67A",
  Gaana: "#FE6109",
  YouTube: "#FF0808",
  SoundCloud: "#FE8008",
  Tiktok: "#2CF4EF",
  "FB/Insta": "#1FADFD",
  Hungama: "#73BF4C",
  Other: "#495145",
};

const MobileBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 50svh;
  overflow-y: scroll;
  padding-bottom: 2rem;
  @media only screen and (min-width: 1001px) and (max-width: 5000px) {
    display: none;
  }
`;
const BankBtn = styled.button`
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 1rem;
  background-color: #1677ff;
  color: white;
  text-transform: capitalize;
  /* font-size: 1rem; */
  font-weight: bold;
  letter-spacing: 0.09rem;
`;

const MobileOrderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 0.2rem 0.2rem 0.6rem #e7e7ee;
  border-radius: 0.5rem;
  padding: 1rem 0;
  img {
    width: 70%;
    margin: 0 auto;
    margin-bottom: 0.5rem;
  }
`;
const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0.8rem;
  text-align: justify;
  &:nth-child(2n) {
    background-color: #fafafc;
  }
  width: 100%;
  text-transform: capitalize;
  span {
    &:first-child {
      color: black;
      font-weight: 500;
    }
  }
`;
const Modal = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #00000038;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalBox = styled.div`
  background-color: white;
  width: 30%;
  height: fit-content;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  z-index: 20;

  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    width: 90%;
  }
`;

const ModalFormBox = styled.div`
  background-color: white;
  width: 90%;
  height: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const BtnBox = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
  padding: 1rem 0;
  justify-content: center;
  align-items: center;
  button {
    background-color: #1677ff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.4rem;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.09rem;
    &:last-child {
      background-color: #bbb9b9;
    }
  }
`;
const ModalInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 0.6rem;
  outline: none;
  border: 1px solid #d7d7d7;

  &::placeholder {
    color: #d4cdcd;
    letter-spacing: 0.09rem;
    text-transform: capitalize;
  }
  &:focus {
    border: 1px solid #c0c0c0;
    box-shadow: 0.1rem 0.1rem 0.5rem #c0c0c0;
  }
`;

const LabelInpBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 74%;
  span {
    color: #ff0000ab;
    font-size: 0.8rem;
    margin-left: 0.2rem;
  }
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    width: 100%;
  }
`;
const Label = styled.label`
  font-size: 0.9rem;
  letter-spacing: 0.06rem;
  color: #9e9e9e;
  text-transform: capitalize;
`;

const UserProfile = () => {
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
  const userId = useSelector((state) => state.userId);
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const defaultEarning = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };
  const defaultReports = {
    Spotify: 0,
    Wynk: 0,
    JioSaavn: 0,
    Amazon: 0,
    Gaana: 0,
    YouTube: 0,
    SoundCloud: 0,
    Tiktok: 0,
    "FB/Insta": 0,
    Hungama: 0,
    Other: 0,
    "Apple Music": 0,
  };
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonth]);
  const [earningSelectedYear, setEarningSelectedYear] = useState(currentYear);
  const [reportSelectedYear, setReportSelectedYear] = useState(currentYear);
  const [earningData, setEarningData] = useState(null);
  const [reportData, setReportData] = useState(null);
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
  let sNo = 0;

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserdata] = useState(null);
  const [showPaid, setShowPaid] = useState(false);
  const [totalEarningUser, setTotalEarningUser] = useState(0);
  const [orders, setOrders] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState(null);
  const [modalEarning, setModalEarning] = useState(false);
  const [modalStream, setModalStream] = useState(false);
  const [paidInp, setPaidInp] = useState(0);
  const [editPaid, setEditPaid] = useState(0);
  const [showEditPaid, setShowEditPaid] = useState(false);
  const [showLeglmod, setShowLegalMod] = useState(false);
  const [showExcel, setShowExcel] = useState(false);
  const totalPaymentReporter = (report) => {
    let totalPayment = 0;
    if (report) {
      for (const year in report) {
        for (const mon in report[year]) {
          totalPayment += Number(report[year][mon]);
        }
      }
      setTotalEarningUser(totalPayment);
    }
  };

  const [modalEarningInpFields, setModalEarningInpFields] = useState({
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  });
  const [modalStreamInpFields, setModalStreamInpFields] = useState({
    Spotify: 0,
    Wynk: 0,
    JioSaavn: 0,
    Amazon: 0,
    Gaana: 0,
    YouTube: 0,
    SoundCloud: 0,
    Tiktok: 0,
    "FB/Insta": 0,
    Hungama: 0,
    Other: 0,
  });

  const copyToClipBoard = async (txt) => {
    try {
      await navigator.clipboard.writeText(txt);
      openNotificationWithIcon("success", "Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const userOrderFetcher = async () => {
    setIsLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/order/user-all-orders/?user=${id}`
    );
    const data = await res.json();

    if (res.ok) {
      setOrders(data.orders.reverse());
      setFilteredOrders(data.orders.reverse());
    } else {
      setOrders([]);
      setFilteredOrders([]);
    }
    setIsLoading(false);
  };

  const userDetailsFetch = async () => {
    setIsLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/get-user/?id=${id}`
    );
    const data = await res.json();

    if (res.ok) {
      setUserdata(data.user);
      setEditPaid(data.user.paidEarning);
      totalPaymentReporter(data.user.finacialReport[0]);
      setModalEarningInpFields(data.user.finacialReport[0][currentYear]);
      setModalStreamInpFields(
        data.user.analytics[0][currentYear][selectedMonth]
      );
      // for analytics
      let resArr = data.user.analytics[0][reportSelectedYear][selectedMonth];
      let arr = [];
      for (const key in resArr) {
        const obj = {
          name: key,
          views: resArr[key],
        };
        arr.push(obj);
      }
      setReportData(arr);
      //   for earning
      resArr = data.user.finacialReport[0][earningSelectedYear];
      arr = [];
      for (const key in resArr) {
        const obj = {
          name: key,
          amount: resArr[key],
        };
        arr.push(obj);
      }
      setEarningData(arr);
      setIsLoading(false);
    }
  };
  const [refresher, setRefresher] = useState(0);

  useEffect(() => {
    userDetailsFetch();
    userOrderFetcher();
    return () => {};
  }, [refresher]);

  const getSelectedValue = (e) => {
    const ele = document.querySelector(`#${e.target.id}`);
    const value = ele.options[ele.selectedIndex].value;
    setEarningSelectedYear(Number(value));
    let resArr = userData.finacialReport[0][value];
    if (!resArr) {
      resArr = defaultEarning;
    }
    let arr = [];
    for (const key in resArr) {
      const obj = {
        name: key,
        amount: resArr[key],
      };
      arr.push(obj);
    }
    setEarningData(arr);
  };
  const reportsYearChanger = (e) => {
    const ele = document.querySelector(`#${e.target.id}`);
    const value = ele.options[ele.selectedIndex].value;

    setReportSelectedYear(Number(value));

    let resArr;
    if ((resArr = userData.analytics[0][value])) {
      resArr = userData.analytics[0][value][selectedMonth];
      setModalStreamInpFields(userData.analytics[0][value][selectedMonth]);
    }

    if (!resArr) {
      resArr = defaultReports;
    }
    let arr = [];
    for (const key in resArr) {
      const obj = {
        name: key,
        views: resArr[key],
      };
      arr.push(obj);
    }
    setReportData(arr);
  };
  const [open, setOpen] = useState(false);
  const onChange = (checked) => {
    setOpen(!open);
  };
  const modalEarningOnChnage = (e) => {
    const id = e.target.id;
    let val = e.target.value;
    const ele = document.querySelector(`#${id}`);

    ele.style.border = "1px solid #d7d7d7";
    setModalEarningInpFields({ ...modalEarningInpFields, [id]: Number(val) });
  };
  const modalStraemOnChnage = (e) => {
    const id = e.target.id;

    let val = e.target.value;
    let ele;
    if (id === "FB/Insta" || id === "Apple Music") {
      if (id === "Apple Music") {
        ele = document.getElementById("Apple Music");
      } else {
        ele = document.getElementById(`FB/Insta`);
      }
    } else {
      ele = document.querySelector(`#${id}`);
    }

    ele.style.border = "1px solid #d7d7d7";
    setModalStreamInpFields({ ...modalStreamInpFields, [id]: Number(val) });
  };

  const onStreamSubmit = async () => {
    setIsLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/add-report`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          adminId: userId,
          report: modalStreamInpFields,
          year: reportSelectedYear,
          month: selectedMonth,
        }),
      }
    );
    const data = await res.json();

    if (res.ok) {
      openNotificationWithIcon("success", data.message);
      window.location.reload();
    } else {
      openNotificationWithIcon("error", data.message);
    }
    setIsLoading(false);
    setModalStream(false);
  };
  const onSubmit = async () => {
    setIsLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/add-financial-report`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          adminId: userId,
          report: modalEarningInpFields,
          year: currentYear,
        }),
      }
    );
    const data = await res.json();

    if (res.ok) {
      openNotificationWithIcon("success", data.message);
      setRefresher((prev) => {
        return prev + 1;
      });
    } else {
      openNotificationWithIcon("error", data.message);
    }
    setIsLoading(false);
    setModalEarning(false);
  };
  const [pdfFile, setPdfFile] = useState(null); // Store PDF file
  const [excelFile, setExcelFile] = useState(null); // Store PDF file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file && file.type === "application/pdf") {
      setPdfFile(file); // Store the selected PDF in state
      console.log("done");
    } else {
      alert("Please upload a valid PDF file.");
    }
  };
  const handleExcelFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (
      file &&
      (file.type === "application/vnd.ms-excel" || // .xls
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // .xlsx
        file.type === "text/csv") // .csv
    ) {
      setExcelFile(file); // Store the selected Excel or CSV file in state
      console.log("File selected:", file.name);
    } else {
      alert("Please upload a valid file (.xls, .xlsx, or .csv).");
    }
  };
  return (
    <>
      {showExcel && (
        <Modal>
          <ModalBox data-aos="zoom-in">
            <ModalFormBox
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <LabelInpBox>
                <Label htmlFor="accountNo">Excel File</Label>
                <ModalInput
                  type="file"
                  id="doc"
                  accept=".xls, .xlsx, .csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/csv"
                  onChange={handleExcelFileChange} // Handle Excel and CSV file input
                />
              </LabelInpBox>

              <BtnBox>
                <button
                  onClick={async () => {
                    setIsLoading(true);
                    if (excelFile) {
                      const formD = new FormData();
                      formD.append("excel", excelFile);
                      formD.append("userId", id);
                      formD.append("adminId", userId);

                      const res = await fetch(
                        `${process.env.REACT_APP_BASE_URL}/user/add-excel`,
                        {
                          method: "POST",

                          body: formD,
                        }
                      );
                      const data = await res.json();

                      if (res.ok) {
                        success(data.message);
                        setTimeout(() => {
                          setRefresher((prev) => {
                            return prev + 1;
                          });
                          setShowExcel(false);
                        }, 600);
                      } else {
                        error(data.message);
                      }
                    } else {
                      error("Please select a excel file.");
                    }
                    setIsLoading(false);
                  }}
                >
                  Submit
                </button>
                <button
                  onClick={() => {
                    setShowExcel(false);
                  }}
                >
                  Cancel
                </button>
              </BtnBox>
            </ModalFormBox>
          </ModalBox>
        </Modal>
      )}
      {showLeglmod && (
        <Modal>
          <ModalBox data-aos="zoom-in">
            <ModalFormBox
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <LabelInpBox>
                <Label htmlFor="accountNo">Legal Document</Label>
                <ModalInput
                  type="file"
                  id="doc"
                  accept="application/pdf"
                  onChange={handleFileChange} // Handle file input
                />
              </LabelInpBox>

              <BtnBox>
                <button
                  onClick={async () => {
                    setIsLoading(true);
                    if (pdfFile) {
                      const formD = new FormData();
                      formD.append("doc", pdfFile);
                      formD.append("userId", id);
                      formD.append("adminId", userId);

                      const res = await fetch(
                        `${process.env.REACT_APP_BASE_URL}/user/legal-doc`,
                        {
                          method: "POST",

                          body: formD,
                        }
                      );
                      const data = await res.json();

                      if (res.ok) {
                        success(data.message);
                        setTimeout(() => {
                          setRefresher((prev) => {
                            return prev + 1;
                          });
                          setShowLegalMod(false);
                        }, 600);
                      } else {
                        error(data.message);
                      }
                    } else {
                      error("Please select a PDF file.");
                    }
                    setIsLoading(false);
                  }}
                >
                  Submit
                </button>
                <button
                  onClick={() => {
                    setShowLegalMod(false);
                  }}
                >
                  Cancel
                </button>
              </BtnBox>
            </ModalFormBox>
          </ModalBox>
        </Modal>
      )}
      {showEditPaid && (
        <Modal>
          <ModalBox data-aos="zoom-in">
            <ModalFormBox
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LabelInpBox>
                <Label htmlFor="jan">Paid Amount</Label>
                <ModalInput
                  type="number"
                  onChange={(e) => {
                    if (e.target.value.length === 0) {
                      setEditPaid(0);
                      return;
                    }
                    setEditPaid(e.target.value);
                  }}
                  id="paid"
                  value={editPaid}
                />
              </LabelInpBox>
            </ModalFormBox>
            <BtnBox>
              <button
                onClick={async () => {
                  if (editPaid === 0) {
                    openNotificationWithIcon(
                      "error",
                      "Amount should be greater than 0."
                    );
                    return;
                  }
                  if (editPaid > totalEarningUser) {
                    openNotificationWithIcon(
                      "error",
                      "Amount is greater than total amount."
                    );
                    return;
                  }
                  setIsLoading(true);
                  const res = await fetch(
                    `${process.env.REACT_APP_BASE_URL}/user/edit-paid`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        userId: id,
                        adminId: userId,
                        paid: Number(editPaid),
                      }),
                    }
                  );
                  const data = await res.json();
                  console.log(data);
                  if (res.ok) {
                    openNotificationWithIcon("success", data.message);
                    window.location.reload();
                  } else {
                    openNotificationWithIcon("error", data.message);
                  }
                  setShowEditPaid(false);
                  setIsLoading(false);
                }}
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setShowEditPaid(false);
                }}
              >
                Cancel
              </button>
            </BtnBox>
          </ModalBox>
        </Modal>
      )}
      {showPaid && (
        <Modal>
          <ModalBox data-aos="zoom-in">
            <ModalFormBox
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LabelInpBox>
                <Label htmlFor="jan">Paid Amount</Label>
                <ModalInput
                  type="number"
                  onChange={(e) => {
                    if (e.target.value.length === 0) {
                      setPaidInp(0);
                      return;
                    }
                    setPaidInp(e.target.value);
                  }}
                  id="paid"
                  value={paidInp}
                />
              </LabelInpBox>
            </ModalFormBox>
            <BtnBox>
              <button
                onClick={async () => {
                  if (paidInp === 0) {
                    openNotificationWithIcon(
                      "error",
                      "Amount should be greater than 0."
                    );
                    return;
                  }
                  if (paidInp > totalEarningUser - userData.paidEarning) {
                    openNotificationWithIcon(
                      "error",
                      "Amount is greater than remaining amount."
                    );
                    return;
                  }
                  setIsLoading(true);
                  const res = await fetch(
                    `${process.env.REACT_APP_BASE_URL}/user/paid-earning`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        userId: id,
                        adminId: userId,
                        paid: Number(paidInp),
                      }),
                    }
                  );
                  const data = await res.json();
                  console.log(data);
                  if (res.ok) {
                    openNotificationWithIcon("success", data.message);
                    window.location.reload();
                  } else {
                    openNotificationWithIcon("error", data.message);
                  }
                  setShowPaid(false);
                  setIsLoading(false);
                }}
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setShowPaid(false);
                }}
              >
                Cancel
              </button>
            </BtnBox>
          </ModalBox>
        </Modal>
      )}
      {modalEarning && (
        <Modal>
          <ModalBox data-aos="zoom-in">
            <ModalFormBox>
              <LabelInpBox>
                <Label htmlFor="jan">January</Label>
                <ModalInput
                  type="number"
                  id="Jan"
                  onChange={modalEarningOnChnage}
                  value={modalEarningInpFields.Jan}
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="Feb">February</Label>
                <ModalInput
                  type="number"
                  id="Feb"
                  onChange={modalEarningOnChnage}
                  value={modalEarningInpFields.Feb}
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="Mar">March</Label>
                <ModalInput
                  type="number"
                  id="Mar"
                  onChange={modalEarningOnChnage}
                  value={modalEarningInpFields.Mar}
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="Apr">April</Label>
                <ModalInput
                  type="number"
                  id="Apr"
                  onChange={modalEarningOnChnage}
                  value={modalEarningInpFields.Apr}
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="May">May</Label>
                <ModalInput
                  type="number"
                  id="May"
                  onChange={modalEarningOnChnage}
                  value={modalEarningInpFields.May}
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="Jun">June</Label>
                <ModalInput
                  type="number"
                  id="Jun"
                  onChange={modalEarningOnChnage}
                  value={modalEarningInpFields.Jun}
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="Jul">July</Label>
                <ModalInput
                  type="number"
                  id="Jul"
                  onChange={modalEarningOnChnage}
                  value={modalEarningInpFields.Jul}
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="Aug">August</Label>
                <ModalInput
                  type="number"
                  id="Aug"
                  onChange={modalEarningOnChnage}
                  value={modalEarningInpFields.Aug}
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="Sep">September</Label>
                <ModalInput
                  type="number"
                  id="Sep"
                  onChange={modalEarningOnChnage}
                  value={modalEarningInpFields.Sep}
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="Oct">October</Label>
                <ModalInput
                  type="number"
                  id="Oct"
                  onChange={modalEarningOnChnage}
                  value={modalEarningInpFields.Oct}
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="Nov">November</Label>
                <ModalInput
                  type="number"
                  id="Nov"
                  onChange={modalEarningOnChnage}
                  value={modalEarningInpFields.Nov}
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="Dec">December</Label>
                <ModalInput
                  type="number"
                  id="Dec"
                  onChange={modalEarningOnChnage}
                  value={modalEarningInpFields.Dec}
                />
              </LabelInpBox>
            </ModalFormBox>
            <BtnBox>
              <button onClick={onSubmit}>Submit</button>
              <button
                onClick={() => {
                  setModalEarning(false);
                }}
              >
                Cancel
              </button>
            </BtnBox>
          </ModalBox>
        </Modal>
      )}
      {modalStream && (
        <Modal>
          <ModalBox data-aos="zoom-in">
            <ModalFormBox>
              <LabelInpBox>
                <Select
                  name="reportMonth"
                  id="reportMonth"
                  onChange={(e) => {
                    const ele = document.querySelector(`#${e.target.id}`);
                    const value = ele.options[ele.selectedIndex].value;
                    setSelectedMonth(value);
                    let resArr;
                    if ((resArr = userData.analytics[0][reportSelectedYear])) {
                      resArr = userData.analytics[0][reportSelectedYear][value];
                    }
                    if (!resArr) {
                      resArr = defaultReports;
                    }
                    setModalStreamInpFields(
                      userData.analytics[0][reportSelectedYear][value]
                    );
                    let arr = [];
                    for (const key in resArr) {
                      const obj = {
                        name: key,
                        views: resArr[key],
                      };
                      arr.push(obj);
                    }
                    setReportData(arr);
                  }}
                >
                  <Option value={`${months[currentMonth]}`}>
                    {months[currentMonth]}
                  </Option>
                  {months.map((m) => {
                    if (m === months[currentMonth]) {
                      return;
                    }
                    return (
                      <Option key={m} value={`${m}`}>
                        {m}
                      </Option>
                    );
                  })}
                </Select>
              </LabelInpBox>

              <LabelInpBox>
                <Select
                  name="reportsYear"
                  id="reportsYear"
                  onChange={reportsYearChanger}
                >
                  <Option value={`${currentYear}`}>{currentYear}</Option>
                  <Option value={`${currentYear - 1}`}>
                    {currentYear - 1}
                  </Option>
                  <Option value={`${currentYear - 2}`}>
                    {currentYear - 2}
                  </Option>
                </Select>
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="Spotify">Spotify</Label>
                <ModalInput
                  type="number"
                  id="Spotify"
                  onChange={modalStraemOnChnage}
                  value={modalStreamInpFields.Spotify}
                />
              </LabelInpBox>
              <LabelInpBox>
                <Label htmlFor="Apple Music">Apple Music</Label>
                <ModalInput
                  type="number"
                  id="Apple Music"
                  onChange={modalStraemOnChnage}
                  value={
                    modalStreamInpFields["Apple Music"]
                      ? modalStreamInpFields["Apple Music"]
                      : 0
                  }
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="Wynk">Wynk</Label>
                <ModalInput
                  type="number"
                  id="Wynk"
                  onChange={modalStraemOnChnage}
                  value={modalStreamInpFields.Wynk}
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="JioSaavn">JioSaavn</Label>
                <ModalInput
                  type="number"
                  id="JioSaavn"
                  onChange={modalStraemOnChnage}
                  value={modalStreamInpFields.JioSaavn}
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="Amazon">Amazon</Label>
                <ModalInput
                  type="number"
                  id="Amazon"
                  onChange={modalStraemOnChnage}
                  value={modalStreamInpFields.Amazon}
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="Gaana">Gaana</Label>
                <ModalInput
                  type="number"
                  id="Gaana"
                  onChange={modalStraemOnChnage}
                  value={modalStreamInpFields.Gaana}
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="YouTube">YouTube</Label>
                <ModalInput
                  type="number"
                  id="YouTube"
                  onChange={modalStraemOnChnage}
                  value={modalStreamInpFields.YouTube}
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="SoundCloud">SoundCloud</Label>
                <ModalInput
                  type="number"
                  id="SoundCloud"
                  onChange={modalStraemOnChnage}
                  value={modalStreamInpFields.SoundCloud}
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="Tiktok">Tiktok</Label>
                <ModalInput
                  type="number"
                  id="Tiktok"
                  onChange={modalStraemOnChnage}
                  value={modalStreamInpFields.Tiktok}
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="FB/Insta">FB/Insta</Label>
                <ModalInput
                  type="number"
                  id="FB/Insta"
                  onChange={modalStraemOnChnage}
                  value={modalStreamInpFields["FB/Insta"]}
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="Hungama">Hungama</Label>
                <ModalInput
                  type="number"
                  id="Hungama"
                  onChange={modalStraemOnChnage}
                  value={modalStreamInpFields.Hungama}
                />
              </LabelInpBox>

              <LabelInpBox>
                <Label htmlFor="Other">Other</Label>
                <ModalInput
                  type="number"
                  id="Other"
                  onChange={modalStraemOnChnage}
                  value={modalStreamInpFields.Other}
                />
              </LabelInpBox>
            </ModalFormBox>
            <BtnBox>
              <button onClick={onStreamSubmit}>Submit</button>
              <button
                onClick={() => {
                  setModalStream(false);
                }}
              >
                Cancel
              </button>
            </BtnBox>
          </ModalBox>
        </Modal>
      )}
      <MainDiv>
        <FloatButton.Group
          open={open}
          onClick={onChange}
          trigger="click"
          style={{
            right: 30,
            transform: "scale(1.5)",
            zIndex: 1,
            bottom: "10%",
          }}
          tooltip={<div>Add Data</div>}
          icon={<UserAddOutlined />}
        >
          <FloatButton
            style={{}}
            onClick={() => {
              setShowLegalMod(true);
              setOpen(!open);
            }}
            tooltip={<div>Agreement</div>}
            icon={
              <DocumentScannerOutlined
                style={{
                  color: "#50CC5E",
                  transform: "scale(.9)",
                }}
              />
            }
          />
          <FloatButton
            style={{}}
            onClick={() => {
              setShowExcel(true);
              setOpen(!open);
            }}
            tooltip={<div>Excel Strem Report</div>}
            icon={
              <SiMicrosoftexcel
                style={{
                  color: "#50CC5E",
                }}
              />
            }
          />
          <FloatButton
            onClick={() => {
              setModalStream(true);
              setOpen(!open);
            }}
            tooltip={<div>Stream Report</div>}
            icon={
              <RiseOutlined
                style={{
                  color: "#2178e9e0",
                }}
              />
            }
          />
          <FloatButton
            style={{}}
            onClick={() => {
              setModalEarning(true);
              setOpen(!open);
            }}
            tooltip={<div>Earnings</div>}
            icon={
              <DollarOutlined
                style={{
                  color: "#50CC5E",
                }}
              />
            }
          />
        </FloatButton.Group>
        {isLoading && <MusicLoader />} {contextHolderNot}
        {contextHolder}
        {!isLoading && (
          <>
            <Breadcrumb
              items={[
                {
                  title: "Admin Panel",
                },
                {
                  title: "User Profile",
                },
              ]}
            />
            <h1>User</h1>
            {userData && (
              <ContentDiv>
                {isLoading && <MusicLoader />}
                <LeftDiv>
                  <img
                    src={
                      userData.userPic.includes("cloudinary")
                        ? `${userData.userPic}`
                        : `${process.env.REACT_APP_BASE_URL}/${userData.userPic}`
                    }
                    alt=""
                  />
                  <div>
                    <span>{userData.name}</span>
                    <span>+91-{userData.phone}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <span
                      style={{
                        width: "100%",
                        padding: "0.5rem 2rem 0.5rem 0.2rem",
                        margin: "0 0 0 0",
                        textTransform: "none",
                      }}
                    >
                      {userData.email}
                    </span>
                  </div>
                </LeftDiv>
                <RightDiv>
                  <div style={{ boxShadow: " 0.2rem 0.2rem 1rem #d8d8d8" }}>
                    <p>Details</p>
                    <div>
                      <span>Label Name</span>
                      <span>{userData.name}</span>
                    </div>
                    <div>
                      <span>Email</span>
                      <span style={{ textTransform: "none" }}>
                        {userData.email}
                      </span>
                    </div>
                    <div>
                      <span>Phone</span>
                      <span>+91-{userData.phone}</span>
                    </div>
                    <div>
                      <span>Channel URL</span>
                      <span>
                        <Link to={`${userData.channelUrl}`} target="_blank">
                          <LinkOutlined />
                        </Link>
                      </span>
                    </div>
                    <div>
                      <span>Address</span>
                      <span>
                        {userData.address &&
                          userData.address.length > 0 &&
                          userData.address + ","}
                        {userData.city}
                      </span>
                    </div>
                    {userData.pincode && (
                      <div>
                        <span>Pincode</span>
                        <span>{userData.pincode}</span>
                      </div>
                    )}
                    <div>
                      <span>State</span>
                      <span>{userData.state}</span>
                    </div>
                    <div>
                      <span>Country</span>
                      <span>{userData.country}</span>
                    </div>

                    <div>
                      <span>Signature</span>
                      <span>
                        <DownloadOutlined
                          onClick={() => {
                            saveAs(userData.sign, `${userData.name}_sign`);
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </RightDiv>
                <RightDiv>
                  <div style={{ boxShadow: " 0.2rem 0.2rem 1rem #d8d8d8" }}>
                    <p>Bank</p>
                    <div>
                      <span>Account No.</span>
                      <span>
                        {userData.bankDetails[0].accountNo.length === 0
                          ? "-"
                          : userData.bankDetails[0].accountNo}
                        {userData.bankDetails[0].accountNo.length !== 0 && (
                          <ContentCopyOutlined
                            style={{
                              cursor: "pointer",
                              transform: "scale(.8)",
                            }}
                            onClick={copyToClipBoard.bind(
                              this,
                              userData.bankDetails[0].accountNo
                            )}
                          />
                        )}
                      </span>
                    </div>
                    <div>
                      <span>IFSC</span>
                      <span>
                        {userData.bankDetails[0].ifsc.length !== 0
                          ? userData.bankDetails[0].ifsc
                          : "-"}
                        {userData.bankDetails[0].ifsc.length !== 0 && (
                          <ContentCopyOutlined
                            style={{
                              cursor: "pointer",
                              transform: "scale(.8)",
                            }}
                            onClick={copyToClipBoard.bind(
                              this,
                              userData.bankDetails[0].ifsc
                            )}
                          />
                        )}
                      </span>
                    </div>
                    <div>
                      <span>Bank Name</span>
                      <span>
                        {userData.bankDetails[0].bankName.length !== 0
                          ? userData.bankDetails[0].bankName
                          : "-"}
                      </span>
                    </div>
                    <div>
                      <span>UPI</span>
                      <span style={{ textTransform: "none" }}>
                        {userData.bankDetails[0].upi.length !== 0
                          ? userData.bankDetails[0].upi
                          : "-"}
                        {userData.bankDetails[0].upi.length > 0 && (
                          <ContentCopyOutlined
                            style={{
                              cursor: "pointer",
                              transform: "scale(.8)",
                            }}
                            onClick={copyToClipBoard.bind(
                              this,
                              userData.bankDetails[0].upi
                            )}
                          />
                        )}
                      </span>
                    </div>
                  </div>
                  <div style={{ boxShadow: " 0.2rem 0.2rem 1rem #d8d8d8" }}>
                    <p>Wallet</p>
                    <div>
                      <span>Total Earnings</span>
                      <span> ₹ {totalEarningUser}</span>
                    </div>
                    <div>
                      <span>Paid</span>
                      <span> ₹ {userData.paidEarning}</span>
                    </div>
                    <div>
                      <span>Remaining</span>
                      <span>
                        {" "}
                        ₹{" "}
                        {Number(totalEarningUser) -
                          Number(userData.paidEarning)}
                      </span>
                    </div>

                    {totalEarningUser > 0 && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "1rem",
                        }}
                      >
                        <BankBtn
                          onClick={() => {
                            setShowPaid(true);
                          }}
                        >
                          Pay
                        </BankBtn>

                        <BankBtn
                          onClick={() => {
                            setShowEditPaid(true);
                          }}
                        >
                          Edit Paid
                        </BankBtn>
                      </div>
                    )}
                  </div>
                </RightDiv>
              </ContentDiv>
            )}
            <h2>Order History</h2>
            <MobileBox>
              {filteredOrders &&
                filteredOrders.map((order) => {
                  if (order.deleted === true) {
                    return;
                  }
                  const {
                    title,
                    language,
                    albumType,
                    status,
                    dateOfRelease,
                    orderDateAndTime,
                    thumbnail,
                    id,
                  } = order;
                  return (
                    <Link to={`/admin-panel/order/${id}`}>
                      <MobileOrderBox>
                        <img src={`${thumbnail}`} alt="" />
                        <TextBox>
                          <span>Title</span>
                          <span>{title}</span>
                        </TextBox>
                        <TextBox>
                          <span>status</span>
                          <span>{status}</span>
                        </TextBox>
                        <TextBox>
                          <span>Date of release</span>
                          <span>{dateOfRelease}</span>
                        </TextBox>
                        <TextBox>
                          <span>language</span>
                          <span>{language}</span>
                        </TextBox>
                        <TextBox>
                          <span>album Type</span>
                          <span>{albumType}</span>
                        </TextBox>
                        <TextBox>
                          <span>Created</span>
                          <span>{orderDateAndTime.split("/")[0]}</span>
                        </TextBox>
                      </MobileOrderBox>
                    </Link>
                  );
                })}{" "}
              {filteredOrders && filteredOrders.length === 0 && !isLoading && (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </MobileBox>
            <TableBox>
              {orders && (
                <Table cellSpacing={0}>
                  <TableHead>
                    <tr>
                      <td></td>
                      <td>Album</td>
                      <td>Album Type</td>
                      <td>Language</td>
                      <td>Created</td>
                      <td>Date Of release</td>
                      <td>Status</td>
                      <td>View</td>
                    </tr>
                  </TableHead>{" "}
                  <TableBody>
                    {filteredOrders.map((ord) => {
                      if (ord.deleted === true) {
                        return;
                      }
                      const {
                        title,
                        language,
                        albumType,
                        status,
                        dateOfRelease,
                        orderDateAndTime,
                        thumbnail,
                        id,
                      } = ord;
                      sNo++;
                      return (
                        <tr
                          key={ord.id}
                          style={{
                            backgroundColor:
                              sNo % 2 === 0 ? "#FAFAFC" : "white",
                          }}
                        >
                          <td>{sNo}</td>
                          <td>
                            <span>
                              <img src={`${thumbnail}`} alt="" />
                              {title}
                            </span>
                          </td>
                          <td>{albumType}</td>
                          <td>{language}</td>
                          <td>{orderDateAndTime.split("/")[0]}</td>
                          <td>{dateOfRelease}</td>
                          {status === "waiting" && (
                            <td>
                              <div
                                style={{
                                  backgroundColor: "#FFF2D7",
                                  color: "#FFBC21",
                                }}
                              >
                                <ClockCircleOutlined /> waiting for approval
                              </div>
                            </td>
                          )}
                          {status === "processing" && (
                            <td>
                              <div
                                style={{
                                  backgroundColor: "#D8F2FF",
                                  color: "#42C3FF",
                                }}
                              >
                                <EditOutlined /> processing
                              </div>
                            </td>
                          )}
                          {status === "completed" && (
                            <td>
                              <div
                                style={{
                                  backgroundColor: "#D9EDDB",
                                  color: "#59BB5A",
                                }}
                              >
                                <CheckCircleTwoTone twoToneColor="#52c41a" />
                                completed
                              </div>
                            </td>
                          )}
                          {status === "rejected" && (
                            <td>
                              <div
                                style={{
                                  backgroundColor: "#e9dede",
                                  color: "#ff0000",
                                }}
                              >
                                <CloseOutlined />
                                rejected
                              </div>
                            </td>
                          )}
                          <td>
                            <Link to={`/admin-panel/order/${id}`}>
                              <EyeOutlined />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
              {filteredOrders && filteredOrders.length === 0 && !isLoading && (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </TableBox>
            <h2>Reports</h2>
            {userData && !isLoading && (
              <ReportDiv>
                <ReportLeftDiv>
                  {" "}
                  <ChartBox>
                    <div style={{ padding: "0 1rem" }}>
                      {" "}
                      <h2>Earning</h2>{" "}
                      <Select
                        name="category"
                        id="category"
                        onChange={getSelectedValue}
                      >
                        <Option value={`${currentYear}`}>{currentYear}</Option>
                        <Option value={`${currentYear - 1}`}>
                          {currentYear - 1}
                        </Option>
                        <Option value={`${currentYear - 2}`}>
                          {currentYear - 2}
                        </Option>
                      </Select>
                    </div>
                    {earningData && (
                      <ResponsiveContainer width={"100%"} height={300}>
                        <AreaChart
                          width={500}
                          height={400}
                          data={earningData}
                          margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="1 1" />
                          <XAxis dataKey="name" style={{ fontSize: ".8rem" }} />
                          <YAxis />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="amount"
                            stroke="#8884d8"
                            fill="#1677FF"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </ChartBox>
                  <ChartBox>
                    <div style={{ padding: "0 1rem" }}>
                      {" "}
                      <h2>Reports</h2>{" "}
                      <div style={{ display: "flex", gap: "1rem" }}>
                        <Select
                          name="reportMonth"
                          id="reportMonth"
                          onChange={(e) => {
                            const ele = document.querySelector(
                              `#${e.target.id}`
                            );
                            const value = ele.options[ele.selectedIndex].value;
                            setSelectedMonth(value);
                            let resArr;
                            if (
                              (resArr =
                                userData.analytics[0][reportSelectedYear])
                            ) {
                              resArr =
                                userData.analytics[0][reportSelectedYear][
                                  value
                                ];
                            }
                            if (!resArr) {
                              resArr = defaultReports;
                            }
                            let arr = [];
                            for (const key in resArr) {
                              const obj = {
                                name: key,
                                views: resArr[key],
                              };
                              arr.push(obj);
                            }
                            setReportData(arr);
                          }}
                        >
                          <Option value={`${months[currentMonth]}`}>
                            {months[currentMonth]}
                          </Option>
                          {months.map((m) => {
                            if (m === months[currentMonth]) {
                              return;
                            }
                            return (
                              <Option key={m} value={`${m}`}>
                                {m}
                              </Option>
                            );
                          })}
                        </Select>
                        <Select
                          name="reportsYear"
                          id="reportsYear"
                          onChange={reportsYearChanger}
                        >
                          <Option value={`${currentYear}`}>
                            {currentYear}
                          </Option>
                          <Option value={`${currentYear - 1}`}>
                            {currentYear - 1}
                          </Option>
                          <Option value={`${currentYear - 2}`}>
                            {currentYear - 2}
                          </Option>
                        </Select>
                      </div>
                    </div>
                    <ResponsiveContainer width={"100%"} height={300}>
                      <BarChart
                        width={500}
                        height={400}
                        data={reportData}
                        margin={{
                          top: 10,
                          right: 10,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="1 1" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Bar
                          dataKey="views"
                          fill="#82ca9d"
                          activeBar={<Rectangle fill="gold" stroke="purple" />}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartBox>
                </ReportLeftDiv>
                <ReportRightDiv>
                  <h2>Reports Summary</h2>

                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart width={1000} height={400}>
                      <Pie
                        dataKey="views"
                        isAnimationActive={true}
                        data={reportData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        label
                      >
                        {reportData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORSSTREAM[entry["name"]]}
                          />
                        ))}
                      </Pie>

                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <ReportTable>
                    <thead>
                      <tr>
                        <td></td>
                        <td>platform</td>
                        <td>Views</td>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.map((obj) => {
                        const { name, views } = obj;
                        return (
                          <tr key={name}>
                            <td
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: ".4rem",
                                alignItems: "center",
                                width: "100%",
                              }}
                            >
                              <div
                                style={{
                                  backgroundColor: `${COLORSSTREAM[name]}`,
                                }}
                              ></div>
                            </td>
                            <td>{name}</td>
                            <td>{views}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </ReportTable>
                </ReportRightDiv>
              </ReportDiv>
            )}
          </>
        )}
      </MainDiv>
    </>
  );
};

export default UserProfile;
