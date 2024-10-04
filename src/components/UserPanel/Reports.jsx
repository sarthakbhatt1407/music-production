import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  EyeOutlined,
  ClockCircleOutlined,
  CheckCircleTwoTone,
  EditOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import MusicLoader from "../Loader/MusicLoader";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { Empty } from "antd";
import { useSelector } from "react-redux";
import UserOrdersStatus from "../UserOrdersStatus";
import { DownloadOutlined } from "@mui/icons-material";
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
    /* display: none; */
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

      text-align: center;
      padding: 1rem 0;
      font-weight: 500;
      font-size: 1rem;
      @media only screen and (min-width: 0px) and (max-width: 1000px) {
        font-size: 0.8rem;
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

const Reports = () => {
  const userId = useSelector((state) => state.userId);
  const [reports, setReports] = useState(null);
  const [filReports, setFillReports] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  let sNo = 0;
  const fetcher = async () => {
    setIsloading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/get-user/?id=${userId}`
    );
    const data = await res.json();
    if (res.ok) {
      if (data.user.excelRep.length > 0) {
        const repArr = data.user.excelRep.split("&=&").reverse();

        setReports(repArr);
        setFillReports(repArr);
      } else {
        setReports([]);
        setFillReports([]);
      }
    }

    setIsloading(false);
  };

  useEffect(() => {
    fetcher();
    return () => {};
  }, []);

  const onCHangeHandler = (e) => {
    const val = e.target.value.toLowerCase();
    const arr = reports.filter((rep) => {
      return rep.includes(val);
    });
    setFillReports(arr);
  };

  return (
    <MainBox>
      <Breadcrumb
        items={[
          {
            title: "User Panel",
          },
          {
            title: "Reports",
          },
        ]}
      />
      <HeaderBox>
        <h1>Reports</h1>
        <Input
          type="text"
          placeholder="search report"
          onChange={onCHangeHandler}
        />
      </HeaderBox>{" "}
      {isLoading && <MusicLoader />}
      <TableBox>
        {1 && (
          <Table cellSpacing={0}>
            <TableHead>
              <tr>
                <td>S. No.</td>
                <td>File</td>
                <td>Action</td>
              </tr>
            </TableHead>{" "}
            <TableBody>
              {filReports &&
                filReports.length > 0 &&
                filReports.map((r) => {
                  sNo++;
                  return (
                    <>
                      <tr>
                        <td>{sNo}.</td>
                        <td>{r && r.split("/")[2].split(".xl")[0]}</td>
                        <td>
                          {" "}
                          <span>
                            <Link
                              to={`${process.env.REACT_APP_BASE_URL}/file/download/?filePath=${r}`}
                              target="_blank"
                            >
                              <DownloadOutlined
                                style={{ transform: "scale(1)" }}
                              />
                            </Link>
                          </span>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </TableBody>
          </Table>
        )}
        {filReports && filReports.length === 0 && !isLoading && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </TableBox>
    </MainBox>
  );
};

export default Reports;
