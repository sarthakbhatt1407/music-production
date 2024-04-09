import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styled, { keyframes } from "styled-components";
import MusicLoader from "../Loader/MusicLoader";
import { Image, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
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
const BtnBox = styled.div`
  padding: 0.3rem 0.7rem;
  display: flex;
  justify-content: center;
  gap: 1rem;

  a {
    background-color: #e9e9e9;
    width: 40%;
    margin: 0 auto;
    text-align: center;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    color: black;
    display: flex;
    align-items: center;
    &:hover {
      box-shadow: 0.2rem 0.2rem 0.6rem #bfbfbf;
    }
  }
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    a {
      width: 100%;
    }
  }
`;

const OrderDetailsPage = () => {
  const id = useParams().id;
  const [order, setOrder] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [orderLoop, setOrderLoop] = useState([]);
  const navigate = useNavigate();
  const fetcher = async () => {
    setIsloading(true);
    const res = await fetch(`http://localhost:5000/order/get-order/?id=${id}`);
    const data = await res.json();
    console.log(data);
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
      `http://localhost:5000/order/update-order/?id=${order.id}&action=delete`,
      {
        method: "PATCH",
      }
    );
    const data = await res.json();
    if (res.ok) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
          navigate("/user-panel/history");
        }, 500);
      });
    }
    console.log(data);
  };

  useEffect(() => {
    fetcher();
    return () => {};
  }, [id]);

  return (
    <OuterBox>
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
        {isLoading && <MusicLoader />}
        {!isLoading && order && (
          <>
            <LeftDiv>
              {/* <img src={`http://localhost:5000/${order.thumbnail}`} alt="" /> */}{" "}
              <Image
                width={200}
                src={`http://localhost:5000/${order.thumbnail}`}
                placeholder={
                  <Image
                    preview={false}
                    src={`http://localhost:5000/${order.thumbnail}`}
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
                  if (field === "starCast") {
                    field = "star Cast";
                  }
                  if (field === "thumbnail") {
                    return (
                      <div key={id}>
                        <span>{field}</span>
                        <span>
                          <Link
                            to={`http://localhost:5000/file/download/?filePath=${value}`}
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
                  if (field === "file") {
                    return (
                      <div key={id}>
                        <span>{field}</span>
                        <span>
                          <Link
                            to={`http://localhost:5000/file/download/?filePath=${value}`}
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
                      <span style={{ overflowWrap: "anywhere" }}>{value}</span>
                    </div>
                  );
                })}
              {order.status === "waiting" && (
                <BtnBox>
                  {" "}
                  <Popconfirm
                    title="Confirm"
                    description="Do you want to delete?"
                    onConfirm={confirm}
                    onOpenChange={() => console.log("open change")}
                  >
                    <Link>
                      <DeleteOutlined />
                      Delete
                    </Link>
                  </Popconfirm>
                  {/* <Link to={`/user-panel/order/${order._id}/edit`}>
                    <EditOutlined /> Edit
                  </Link> */}
                  <Link to={`/user-panel/order/${order._id}/edit`}>
                    <EditOutlined /> Edit
                  </Link>
                </BtnBox>
              )}
            </RightDiv>
          </>
        )}
      </MainDiv>
    </OuterBox>
  );
};

export default OrderDetailsPage;
