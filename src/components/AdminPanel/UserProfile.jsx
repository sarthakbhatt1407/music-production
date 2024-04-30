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
  SmartDisplayOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import MusicLoader from "../Loader/MusicLoader";
import { notification } from "antd";
import { message } from "antd";

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
    width: 100%;
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
  grid-template-columns: 2fr 1fr;
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
const UserProfile = () => {
  const date = new Date();
  const currentYear = date.getFullYear();

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
    Amazon: 0,
    Youtube: 0,
    "Apple Music": 0,
    Saavan: 0,
    Wynk: 0,
  };
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
  const [orders, setOrders] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState(null);
  const copyToClipBoard = async (txt) => {
    try {
      await navigator.clipboard.writeText(txt);
      openNotificationWithIcon("success", "Copied to clipboard");
      console.log("Content copied to clipboard");
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
      console.log(data.orders.reverse());
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
    console.log(data);
    if (res.ok) {
      setUserdata(data.user);

      // for analytics
      let resArr = data.user.analytics[0][reportSelectedYear];
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

  useEffect(() => {
    userDetailsFetch();
    userOrderFetcher();
    return () => {};
  }, []);

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
    console.log(value);
    setReportSelectedYear(Number(value));

    let resArr = userData.analytics[0][value];
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
    console.log(arr);
    setReportData(arr);
  };
  const [open, setOpen] = useState(false);
  const onChange = (checked) => {
    setOpen(!open);
  };

  return (
    <MainDiv>
      <FloatButton.Group
        open={open}
        onClick={onChange}
        trigger="click"
        style={{
          right: 30,
          transform: "scale(1.5)",
          zIndex: 1,
        }}
        tooltip={<div>Add Data</div>}
        icon={<UserAddOutlined />}
      >
        <FloatButton
          onClick={() => {
            window.open("https://www.whatsapp.com/", "_blank");
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
            window.open("https://www.whatsapp.com/", "_blank");
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
                <img src={random} alt="" />
                <div>
                  <span>{userData.name}</span>
                  <span>+91-{userData.phone}</span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
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
                    <span>Name</span>
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
                    <span>City</span>
                    <span>{userData.city}</span>
                  </div>
                  <div>
                    <span>State</span>
                    <span>{userData.state}</span>
                  </div>
                  <div>
                    <span>Country</span>
                    <span>{userData.country}</span>
                  </div>
                </div>
              </RightDiv>
              <RightDiv>
                <div style={{ boxShadow: " 0.2rem 0.2rem 1rem #d8d8d8" }}>
                  <p>Bank</p>
                  <div>
                    <span>Account No.</span>
                    <span>
                      {userData.bankDetails[0].accountNo}
                      <ContentCopyOutlined
                        style={{ cursor: "pointer", transform: "scale(.8)" }}
                        onClick={copyToClipBoard.bind(this, "454515454848")}
                      />
                    </span>
                  </div>
                  <div>
                    <span>IFSC</span>
                    <span>
                      {userData.bankDetails[0].ifsc}
                      <ContentCopyOutlined
                        style={{ cursor: "pointer", transform: "scale(.8)" }}
                        onClick={copyToClipBoard.bind(this, "HDFC00005144")}
                      />
                    </span>
                  </div>
                  <div>
                    <span>Bank Name</span>
                    <span>{userData.bankDetails[0].bankName}</span>
                  </div>
                  <div>
                    <span>UPI</span>
                    <span style={{ textTransform: "none" }}>
                      {userData.bankDetails[0].upi}
                      <ContentCopyOutlined
                        style={{ cursor: "pointer", transform: "scale(.8)" }}
                        onClick={copyToClipBoard.bind(this, "751649898@paytm")}
                      />
                    </span>
                  </div>
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
                console.log(thumbnail);
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
                          backgroundColor: sNo % 2 === 0 ? "#FAFAFC" : "white",
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
                      <Option value={2024}>2024</Option>
                      <Option value={2025}>2025</Option>
                      <Option value={2026}>2026</Option>
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
                    <Select
                      name="reportsYear"
                      id="reportsYear"
                      onChange={reportsYearChanger}
                    >
                      <Option value={2024}>2024</Option>
                      <Option value={2025}>2025</Option>
                      <Option value={2026}>2026</Option>
                    </Select>
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
                  <PieChart width={400} height={400}>
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
                          fill={COLORS[index % COLORS.length]}
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
                            <div></div>
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
  );
};

export default UserProfile;