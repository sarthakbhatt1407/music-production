import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styled, { keyframes } from "styled-components";
import MusicLoader from "../Loader/MusicLoader";
import { Image, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { notification } from "antd";
import { message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { CloseOutlined, DoneOutline, LinkOutlined } from "@mui/icons-material";
import { saveAs } from "file-saver";
const OuterBox = styled.div`
  width: 100%;
  height: 99%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h1 {
    margin: 0;
  }
`;

const MainDiv = styled.div`
  background-color: white;
  width: 100%;
  height: fit-content;
  border-radius: 0.5rem;
  position: relative;
  display: grid;

  grid-template-columns: 1fr 1fr;
  /* display: none; */
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    /* grid-template-columns: 1fr; */
    display: flex;
    flex-direction: column;
  }
`;
const LeftAni = keyframes`
    
    0%{
        transform: translateX(50%);
        z-index: 2;
        opacity:0 ;
    }
    
    100%{
        transform: translateX(0%);
        z-index: 2;
        opacity:1;
    }
`;
const RightAni = keyframes`
    
    0%{
        transform: translateX(-50%);        opacity:0 ;
    }
    
    100%{
        transform: translateX(0%);        opacity:1 ;
    }
`;

const LeftDiv = styled.div`
  display: flex;

  animation: ${LeftAni} 0.8s;
  height: 80svh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1rem;
  padding: 1rem 3rem;

  img {
    margin: 0;
    width: 50%;
  }
  h1 {
    margin: 0;
    text-transform: capitalize;
  }
  p {
    margin: 0;
    color: #000000d3;
    font-size: 1rem;
  }
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    padding: 1rem 0.2rem;
    height: 50svh;

    img {
      /* width: 10%; */
    }
    animation: ${LeftAni} 0.5s;
  }
`;
const RightDiv = styled.div`
  animation: ${RightAni} 0.8s;
  display: flex;
  flex-direction: column;

  padding: 1rem 2rem;

  div {
    display: grid;
    margin: 0.5rem 0;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    text-align: justify;
    text-transform: capitalize;

    span {
      padding: 0.4rem 1rem;
      text-overflow: clip;
      &:first-child {
        text-transform: capitalize;
        font-weight: 500;
      }
    }
    &:nth-child(2n) {
      span {
        background-color: #fafafc;
      }
    }
  }
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    padding: 1rem 0.2rem;
    animation: ${RightAni} 0.5s;
    div {
      text-justify: auto;
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

const Input = styled.input`
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

const OrderDetailsPage = () => {
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

  const id = useParams().id;
  const [order, setOrder] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [orderLoop, setOrderLoop] = useState([]);
  const [refresher, setRefresher] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const fetcher = async () => {
    setIsloading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/order/get-order/?id=${id}`
    );
    const data = await res.json();
    console.log(data);
    if (!data.order) {
      navigate("/admin-panel/pending-work");
    }
    setOrder(data.order);
    setIsloading(false);
    let arr = [];
    for (const key in data.order) {
      if (
        key === "_id" ||
        key === "id" ||
        key === "userId" ||
        key === "deleted" ||
        key === "__v"
      ) {
        continue;
      }
      if (data.order[key].length === 0) {
        continue;
      }

      const obj = {
        field: key,
        value: data.order[key],
        id: Math.random() * 99999999999,
      };
      arr.push(obj);
    }
    setOrderLoop(arr);
  };
  const confirm = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/order/update-order/?id=${order.id}&action=statusAccepted&userId=${userId}`,
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
          navigate("/admin-panel/pending-work");
        }, 500);
      });
    }
    console.log(data);
  };

  useEffect(() => {
    fetcher();

    return () => {};
  }, [id]);

  const onChangeHandler = (e) => {
    const id = e.target.id;
    const ele = document.querySelector(`#${id}`);

    ele.style.border = "1px solid #d7d7d7";
  };

  const onSubmitHandler = async () => {
    const ele = document.querySelector(`#remark`);
    if (ele.value.trim().length === 0) {
      ele.style.border = "1px solid red";
      openNotificationWithIcon("error", "Fill all require fields.");
      return;
    }
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/order/update-order/?id=${order.id}&action=statusRejected&userId=${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          remark: ele.value,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      openNotificationWithIcon("success", data.message);
      setTimeout(() => {
        navigate("/admin-panel/orders");
      }, 600);
    }
    if (!res.ok) {
      openNotificationWithIcon("error", data.message);
    }
    setShowModal(false);
  };

  return (
    <OuterBox>
      {" "}
      {showModal && (
        <Modal>
          <ModalBox data-aos="zoom-in">
            <ModalFormBox>
              <LabelInpBox>
                <Label htmlFor="remark">remark</Label>
                <Input type="text" id="remark" onChange={onChangeHandler} />
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
      {/* <Breadcrumb
        items={[
          {
            title: <Link to={"/user-panel"}>User Panel</Link>,
          },
          {
            title: <Link to={"/user-panel/history"}>History</Link>,
          },
          {
            title: "Order Details",
          },
        ]}
      />{" "} */}
      <h1>Order Details</h1>
      <MainDiv>
        {contextHolderNot}
        {contextHolder}
        {isLoading && <MusicLoader />}
        {!isLoading && order && (
          <>
            <LeftDiv>
              {/* <img src={`${order.thumbnail}`} alt="" /> */}{" "}
              <Image
                width={200}
                src={`${order.thumbnail}`}
                placeholder={
                  <Image
                    preview={false}
                    src={`${order.thumbnail}`}
                    width={200}
                  />
                }
              />
              <h1>{order.title}</h1>
              <p>{order.description}</p>
            </LeftDiv>
            <RightDiv>
              {orderLoop.length > 0 &&
                orderLoop.map((obj) => {
                  let { field, value, id } = obj;
                  if (field === "labelName") {
                    field = "Label name";
                  }
                  if (field === "subLabel1") {
                    field = "sub label";
                  }
                  if (field === "subLabel2") {
                    field = "sub label";
                  }
                  if (field === "subLabel3") {
                    field = "sub label";
                  }
                  if (field === "dateOfRelease") {
                    field = "date of release";
                  }
                  if (field === "AlbumType") {
                    field = "Album Type";
                  }
                  if (field === "albumType") {
                    field = "Album Type";
                  }
                  if (field === "orderDateAndTime") {
                    field = "order Date";
                    value = value.split("/")[0];
                  }
                  if (field === "singerAppleId") {
                    field = "singer Apple Id";
                    return (
                      <div key={id}>
                        <span>{field}</span>
                        <span>
                          <Link to={value} target="_blank">
                            <LinkOutlined />
                          </Link>
                        </span>
                      </div>
                    );
                  }
                  if (field === "singerFacebookUrl") {
                    field = "singer Facebook Url";
                    return (
                      <div key={id}>
                        <span>{field}</span>
                        <span>
                          <Link to={value} target="_blank">
                            <LinkOutlined />
                          </Link>
                        </span>
                      </div>
                    );
                  }
                  if (field === "singerInstagramUrl") {
                    field = "singer Instagram Url";
                    return (
                      <div key={id}>
                        <span>{field}</span>
                        <span>
                          <Link to={value} target="_blank">
                            <LinkOutlined />
                          </Link>
                        </span>
                      </div>
                    );
                  }
                  if (field === "singerSpotifyId") {
                    field = "singer Spotify Id";
                    return (
                      <div key={id}>
                        <span>{field}</span>
                        <span>
                          <Link to={value} target="_blank">
                            <LinkOutlined />
                          </Link>
                        </span>
                      </div>
                    );
                  }
                  if (field === "composerAppleId") {
                    field = "composer Apple Id";
                    return (
                      <div key={id}>
                        <span>{field}</span>
                        <span>
                          <Link to={value} target="_blank">
                            <LinkOutlined />
                          </Link>
                        </span>
                      </div>
                    );
                  }
                  if (field === "composerFacebookUrl") {
                    field = "composer Facebook Url";
                    return (
                      <div key={id}>
                        <span>{field}</span>
                        <span>
                          <Link to={value} target="_blank">
                            <LinkOutlined />
                          </Link>
                        </span>
                      </div>
                    );
                  }
                  if (field === "composerSpotifyId") {
                    field = "composer Spotify Id";
                    return (
                      <div key={id}>
                        <span>{field}</span>
                        <span>
                          <Link to={value} target="_blank">
                            <LinkOutlined />
                          </Link>
                        </span>
                      </div>
                    );
                  }
                  if (field === "composerInstagramUrl") {
                    field = "composer Instagram Url";
                    return (
                      <div key={id}>
                        <span>{field}</span>
                        <span>
                          <Link to={value} target="_blank">
                            <LinkOutlined />
                          </Link>
                        </span>
                      </div>
                    );
                  }
                  if (field === "lyricistAppleId") {
                    field = "lyricist Apple Id";
                    return (
                      <div key={id}>
                        <span>{field}</span>
                        <span>
                          <Link to={value} target="_blank">
                            <LinkOutlined />
                          </Link>
                        </span>
                      </div>
                    );
                  }
                  if (field === "lyricistFacebookUrl") {
                    field = "lyricist Facebook Url";
                    return (
                      <div key={id}>
                        <span>{field}</span>
                        <span>
                          <Link to={value} target="_blank">
                            <LinkOutlined />
                          </Link>
                        </span>
                      </div>
                    );
                  }
                  if (field === "lyricistInstagramUrl") {
                    field = "lyricist Instagram Url";
                    return (
                      <div key={id}>
                        <span>{field}</span>
                        <span>
                          <Link to={value} target="_blank">
                            <LinkOutlined />
                          </Link>
                        </span>
                      </div>
                    );
                  }
                  if (field === "lyricistSpotifyId") {
                    field = "lyricist Spotify Id";
                    return (
                      <div key={id}>
                        <span>{field}</span>
                        <span>
                          <Link to={value} target="_blank">
                            <LinkOutlined />
                          </Link>
                        </span>
                      </div>
                    );
                  }
                  if (field === "starCast") {
                    field = "star Cast";
                  }
                  if (field === "thumbnail") {
                    return (
                      <div key={id}>
                        <span>{field}</span>
                        <span>
                          <Link>
                            <DownloadOutlined
                              onClick={() => {
                                saveAs(value, `${order.title}`);
                              }}
                              style={{ transform: "scale(1.5)" }}
                            />
                          </Link>
                        </span>
                      </div>
                    );
                  }
                  if (field === "file") {
                    return (
                      <div key={id}>
                        <span>{field}</span>
                        <span>
                          <Link
                            to={`${process.env.REACT_APP_BASE_URL}/file/download/?filePath=${value}`}
                            target="_blank"
                          >
                            <DownloadOutlined
                              style={{ transform: "scale(1.5)" }}
                            />
                          </Link>
                        </span>
                      </div>
                    );
                  }
                  return (
                    <div key={id}>
                      <span>{field}</span>
                      <span style={{ overflowWrap: "anywhere" }}>
                        {value === "completed" ? "live" : value}
                      </span>
                    </div>
                  );
                })}
              {order.status === "waiting" && (
                <>
                  <div>
                    <span>
                      {" "}
                      <Popconfirm
                        title="Confirm"
                        description="Do you want to approve?"
                        onConfirm={confirm}
                        onOpenChange={() => console.log("open change")}
                      >
                        <Link
                          style={{
                            backgroundColor: "#a1da6c",
                            color: "white",
                            padding: ".4rem .7rem",
                            gap: ".3rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "48%",
                            borderRadius: ".5rem",
                          }}
                        >
                          <DoneOutline />
                          Approve
                        </Link>
                      </Popconfirm>
                    </span>
                  </div>
                  <div>
                    <span style={{ backgroundColor: "white" }}>
                      {" "}
                      <Popconfirm
                        title="Confirm"
                        description="Do you want to reject?"
                        onConfirm={() => {
                          setShowModal(true);
                        }}
                        onOpenChange={() => console.log("open change")}
                      >
                        <Link
                          style={{
                            backgroundColor: "#e86464",
                            color: "white",
                            padding: ".4rem .7rem",
                            gap: ".3rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "48%",
                            borderRadius: ".5rem",
                          }}
                        >
                          <CloseOutlined />
                          Reject
                        </Link>
                      </Popconfirm>
                    </span>
                  </div>
                </>
              )}
            </RightDiv>
          </>
        )}
      </MainDiv>
    </OuterBox>
  );
};

export default OrderDetailsPage;
