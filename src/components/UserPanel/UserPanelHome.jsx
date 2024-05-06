import styled from "@emotion/styled";

import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import MusicLoader from "../Loader/MusicLoader";

const MainDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  overflow-y: scroll;
  h1 {
    margin: 0.5rem 0;
  }
  @media only screen and (max-width: 1000px) {
    padding: 0.5rem 0.2rem;
  }
`;
const ContentDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;

  height: fit-content;
  @media only screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const LeftDiv = styled.div`
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

const RightDiv = styled.div`
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

const Table = styled.table`
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
        }
      }
    }
  }
`;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const COLORSSTREAM = {
  Spotify: "#25D865",
  Wynk: "#D92E33",
  JioSaavn: "#1DA48C",
  Amazon: "#DBB67A",
  Gaana: "#FE6109",
  YouTube: "#FF0808",
  SoundCloud: "#FE8008",
  Tiktok: "#2CF4EF",
  Facebook: "#1FADFD",
  Hungama: "#73BF4C",
  Other: "#495145",
};

const UserPanelHome = () => {
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
    Spotify: 0,
    Wynk: 0,
    JioSaavn: 0,
    Amazon: 0,
    Gaana: 0,
    YouTube: 0,
    SoundCloud: 0,
    Tiktok: 0,
    Facebook: 0,
    Hungama: 0,
    Other: 0,
  };
  const date = new Date();
  const currentYear = date.getFullYear();
  const [userData, setUserdata] = useState(null);
  const [earningSelectedYear, setEarningSelectedYear] = useState(currentYear);
  const [reportSelectedYear, setReportSelectedYear] = useState(currentYear);
  const [earningData, setEarningData] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state.userId);

  const fecher = async () => {
    setIsLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/get-user/?id=${userId}`
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
    fecher();

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

  return (
    <>
      <MainDiv>
        {isLoading && <MusicLoader />}
        <Breadcrumb
          items={[
            {
              title: "User Panel",
            },
            {
              title: "Home",
            },
          ]}
        />
        <h1>
          <span>Overview</span>
        </h1>{" "}
        {userData && !isLoading && (
          <ContentDiv>
            <LeftDiv>
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
                    <Option value={`${currentYear}`}>{currentYear}</Option>
                    <Option value={`${currentYear - 1}`}>
                      {currentYear - 1}
                    </Option>
                    <Option value={`${currentYear - 2}`}>
                      {currentYear - 2}
                    </Option>
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
                    <Option value={`${currentYear}`}>{currentYear}</Option>
                    <Option value={`${currentYear - 1}`}>
                      {currentYear - 1}
                    </Option>
                    <Option value={`${currentYear - 2}`}>
                      {currentYear - 2}
                    </Option>
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
            </LeftDiv>
            <RightDiv>
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
                        fill={COLORSSTREAM[entry["name"]]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Table>
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
                          <div
                            style={{
                              backgroundColor: `${COLORSSTREAM[name]}`,
                            }}
                          ></div>
                        </td>
                        <td>{name}</td>
                        <td>{views}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </RightDiv>
          </ContentDiv>
        )}
      </MainDiv>
    </>
  );
};

export default UserPanelHome;
