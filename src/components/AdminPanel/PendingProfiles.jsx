import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Done, RemoveRedEyeOutlined } from "@mui/icons-material";
import MusicLoader from "../Loader/MusicLoader";
import { Breadcrumb, Button, Empty, message } from "antd";

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

const PendingProfile = () => {
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
  let [users, setUsers] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pdfFile, setPdfFile] = useState(null); // Store PDF file
  let [filteredUsers, setFilteredUsers] = useState(null);
  const [selUser, setSelUser] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const userId = useSelector((state) => state.userId);
  const [refresher, setRefresher] = useState(0);
  let c = 0;

  const fetcher = async () => {
    setIsloading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/get-pending-user/?id=${userId}`
    );
    const data = await res.json();

    if (res.ok) {
      setUsers(data.users.reverse());
      setFilteredUsers(data.users.reverse());
    } else {
    }
    setIsloading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file); // Store the selected PDF in state
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  useEffect(() => {
    fetcher();
    return () => {};
  }, [refresher]);

  return (
    <MainBox>
      {contextHolder}
      {showModal && (
        <Modal>
          <ModalBox data-aos="zoom-in">
            <ModalFormBox>
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
                    setIsloading(true);
                    if (pdfFile) {
                      const formdata = new FormData();
                      formdata.append("doc", pdfFile);
                      formdata.append("userId", selUser);
                      formdata.append("adminId", userId);
                      const res = await fetch(
                        `${process.env.REACT_APP_BASE_URL}/user/legal-doc`,
                        {
                          method: "POST",

                          body: formdata,
                        }
                      );
                      const data = await res.json();

                      if (res.ok) {
                        success(data.message);
                        setTimeout(() => {
                          setRefresher((prev) => {
                            return prev + 1;
                          });
                          setShowModal(false);
                        }, 600);
                      } else {
                        error(data.message);
                      }
                    } else {
                      error("Please select a PDF file.");
                    }
                    setIsloading(false);
                  }}
                >
                  Submit
                </button>
                <button
                  onClick={() => {
                    setSelUser("");
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
            title: "Admin Panel",
          },
          {
            title: "Labels",
          },
        ]}
      />
      <HeaderBox>
        <h1>Labels</h1>
        <Input
          type="text"
          placeholder="search user"
          onChange={(e) => {
            const val = e.target.value.trim().toLowerCase();
            const arr = users.filter((usr) => {
              return (
                usr.name.toLowerCase().includes(val) ||
                usr.phone.toString().includes(val)
              );
            });
            setFilteredUsers(arr);
          }}
        />
      </HeaderBox>
      <TableBox>
        <Table cellSpacing={0}>
          <TableHead>
            <tr>
              <td></td>
              <td>Name</td>
              <td>Email</td>
              <td>Phone</td>
              <td>Location</td>
              <td>Since</td>
              <td>Password</td>
              <td>View Profile</td>
              <td>Action</td>
            </tr>
          </TableHead>
          {isLoading && <MusicLoader />}
          {!isLoading && (
            <TableBody>
              {filteredUsers &&
                filteredUsers.map((user) => {
                  if (userId === user.id) {
                    return;
                  }
                  const {
                    id,
                    name,
                    email,
                    phone,
                    city,
                    state,
                    password,
                    userSince,
                    address,
                  } = user;
                  c++;
                  return (
                    <tr key={id}>
                      <td>{c}</td>
                      <td>{name}</td>
                      <td style={{ textTransform: "none" }}>{email}</td>
                      <td>{phone}</td>
                      <td>
                        {address}, {city}, {state}
                      </td>
                      <td>{userSince}</td>
                      <td style={{ textTransform: "none" }}>{password}</td>
                      <td>
                        <Link to={`/admin-panel/user-profile/${id}`}>
                          <RemoveRedEyeOutlined />
                        </Link>
                      </td>
                      <td>
                        <Button
                          onClick={() => {
                            setSelUser(id);
                            setShowModal(true);
                          }}
                        >
                          <Done />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </TableBody>
          )}
        </Table>
        {!isLoading && users.length === 0 && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
        {/* {filteredOrders && filteredOrders.length === 0 && !isLoading && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )} */}
      </TableBox>
    </MainBox>
  );
};

export default PendingProfile;
