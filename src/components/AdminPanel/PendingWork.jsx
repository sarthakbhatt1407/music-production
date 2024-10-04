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
  /* &::-webkit-scrollbar {
    display: none;
  } */
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const BtnBox = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
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

const PendingWork = () => {
  const [showModal, setShowModal] = useState(false);
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
  const [inpFields, setInpFields] = useState({
    upc: "",
    isrc: "",
    id: "",
  });

  const onChangeHandler = (e) => {
    const id = e.target.id;
    const val = e.target.value;
    const ele = document.querySelector(`#${id}`);

    ele.style.border = "1px solid #d7d7d7";
    setInpFields({ ...inpFields, [id]: val.trim() });
  };

  const onSubmitHandler = async () => {
    if (inpFields.upc.length < 1 || inpFields.isrc.length === 0) {
      if (inpFields.upc.length === 0) {
        const upc = document.querySelector("#upc");
        upc.style.border = "1px solid red";
      }
      if (inpFields.isrc.length === 0) {
        const isrc = document.querySelector("#isrc");
        isrc.style.border = "1px solid red";
      }

      openNotificationWithIcon("error", "Fill all require fields.");
      return;
    }
    setIsloading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/order/add-upc-isrc`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          upc: inpFields.upc,
          isrc: inpFields.isrc,
          adminId: userId,
          id: inpFields.id,
        }),
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
    setShowModal(false);
  };

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
      if (ord.title && ord.labelName) {
        return (
          ord.title.toString().toLowerCase().includes(val) ||
          ord.labelName.toString().toLowerCase().includes(val)
        );
      }
    });
    setFilteredOrders(arr);
  };

  return (
    <MainBox>
      {" "}
      {showModal && (
        <Modal>
          <ModalBox data-aos="zoom-in">
            <ModalFormBox>
              <LabelInpBox>
                <Label htmlFor="accountNo">UPC</Label>
                <ModalInput
                  type="text"
                  id="upc"
                  onChange={onChangeHandler}
                  value={inpFields.upc}
                />
              </LabelInpBox>
              <LabelInpBox>
                <Label htmlFor="ifsc">isrc</Label>
                <ModalInput
                  type="text"
                  id="isrc"
                  onChange={onChangeHandler}
                  value={inpFields.isrc}
                />
              </LabelInpBox>

              <BtnBox>
                <button onClick={onSubmitHandler}>Submit</button>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Cancel
                </button>
              </BtnBox>
            </ModalFormBox>
          </ModalBox>
        </Modal>
      )}
      {contextHolderNot}
      {contextHolder}
      <Breadcrumb
        items={[
          {
            title: "Admin Panel",
          },
          {
            title: "Pending work",
          },
        ]}
      />
      <HeaderBox>
        <h1>Pending work</h1>
        <Input
          type="text"
          placeholder="search album"
          onChange={onCHangeHandler}
        />
      </HeaderBox>{" "}
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
                <td>View Details</td>
                <td>Action</td>
              </tr>
            </TableHead>{" "}
            <TableBody>
              {filteredOrders.map((ord) => {
                if (ord.deleted === true || ord.status !== "processing") {
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
                const th = thumbnail.includes("cloudinary")
                  ? thumbnail
                  : `${process.env.REACT_APP_BASE_URL}/${thumbnail}`;

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
                        {/* ${process.env.REACT_APP_BASE_URL}/${thumbnail} */}
                        <img src={th} alt="" />
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
                    )}{" "}
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
                    <td>
                      <Popconfirm
                        title="Confirm"
                        description="Album completed?"
                        onConfirm={() => {
                          const order = filteredOrders.find((ord) => {
                            return ord.id === id;
                          });
                          setInpFields({
                            upc: order.upc,
                            isrc: order.isrc,
                            id: order.id,
                          });
                          setShowModal(true);
                        }}
                      >
                        <Link>
                          <Done />
                        </Link>
                      </Popconfirm>
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
            if (order.deleted === true || order.status !== "processing") {
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
            } = order;
            return (
              <Link>
                <MobileOrderBox>
                  <img src={`${thumbnail}`} alt="" />
                  <TextBox>
                    <span>Title</span>
                    <span>{title}</span>
                  </TextBox>{" "}
                  <TextBox>
                    <span>Label</span>
                    <span>{labelName}</span>
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
                  <TextBox>
                    <span>View</span>
                    <span>
                      <Link to={`/admin-panel/order/${id}`}>
                        <EyeOutlined />
                      </Link>
                    </span>
                  </TextBox>
                  <TextBox>
                    <span>Completed</span>
                    <span>
                      {" "}
                      <Popconfirm
                        title="Confirm"
                        description="Album completed?"
                        onConfirm={() => {
                          const order = filteredOrders.find((ord) => {
                            return ord.id === id;
                          });
                          setInpFields({
                            upc: order.upc,
                            isrc: order.isrc,
                            id: order.id,
                          });
                          setShowModal(true);
                        }}
                      >
                        <Link>
                          <Done />
                        </Link>
                      </Popconfirm>
                    </span>
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

export default PendingWork;
