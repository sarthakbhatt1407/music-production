import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Popconfirm } from "antd";
import { notification } from "antd";
import { message } from "antd";
import {
  EyeOutlined,
  ClockCircleOutlined,
  CheckCircleTwoTone,
  EditOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import MusicLoader from "../Loader/MusicLoader";
import { Breadcrumb } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Empty } from "antd";
import { useSelector } from "react-redux";
import { Done, PersonOutline } from "@mui/icons-material";

const MainBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  position: relative;
  a {
    color: black;
    text-decoration: none;
  }
`;

const TableBox = styled.div`
  height: 71svh;
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
const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 1rem;
  align-items: center;
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    flex-direction: column;
    justify-content: start;
    padding: 0;
    align-items: start;
    margin-bottom: 1rem;
    input {
      width: 100%;
    }
  }
`;
const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 0.6rem;
  outline: none;
  border: 1px solid #d7d7d7;
  width: 30%;
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

// name: { type: String, required: true },
// email: { type: String, required: true },
// phone: { type: Number, required: true },
// finacialReport: { type: Array, required: true },
// analytics: { type: Array, required: true },
// city: { type: String, required: true },
// state: { type: String, required: true },
// country: { type: String, required: true },
// password: { type: String, required: true },
// userSince: { type: String, required: true },
// isAdmin: { type: Boolean, required: true },
// bankDetails: { type: Array, required: true },

const MobileBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 70svh;
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
const History = () => {
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
  const userId = useSelector((state) => state.userId);
  const navigate = useNavigate();
  const [orders, setOrders] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  let sNo = 0;
  const fetcher = async () => {
    setIsloading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/order/get-all-orders/?userId=${userId}`
    );
    const data = await res.json();

    if (res.ok) {
      setOrders(data.orders.reverse());
      setFilteredOrders(data.orders.reverse());
    } else {
      setOrders([]);
      setFilteredOrders([]);
    }
    setIsloading(false);
  };

  const confirm = async (id) => {
    setIsloading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/order/update-order/?id=${id}&action=completed&userId=${userId}`,
      {
        method: "PATCH",
      }
    );
    const data = await res.json();
    if (res.ok) {
      openNotificationWithIcon("success", data.message);
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
          navigate("/admin-panel/history");
        }, 500);
      });
    } else {
      openNotificationWithIcon("error", data.message);
    }
    setIsloading(false);
  };
  useEffect(() => {
    fetcher();
    return () => {};
  }, []);

  const onCHangeHandler = (e) => {
    const val = e.target.value.toLowerCase();

    const arr = orders.filter((ord) => {
      return (
        ord.title.toLowerCase().includes(val) ||
        ord.labelName.toLowerCase().includes(val) ||
        ord.isrc.toLowerCase().includes(val)
      );
    });
    setFilteredOrders(arr);
  };

  return (
    <MainBox>
      {" "}
      {contextHolderNot}
      {contextHolder}
      <Breadcrumb
        items={[
          {
            title: "Admin Panel",
          },
          {
            title: "History",
          },
        ]}
      />
      <HeaderBox>
        <h1>History</h1>
        <Input
          type="text"
          placeholder="search album"
          onChange={onCHangeHandler}
        />
      </HeaderBox>
      {isLoading && <MusicLoader />}
      <TableBox>
        {orders && (
          <Table cellSpacing={0}>
            <TableHead>
              <tr>
                <td></td>
                <td>Thumbnail</td>
                <td>Album</td>
                <td>Label</td>
                <td>Album Type</td>
                <td>Language</td>
                <td>Created</td>
                <td>Date Of release</td>
                <td>Status</td>
                <td>User</td>
                <td>View</td>
              </tr>
            </TableHead>{" "}
            <TableBody>
              {filteredOrders.map((ord) => {
                if (ord.deleted === true) {
                  return;
                }
                if (ord.status !== "takedown" && ord.status !== "completed") {
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
                  labelName,
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
                    <td style={{ textAlign: "center" }}>
                      <span>
                        <img
                          src={`${process.env.REACT_APP_BASE_URL}/${thumbnail}`}
                          alt=""
                        />
                      </span>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        textTransform: "capitalize",
                      }}
                    >
                      <span>{title.toLowerCase()}</span>
                    </td>
                    <td
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {labelName.toLowerCase()}
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
                          Live
                        </div>
                      </td>
                    )}
                    {(status === "rejected" || status === "takedown") && (
                      <td>
                        <div
                          style={{
                            backgroundColor: "#e9dede",
                            color: "#ff0000",
                          }}
                        >
                          <CloseOutlined />
                          {status === "rejected" ? "rejected" : "removed"}
                        </div>
                      </td>
                    )}
                    <td>
                      <Link to={`/admin-panel/user-profile/${ord.userId}`}>
                        <PersonOutline />
                      </Link>
                    </td>
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
      <MobileBox>
        {filteredOrders &&
          filteredOrders.map((order) => {
            if (order.deleted === true || order.status !== "completed") {
              return;
            }
            const {
              labelName,
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
              <Link>
                <MobileOrderBox>
                  <img src={`${thumbnail}`} alt="" />
                  <TextBox>
                    <span>Title</span>
                    <span>{title}</span>
                  </TextBox>
                  <TextBox>
                    <span>Label</span>
                    <span>{labelName}</span>
                  </TextBox>
                  <TextBox>
                    <span>status</span>
                    <span>{status === "completed" ? "live" : status}</span>
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
                    <span>View</span>
                    <span>
                      <Link to={`/admin-panel/order/${id}`}>
                        <EyeOutlined />
                      </Link>
                    </span>
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
    </MainBox>
  );
};

export default History;
