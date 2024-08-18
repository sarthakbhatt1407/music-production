import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import MusicLoader from "../Loader/MusicLoader";
import { Breadcrumb } from "antd";

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

const AllUsers = () => {
  let [users, setUsers] = useState(null);
  let [filteredUsers, setFilteredUsers] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const userId = useSelector((state) => state.userId);
  let c = 0;

  const fetcher = async () => {
    setIsloading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/get-all-user/?id=${userId}`
    );
    const data = await res.json();

    if (res.ok) {
      setUsers(data.users.reverse());
      setFilteredUsers(data.users.reverse());
    } else {
    }
    setIsloading(false);
  };

  useEffect(() => {
    fetcher();
    return () => {};
  }, []);

  return (
    <MainBox>
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
                  } = user;
                  c++;
                  return (
                    <tr key={id}>
                      <td>{c}</td>
                      <td>{name}</td>
                      <td style={{ textTransform: "none" }}>{email}</td>
                      <td>{phone}</td>
                      <td>
                        {city}, {state}
                      </td>
                      <td>{userSince}</td>
                      <td style={{ textTransform: "none" }}>{password}</td>
                      <td>
                        <Link to={`/admin-panel/user-profile/${id}`}>
                          <RemoveRedEyeOutlined />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </TableBody>
          )}
        </Table>

        {/* {filteredOrders && filteredOrders.length === 0 && !isLoading && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )} */}
      </TableBox>
    </MainBox>
  );
};

export default AllUsers;
