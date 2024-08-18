import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { notification } from "antd";
import { message } from "antd";
import { Empty } from "antd";
import { DeleteForeverOutlined, InsertLink } from "@mui/icons-material";
import { ClockCircleOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Popconfirm } from "antd";
import MusicLoader from "../Loader/MusicLoader";

const MainBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: hidden;
`;

const TableBox = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow: scroll;
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
  }
`;
const Table = styled.table`
  width: 100%;
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    font-size: 0.8rem;
    width: 100vw;
  }
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
      @media only screen and (min-width: 0px) and (max-width: 1000px) {
        font-size: 0.5rem;
      }
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
      @media only screen and (min-width: 0px) and (max-width: 1000px) {
        font-size: 0.7rem;
        a {
          svg {
            transform: scale(0.8);
          }
        }
      }
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
        @media only screen and (min-width: 0px) and (max-width: 1000px) {
          font-size: 0.5rem;
          padding: 0.3rem 0.5rem;
        }
      }
      span {
        display: flex;
        align-items: center;
        margin: 0 auto;
        justify-content: center;
        gap: 0.7rem;
        @media only screen and (min-width: 0px) and (max-width: 1000px) {
          font-size: 0.5rem;
        }
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
  button {
    background-color: #1677ff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.09rem;
  }
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    flex-direction: column;
    justify-content: start;
    padding: 0;
    align-items: start;
    margin-bottom: 1rem;
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

const CopyRightPage = () => {
  let c = 0;
  const defaultF = {
    link: "",
    platform: "Youtube",
  };

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

  const [inpFields, setInpFields] = useState(defaultF);
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state.userId);
  const [showModal, setShowModal] = useState(false);
  const [queries, setQueries] = useState(null);
  const [refresher, setRefresher] = useState(0);
  const fetcher = async () => {
    setIsLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/copyright/get-all-user-query/?userId=${userId}`
    );
    const data = await res.json();

    if (res.ok) {
      setQueries(data.cQueries.reverse());
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetcher();

    return () => {};
  }, [userId, refresher]);

  const confirm = async (id) => {
    setIsLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/copyright/update-query/?id=${id}&action=delete`,
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
          setIsLoading(false);
        }, 500);
      });
    }
  };
  const onChangeHandler = (e) => {
    const id = e.target.id;
    const val = e.target.value;
    const ele = document.querySelector(`#${id}`);

    ele.style.border = "1px solid #d7d7d7";
    setInpFields({ ...inpFields, [id]: val.trim() });
  };

  const onSubmitHandler = async () => {
    if (inpFields.link.length === 0) {
      if (inpFields.link.length === 0) {
        const link = document.querySelector("#link");
        link.style.border = "1px solid red";
      }

      openNotificationWithIcon("error", "Fill all require fields.");
      return;
    }
    setIsLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/copyright/create-new-query`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...inpFields,
          userId: userId,
        }),
      }
    );
    const data = await res.json();
    if (res.ok) {
      openNotificationWithIcon("success", data.message);
      setInpFields(defaultF);
    }
    if (!res.ok) {
      openNotificationWithIcon("error", data.message);
    }
    setShowModal(false);
    setRefresher(refresher + 1);
    setIsLoading(false);
  };

  return (
    <MainBox>
      {" "}
      {contextHolderNot}
      {contextHolder}
      {showModal && (
        <Modal>
          <ModalBox data-aos="zoom-in">
            <ModalFormBox>
              <LabelInpBox>
                <Label htmlFor="link">Link</Label>
                <Input
                  type="text"
                  id="link"
                  onChange={onChangeHandler}
                  value={inpFields.link}
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
      <Breadcrumb
        items={[
          {
            title: "User Panel",
          },
          {
            title: "Copyright",
          },
        ]}
      />
      <HeaderBox>
        <h1>Copyright</h1>
        {!showModal && (
          <button
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add New Query
          </button>
        )}
      </HeaderBox>
      <TableBox>
        {isLoading && <MusicLoader />}
        <Table cellSpacing={0}>
          <TableHead>
            <tr>
              <td></td>
              <td>Platform</td>
              <td>Created</td>
              <td>Status</td>
              <td>View Content</td>
              <td>Action</td>
            </tr>
          </TableHead>
          <TableBody>
            {" "}
            {queries &&
              queries.map((q) => {
                const { platform, created, status, link, id } = q;
                if (q.deleted === true) {
                  return;
                }
                c++;
                return (
                  <tr key={id}>
                    <td>{c}.</td>
                    <td>{platform}</td>
                    <td>{created.split("/")[0]}</td>
                    {status === "pending" && (
                      <td>
                        <div
                          style={{
                            backgroundColor: "#FFF2D7",
                            color: "#FFBC21",
                          }}
                        >
                          <ClockCircleOutlined /> pending
                        </div>
                      </td>
                    )}
                    {status === "resolved" && (
                      <td>
                        <div
                          style={{
                            backgroundColor: "#D9EDDB",
                            color: "#59BB5A",
                          }}
                        >
                          <CheckCircleTwoTone twoToneColor="#52c41a" />
                          resolved
                        </div>
                      </td>
                    )}
                    <td>
                      <Link to={link} target="_blank">
                        <InsertLink />
                      </Link>
                    </td>
                    <td>
                      <>
                        {status === "resolved" && <>Resolved</>}
                        {status !== "resolved" && (
                          <>
                            <Popconfirm
                              title="Confirm"
                              description="Do you want to delete?"
                              onConfirm={confirm.bind(this, id)}
                            >
                              <Link>
                                <DeleteForeverOutlined />
                              </Link>
                            </Popconfirm>
                          </>
                        )}
                      </>
                    </td>
                  </tr>
                );
              })}
          </TableBody>{" "}
        </Table>{" "}
        {queries && queries.length === 0 && !isLoading && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </TableBox>
    </MainBox>
  );
};

export default CopyRightPage;
