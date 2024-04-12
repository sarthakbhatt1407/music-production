import React, { useEffect, useState } from "react";
import styled from "styled-components";

import MusicLoader from "../Loader/MusicLoader";
import { Breadcrumb, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { Empty } from "antd";
import { useSelector } from "react-redux";
import {
  RemoveRedEyeOutlined,
  SettingsBackupRestoreOutlined,
} from "@mui/icons-material";
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

const DeletedOrders = () => {
  const userId = useSelector((state) => state.userId);

  const [orders, setOrders] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [refresher, setRefresher] = useState(0);
  let sNo = 0;
  const fetcher = async () => {
    setIsloading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/order/user-all-orders/?user=${userId}`
    );
    const data = await res.json();

    if (res.ok) {
      console.log(data.orders.reverse());
      setOrders(data.orders.reverse());
      setFilteredOrders(data.orders.reverse());
    }
    if (!data.orders) {
      setOrders([]);
      setFilteredOrders([]);
    }
    setIsloading(false);
  };

  useEffect(() => {
    fetcher();
    return () => {};
  }, [refresher]);

  const onCHangeHandler = (e) => {
    const val = e.target.value.toLowerCase();
    const arr = orders.filter((ord) => {
      return ord.title.toLowerCase().includes(val);
    });
    setFilteredOrders(arr);
  };
  const confirm = async (id) => {
    const res = await fetch(
      `http://localhost:5000/order/update-order/?id=${id}&action=restore`,
      {
        method: "PATCH",
      }
    );
    const data = await res.json();
    if (res.ok) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
          setRefresher(refresher + 1);
        }, 500);
      });
    }
    console.log(data);
  };

  return (
    <MainBox>
      {" "}
      <Breadcrumb
        items={[
          {
            title: "User Panel",
          },
          {
            title: "Deleted Orders",
          },
        ]}
      />
      <HeaderBox>
        <h1> Deleted Orders</h1>
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
                <td>Album</td>
                <td>Album Type</td>
                <td>Language</td>
                <td>Created</td>
                <td>Date Of release</td>
                <td>Action</td>
              </tr>
            </TableHead>{" "}
            <TableBody>
              {filteredOrders.map((ord) => {
                if (ord.deleted === false) {
                  return;
                }
                const {
                  title,
                  language,
                  albumType,

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
                        <img
                          src={`${process.env.REACT_APP_BASE_URL}/${thumbnail}`}
                          alt=""
                        />
                        {title}
                      </span>
                    </td>
                    <td>{albumType}</td>
                    <td>{language}</td>
                    <td>{orderDateAndTime.split("/")[0]}</td>
                    <td>{dateOfRelease}</td>

                    <td>
                      <Popconfirm
                        title="Confirm"
                        description="Do you want to restore order?"
                        onConfirm={confirm.bind(this, id)}
                        onOpenChange={() => {}}
                      >
                        <Link>
                          <SettingsBackupRestoreOutlined />
                        </Link>
                      </Popconfirm>{" "}
                      <Link
                        to={`/user-panel/order/${id}`}
                        style={{ marginLeft: ".5rem" }}
                      >
                        <RemoveRedEyeOutlined />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </TableBody>
          </Table>
        )}
        {orders && filteredOrders.length < 1 && !isLoading && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </TableBox>
      <MobileBox>
        {filteredOrders &&
          filteredOrders.map((ord) => {
            if (ord.deleted === false) {
              return;
            }
            const {
              title,
              language,
              albumType,

              dateOfRelease,
              orderDateAndTime,
              thumbnail,
              id,
            } = ord;
            console.log(thumbnail);
            return (
              <MobileOrderBox>
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/${thumbnail}`}
                  alt=""
                />
                <TextBox>
                  <span>Title</span>
                  <span>{title}</span>
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
                    {" "}
                    <Link to={`/user-panel/order/${id}`}>
                      <RemoveRedEyeOutlined />
                    </Link>
                  </span>
                </TextBox>
                <TextBox>
                  <span>Retsore</span>
                  <span>
                    {" "}
                    <Popconfirm
                      title="Confirm"
                      description="Do you want to restore order?"
                      onConfirm={confirm.bind(this, id)}
                      onOpenChange={() => {}}
                    >
                      <Link>
                        <SettingsBackupRestoreOutlined />
                      </Link>
                    </Popconfirm>
                  </span>
                </TextBox>
              </MobileOrderBox>
            );
          })}
      </MobileBox>
    </MainBox>
  );
};

export default DeletedOrders;
